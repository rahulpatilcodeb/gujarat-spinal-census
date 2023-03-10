import logo from "@/public/logo.png";
import "@/styles/Home.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/userSlice";
import router from "next/router";
import { useEffect, useState } from "react";

function Navbars() {
  const dispatch = useDispatch();

  let { user: users, islogin: Ilogin } = useSelector(
    (state: RootState) => state.users
  );
  const [homeColor, setHomeColor] = useState("#6BC17A");
  const [contactColor, setContactColor]=useState("#181C32")

  const handleChangeHomeColor = (e:any) => {
    setHomeColor("#6BC17A");
    setContactColor("#181C32")
  };
   const handleChangeContactColor = (e: any) => {
     setHomeColor("#181C32");
     setContactColor("#6BC17A");
   };

  function handleClick(e: any) {
    e.preventDefault();
    dispatch(logout());
  }

  useEffect(() => {
    console.log(Ilogin);
    if (Ilogin) {
      router.push("/admin/patients");
    }
  }, [Ilogin]);

  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <div className="col ms-5">
          <span>
            <img
              style={{ height: "100px ", width: "120px " }}
              alt=""
              src={logo.src}
            ></img>
          </span>
        </div>
        <div className="col d-flex justify-content-end me-5 my-3">
          <span>
            {!Ilogin ? (
              <Link
                href="/"
                onClick={handleChangeHomeColor}
                style={{ color: homeColor, fontSize: "18px" }}
              >
                Home
              </Link>
            ) : (
              <Link
                href="/admin/patients"
                onClick={handleChangeHomeColor}
                style={{ color: homeColor, fontSize: "18px" }}
              >
                Home
              </Link>
            )}

            {!Ilogin ? (
              <Link
                className="ms-2"
                href="/contact"
                onClick={handleChangeContactColor}
                style={{ color: contactColor, fontSize: "18px" }}
              >
                Contact
              </Link>
            ) : (
              <Link
                onClick={handleChangeContactColor}
                className="ms-2"
                href="/admin/contact"
                style={{ color: contactColor, fontSize: "18px" }}
              >
                Contact
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
      </div>
    </>
  );
}

export default Navbars;
