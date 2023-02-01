import React from "react" 
import insta from "@/public/insta.png" 
import meta from "@/public/meta.png" 
import lin from "@/public/lin.png" 
import twit from "@/public/twit.png" 
import "@/styles/Home.module.css";

function Footer() {
  return (
    <>
      <footer
        className=" d-flex justify-content-between position-relative"
        style={{ height: "50px", backgroundColor: "rgb(252, 249, 249)" }}
      >
        <h6 className="my-2 ms-5">© 2023 Spinal Injury. All Rights Reserved.</h6>

        <span className=" my-2 me-5">
          <img style={{ height: "33px", width: "33px" }} alt="" src={insta.src}></img>
          <img style={{ height: "33px", width: "33px" }} alt="" src={meta.src}></img>
          <img style={{ height: "33px", width: "33px" }} alt="" src={lin.src}></img>
          <img style={{ height: "33px", width: "33px" }} alt="" src={twit.src}></img>
        </span>
      </footer>
    </>
  ) 
}

export default Footer 
