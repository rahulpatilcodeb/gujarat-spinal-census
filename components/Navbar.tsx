import logo from "@/public/logo.png";
import { currentlng } from "@/store/languageSlice";
import { RootState } from "@/store/store";
import { logout } from "@/store/userSlice";
import styles from "@/styles/navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";




function Navbars() {
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  let { locale, locales, push } = useRouter()
  const router = useRouter();

  const { t: translate } = useTranslation('common')
  let { user: users, islogin: Ilogin } = useSelector(
    (state: RootState) => state.users
  );
  const [homeColor, setHomeColor] = useState("#6BC17A");
  const [contactColor, setContactColor] = useState("#181C32")
  const [aboutColor, setAboutColor] = useState("#181C32");
  const [menu, setMenu] = useState(false);

  // to update the current color of link.
  const handleChangeHomeColor = () => {
    setHomeColor("#6BC17A");
    setContactColor("#181C32")
    setAboutColor("#181C32");
  };
  const handleChangeAboutColor = () => {
    setAboutColor("#6BC17A");
    setContactColor("#181C32")
    setHomeColor("#181C32")
  };
  const handleChangeContactColor = () => {
    setContactColor("#6BC17A");
    setHomeColor("#181C32");
    setAboutColor("#181C32");

  };
  //logout function performs action in redux.
  function handleClick(e: any) {
    e.preventDefault();
    dispatch(logout(e.value));
  }



  // to check user loged in or not.
  useEffect(() => {
    console.log(pathname.indexOf("admin") !== -1)
    if (Ilogin) {
      if (pathname == "/admin/patients") {
        handleChangeHomeColor();
        router.push("/admin/patients");
      } else if (pathname == "/admin/contact") {
        handleChangeContactColor();
        router.push("/admin/contact");
      }
    }
    if (pathname == "/") {
      handleChangeHomeColor();
      router.push("/");
    } else if (pathname === "/about") {
      handleChangeAboutColor();
      router.push("/about")
    } else if (pathname === "/contact") {
      handleChangeContactColor();
      router.push("/contact")
    }


  }, [Ilogin]);

  const path = router.asPath
  const NewValue = (e: any) => {
    locale = e.value
    if (locale === 'en') router.replace('' + path, undefined, { locale: e.value });
    else router.push('/gu' + path, undefined, { locale: e.value });
    dispatch(
      currentlng({ language: e.value })
    );
  }

  const opt: any = [
    { value: 'gu', label: 'ગુજરાતી' },
    { value: 'en', label: 'English' }
  ]

  function handleMenu() {
    setMenu(!menu)
  }


  return (
    <>
      <div className={`${styles.navbar}`}>
        <div className="col">
          <span>
            <button className="btn gsc" onClick={(e) => { router.push("/"); handleChangeHomeColor() }} >
              <img src={logo.src} width="100px" />
            </button>

            {/* <img
              style={{ height: "100px ", width: "120px " }}
              alt=""
              src={logo.src}

            ></img> */}
          </span>
        </div>
        <div className={`${styles["menu-conatiner"]}`} style={{ whiteSpace: "nowrap" }}>
          {pathname.indexOf("admin") == -1 ? <span className="pe-3">
            <Select options={opt}
              defaultValue={() => {
                return opt.find((o: any) => o.value == locale)
              }}
              id="lng"
              name="language"
              onChange={NewValue}

            />
          </span> : ""}
          <span>
            {pathname.indexOf("admin") !== -1 && Ilogin ? (
              <Link
                href="/admin/patients"
                onClick={handleChangeHomeColor}
                style={{ color: homeColor, fontSize: "18px" }}
                locale={locale}


              >
                {translate('home')}
              </Link>
            ) : (
              <Link
                href="/"
                onClick={handleChangeHomeColor}
                style={{ color: homeColor, fontSize: "18px" }}
                locale={locale}
              >
                {translate('home')}
              </Link>
            )}


            {pathname.indexOf("admin") !== -1 && Ilogin ? (
              <Link
                onClick={handleChangeContactColor}
                className="ms-2"
                href="/admin/contact"
                style={{ color: contactColor, fontSize: "18px" }}
                locale={locale}

              >
                {translate('contact')}
                {/* Contact */}

              </Link>
            ) : (

              <Link
                className="ms-2"
                href="/contact"
                onClick={handleChangeContactColor}
                style={{ color: contactColor, fontSize: "18px" }}
                locale={locale}
              >
                {translate('contact')}
                {/* Contact */}
              </Link>
            )}

          </span>
          <span className="d-flex align-items-center">
            {(pathname.indexOf("admin") == -1 || !Ilogin)
              && (
                <Link
                  className="ms-2"
                  href="/about"
                  onClick={handleChangeAboutColor}
                  style={{ color: aboutColor, fontSize: "18px", }}
                  locale={locale}

                >
                  {translate('about')}
                </Link>
              )}
            <button
              style={{ display: Ilogin ? "inline" : "none" }}
              className="btn btn-sm btn-primary ms-2 "
              onClick={handleClick}
            >
              Logout
            </button>
          </span>

        </div>
        <div className={`${styles['menu-icon']}`} style={{ paddingRight: "10px" }}>
          {pathname.indexOf("admin") == -1 ? <span className="pe-3">
            <Select options={opt}
              defaultValue={() => {
                return opt.find((o: any) => o.value == locale)
              }}
              id="lng"
              name="language"
              onChange={NewValue}

            />
          </span> : ""}
          {<svg onClick={handleMenu} viewBox="0 0 100 80" width="20" height="20">
            <rect width="100" height="10"></rect>
            <rect y="25" width="100" height="10"></rect>
            <rect y="50" width="100" height="10"></rect>
          </svg>}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end", alignItems: 'end' }}>
        {menu && <div className={`${styles['icon-menu-option']}`}>
          <div>
            <span>
              {pathname.indexOf("admin") !== -1 && Ilogin ? (
                <Link
                  href="/admin/patients"
                  onClick={handleChangeHomeColor}
                  style={{ color: homeColor, fontSize: "18px", textDecoration: "none" }}
                  locale={locale}

                >
                  {translate('home')}
                </Link>
              ) : (
                <Link
                  href="/"
                  onClick={handleChangeHomeColor}
                  style={{ color: homeColor, fontSize: "18px", textDecoration: "none" }}
                  locale={locale}
                >
                  {translate('home')}
                </Link>
              )}
            </span>
          </div><div>


            <span>

              {pathname.indexOf("admin") !== -1 && Ilogin ? (
                <Link
                  onClick={handleChangeContactColor}
                  className="ms-2"
                  href="/admin/contact"
                  style={{ color: contactColor, fontSize: "18px", textDecoration: "none" }}
                  locale={locale}

                >
                  {translate('contact')}
                  {/* Contact */}

                </Link>
              ) : (

                <Link
                  className="ms-2"
                  href="/contact"
                  onClick={handleChangeContactColor}
                  style={{ color: contactColor, fontSize: "18px", textDecoration: "none" }}
                  locale={locale}
                >
                  {translate('contact')}
                  {/* Contact */}
                </Link>
              )}

            </span>
          </div><div>
            <span className="d-flex align-items-center">
              {(pathname.indexOf("admin") == -1 || !Ilogin)
                && (
                  <Link
                    className="ms-2"
                    href="/about"
                    onClick={handleChangeAboutColor}
                    style={{ color: aboutColor, fontSize: "18px", textDecoration: "none" }}
                    locale={locale}

                  >
                    {translate('about')}
                  </Link>
                )}
            </span>
            <button
              style={{ display: Ilogin ? "inline" : "none" }}
              className="btn btn-sm btn-primary ms-2 "
              onClick={handleClick}
            >
              Logout
            </button>
          </div>
        </div >
        }
      </div >


    </>
  );
};


export default Navbars;
