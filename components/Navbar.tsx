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

  // const [login, setlogin] = useState(true );

  let { user: users, islogin: Ilogin } = useSelector(
    (state: RootState) => state.users
  );
  // const [signin, setSignin] = useState(false);

  function handleClick(e: any) {
    e.preventDefault();

    dispatch(logout());
  }

  useEffect(() => {
    console.log(Ilogin);
    // setlogin(Ilogin);
    if (Ilogin) {
      router.push("/admin/patients");
    }
  }, [Ilogin]);

  return (
    <>
      <div
        className="my-3 d-flex justify-content-between"
        style={{ fontFamily: "Inter" }}
      >
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
                style={{ color: "rgba(107, 193, 122, 1)", fontSize: "18px" }}
              >
                Home
              </Link>
            ) : (
              <Link
                href="/admin/patients"
                style={{ color: "rgba(107, 193, 122, 1)", fontSize: "18px" }}
              >
                Home
              </Link>
            )}

            {!Ilogin ? (
              <Link
                className="ms-2"
                href="/contact"
                style={{ color: "rgba(0, 0, 0)", fontSize: "18px" }}
              >
                Contact
              </Link>
            ) : (
              <Link
                className="ms-2"
                href="/admin/contact"
                style={{ color: "rgba(0, 0, 0)", fontSize: "18px" }}
              >
                Contact
              </Link>
            )}
            <button
              style={{ display: Ilogin ? "inline" : "none" ,}}
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
