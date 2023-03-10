import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  description: Yup.string().required("Please enter description here!"),
  contact: Yup.string().required("Please enter your phone number!"),
});

function Contact(): JSX.Element {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      contact: "",
      email: "",
      description: "",
    },
    enableReinitialize:true,
    validationSchema:schema,
    onSubmit: (values) => {
      console.log("this is onsubmit")
      handleSubmit();
    },
  });

  async function handleSubmit() {
    console.log("this is handlesubmit")
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, formik.values)
      .then(() => alert("Thank You !! \n We will reach to you soon"))
      .catch((err: any) => {
        console.error(err);
      });
    router.push("/");
  }
  function resetAll(){
    formik.values.contact="";
    formik.values.email="";
    formik.values.description="";
  }

  return (
    <form noValidate className="container w-50" style={{marginBottom:"7%"}} onSubmit={formik.handleSubmit}>
      <div className="col d-flex justify-content-center">
        <span>
          <b style={{ fontSize: "18px" }}>--Contact Us --</b>
        </span>
      </div>

      <div className="m-3">
        <label className="mb-1">
          Mobile Number
        </label>
        <input
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control bg-light"
          name="contact"
          type="text"
          id="contact"
          placeholder="+91"
          value={formik.values.contact}
        />
        <p className="error" style={{ color: "red" }}>
          {formik.errors.contact &&
            formik.touched.contact &&
            formik.errors.contact}
        </p>
      </div>
      <div className="m-3">
        <label className="mb-1">
          Email Address
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control bg-light"
          name="email"
          type="text"
          id="email"
          value={formik.values.email}
          placeholder="Email Address"
        />
        <p style={{ color: "red" }} className="error">
          {formik.errors.email && formik.touched.email && formik.errors.email}
        </p>
      </div>
      <div className="m-3">
        <label className="mb-1" htmlFor="description">
          Description
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // onChange={handleInputData("description")}
          className="form-control bg-light"
          name="description"
          type="text"
          id="description"
          value={formik.values.description}
          placeholder="Description"
        />
        <p style={{ color: "red" }} className="error">
          {formik.errors.description &&
            formik.touched.description &&
            formik.errors.description}
        </p>
      </div>

      <div className="d-flex justify-content-end mt-3 me-3">
        <button type="reset" onClick={()=>{formik.resetForm()}} className="btn btn-outline-secondary me-3">
          Cancel
        </button>
        <button
          type="submit"
          style={{
            backgroundColor: "rgba(193, 107, 178, 1)",
            color: "white",
          }}
          className="btn"
          role="button"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Contact;
