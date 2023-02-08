import React from "react";
import insta from "@/public/insta.png";
import meta from "@/public/meta.png";
import lin from "@/public/lin.png";
import twit from "@/public/twit.png";
import "@/styles/Home.module.css";

function Footer() {
  return (
    <>
      <footer
        className="d-flex justify-content-between"
        style={{
          // position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
          height: "50px",
          backgroundColor: "rgb(252, 249, 249)",
        }}
      >
        <h6 className="d-none   my-2 ms-5 d-sm-block">
          © 2023 Spinal Injury. All Rights Reserved.
        </h6>
        <p className="d-block fs-6  my-2 ms-3 d-sm-none ">
          © 2023 Spinal Injury. All Rights Reserved.
        </p>

        <span className="my-2 me- justify-content-content d-sm-flex">
          <img
            style={{ height: "33px", width: "33px" }}
            alt=""
            src={insta.src}
          ></img>
          <img
            style={{ height: "33px", width: "33px" }}
            alt=""
            src={meta.src}
          ></img>
          <img
            className="d-none d-sm-block"
            style={{ height: "33px", width: "33px" }}
            alt=""
            src={lin.src}
          ></img>
          <img
            className="d-none d-sm-block"
            style={{ height: "33px", width: "33px" }}
            alt=""
            src={twit.src}
          ></img>
        </span>
      </footer>
    </>
  );
}

export default Footer;
