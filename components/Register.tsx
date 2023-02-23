import Link from "next/link"
import "@/styles/Home.module.css";
import regi from "@/public/regi.png"
import { useState } from "react";
import ReactLoading from "react-loading";

const Register = () => {
  const [loading, setLoading] = useState(false);
  function registered() {
    setLoading(true)
    window.location.href = "/"
  }


  return (
    <>
      {loading ? (
        <center>
          <div style={{ margin: "100px" }}>
            <ReactLoading type={"spin"} color={"#6BC17A"} />
          </div>
        </center>
      ) : (
        <div>
          <div className="mb-4 d-flex justify-content-center">
            Registration Done.
          </div>

          <div className="card text-center">
            <div className="card-body">
              <img
                className="manImg"
                style={{ height: "80px", width: "83px" }}
                src={regi.src}
                alt=""
              ></img>
              <p className="card-text">Your Registration Successfully Done.</p>
              <Link
                href="/"
                onClick={registered}
                style={{ color: "rgba(107, 193, 122, 1)" }}
              >
                Registration New Patient
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
