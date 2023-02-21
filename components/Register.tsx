import Link from "next/link"
import "@/styles/Home.module.css";
import regi from "@/public/regi.png"

const Register =() => {
  function registered(){
    window.location.href="/"
  }


  return (
    <>
      <div className="mb-4 d-flex justify-content-center">
        Registration Done.
      </div>

      <div className="card text-center">
        <div className="card-body">
          <img
            className="manImg"
            style={{height: "80px", width: "83px"}}
            src={regi.src}
            alt=""
          ></img>
          <p className="card-text">Your Registration Successfully Done.</p>
          <Link href='/' onClick={registered} style={{color: "rgba(107, 193, 122, 1)"}}>
            Registration New Patient
          </Link>
        </div>
      </div>
      
    </>
  ) 
}

export default Register;
