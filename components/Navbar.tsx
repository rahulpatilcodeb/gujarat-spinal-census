import logo from "@/public/logo.png";
import "@/styles/Home.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { login, logout } from "@/store/userSlice";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import { currentlng } from "@/store/languageSlice";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'




function Navbars() {
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  let { locale, locales, push } = useRouter()
  const router = useRouter();

  const { t: translate } = useTranslation('common')
  // console.log("t", t);
  // console.log("t",t("home"))
  let { user: users, islogin: Ilogin } = useSelector(
    (state: RootState) => state.users
  );
  let { language: lng } = useSelector(
    (state: RootState) => state.language
  );
  const [homeColor, setHomeColor] = useState("#6BC17A");
  const [contactColor, setContactColor] = useState("#181C32")
  const [aboutColor, setAboutColor] = useState("#181C32");
  // const [ language, setLanguage] = useState<any>("english")

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
    // console.log(Ilogin);
    if (Ilogin) {
      if (pathname == "/admin/patients") {
        handleChangeHomeColor();
        router.push("/admin/patients");
      } else if (pathname == "/admin/contact") {
        handleChangeContactColor();
        router.push("/admin/contact");
      } else {
        router.push("/admin/patients");
      }
    }
    console.log(pathname);
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
  console.log(path)
  const NewValue = (e: any) => {
    locale = e.value
    console.log("loccases", locale, e.value);
    if (locale === 'en') router.replace('/' + path, undefined, { locale: e.value });
    else router.push('/gu' + path, undefined, { locale: e.value });
    dispatch(
      currentlng({ language: e.value })
    );
  }

  const opt: any = [
    { value: 'gu', label: 'ગુજરાતી' },
    { value: 'en', label: 'English' }
  ]


  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <div className="col ms-5">

          <span>

            <button className="btn gsc" onClick={(e) => { router.push("/"); handleChangeHomeColor() }} style={{ border: "none" }}>
              <img src={logo.src} width="100px" />
            </button>

            {/* <img
              style={{ height: "100px ", width: "120px " }}
              alt=""
              src={logo.src}

            ></img> */}
          </span>
        </div>
        <div className="col d-flex justify-content-end me-5 my-3  align-items-center">
          {!Ilogin ? <span className="pe-3">
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
            {!Ilogin ? (
              <Link
                href="/"
                onClick={handleChangeHomeColor}
                style={{ color: homeColor, fontSize: "18px" }}
                locale={locale}

              >
                {translate('home')}
              </Link>
            ) : (
              <Link
                href="/admin/patients"
                onClick={handleChangeHomeColor}
                style={{ color: homeColor, fontSize: "18px" }}
                locale={locale}
              >
                {translate('home')}
              </Link>
            )}


            {!Ilogin ? (
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
            ) : (
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
            )}
            <button
              style={{ display: Ilogin ? "inline" : "none" }}
              className="btn btn-sm btn-primary ms-2 "
              onClick={handleClick}
            >
              Logout
            </button>
          </span>
          <span>
            {!Ilogin && (
              <Link
                className="ms-2"
                href="/about"
                onClick={handleChangeAboutColor}
                style={{ color: aboutColor, fontSize: "18px" }}
                locale={locale}

              >
                {translate('about')}
              </Link>
            )}
          </span>

        </div>
      </div>
    </>
  );
};



export default Navbars;
