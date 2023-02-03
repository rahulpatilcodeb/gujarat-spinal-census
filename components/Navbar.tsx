import logo from "@/public/logo.png";
import "@/styles/Home.module.css";
import Link from "next/link";


function Navbars() {
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
            <Link href="/" style={{ color: "rgba(107, 193, 122, 1)" }}>
              Home
            </Link>
            <Link
              className="ms-2"
              href="/Contact"
              style={{ color: "rgba(0, 0, 0)" }}
            >
              Contact
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Navbars;
