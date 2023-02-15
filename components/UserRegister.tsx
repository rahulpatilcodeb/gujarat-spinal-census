import React, { useEffect } from "react";
import bimg from "@/public/bimage.png";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fromPairs } from "lodash";

const url = "https://gsc-project-1.s3.ap-south-1.amazonaws.com/";


const UserRegister = ({
  nextStep,
  handleFormData,
  Ifile,
  values,
  selectedFile,
}: any) => {
  const [initValue, setInitValue] = useState(values);


  const schema = Yup.object().shape({
    fname: Yup.string()
      .min(3, "Too Short!")
      .max(12, "Too Long!")
      .required("Please enter your first name!"),
    lname: Yup.string().required("Please enter your Last name!"),
    address: Yup.string().required("Please enter your address!"),
    contact: Yup.number()
      .positive("can not be negative")
      .required("Please enter your phone number!"),
    district: Yup.string().required("please select district"),
    dob: Yup.date()
      .max(new Date(), "date can not exceeds current time")
      .required("please select your date of birth"),
    email: Yup.string()
      .required("Email i  s a required field")
      .email("Invalid email format"),
    description: Yup.string().required("Please enter description!"),
    gender: Yup.string().required("Please enter gender here"),
    bpl: Yup.string().required("Do you have bpl card!"),
    qualification: Yup.string().required("Please enter your Qualification!"),
  });

  // const imagePreviewElement = document.querySelector("avatar");
  // let imageSrc;
  // if(Ifile!=undefined){
  //   const imageSrc = URL.createObjectURL(Ifile);
  //   // imagePreviewElement.src = imageSrc;
  // }

  // console.log(imagePreviewElement);

  // const { register, handleSubmit } = useForm();

  // console.log("image is ", url, img);
  const formik = useFormik({
    initialValues: initValue,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      setInitValue(formik.values)
      console.log("values", values);
      nextStep();
      // alert(JSON.stringify(values, null, 2));
    },
  });

  // function submitFormData(e: any) {
  //   e.preventDefault();

  //   formik.handleSubmit();
  //   values.fname = formik.values.fname;
  //   values.lname = formik.values.lname;
  //   values.dob = formik.values.dob;
  //   values.gender = formik.values.gender;
  //   values.address = formik.values.address;
  //   values.district = formik.values.district;
  //   values.contact = formik.values.contact;
  //   values.qualification = formik.values.qualification;
  //   values.bpl = formik.values.bpl;
  //   values.email = formik.values.email;
  //   values.description = formik.values.description;
  //   console.log();
  //   console.log(formik.errors.fname);
  //   console.log(typeof formik.errors.fname);
  //   if (
  //     formik.values.fname != "" &&
  //     formik.errors.fname == undefined &&
  //     formik.values.lname != "" &&
  //     formik.errors.lname == undefined &&
  //     formik.values.dob != "" &&
  //     formik.errors.dob == undefined &&
  //     formik.values.gender != "" &&
  //     formik.errors.gender == undefined &&
  //     formik.values.address != "" &&
  //     formik.errors.address == undefined &&
  //     formik.values.district != "" &&
  //     formik.errors.district == undefined &&
  //     formik.values.description != "" &&
  //     formik.errors.description == undefined &&
  //     formik.values.bpl != "" &&
  //     formik.errors.bpl == undefined &&
  //     formik.values.contact != "" &&
  //     formik.errors.contact == undefined &&
  //     formik.values.qualification != "" &&
  //     formik.errors.qualification == undefined &&
  //     formik.values.email != "" &&
  //     formik.errors.email == undefined
  //   ) {
  //     nextStep();
  //   }
  // }

  // useEffect(() => {
  // if (values.fname != "") {
  //   formik.values.fname = values.fname;
  //   formik.values.lname = values.lname;
  //   formik.values.dob = values.dob;
  //   formik.values.gender = values.gender;
  //   formik.values.address = values.address;
  //   formik.values.district = values.district;
  //   formik.values.description = values.description;

  //   formik.values.bpl = values.bpl;

  //   formik.values.contact = values.contact;
  //   formik.values.qualification = values.qualification;
  //   formik.values.email = values.email;
  // }
  // }, []);
  // var image = document.getElementById("avatar").src

  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log("in file", e.target.files.length);
      setSelectedImage(e.target.files[0]);
    }
  };

  function linkClick(e: any) {
    e.preventDefault();
    const fileSelect = document.getElementById("avatar");

    fileSelect?.click();
  }

  return (
    <>
      <div
        className="mb-5 d-flex justify-content-center"
        style={{ fontFamily: "Inter", fontSize: "22px" }}
      >
        <div style={{ marginRight: "50px" }}>
          <div className="col">
            <span
              style={{
                border: "2px solid rgb(0, 238, 40)",
                backgroundColor: "rgb(78, 244, 105)",
                padding: "5px 8px",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              1
            </span>
            <span>Personal Details -</span>
          </div>
        </div>
        <div>
          <div className="col">
            <span
              style={{
                border: "2px solid rgb(231, 231, 231)",
                backgroundColor: "rgb(228, 233, 229)",
                padding: "5px 8px ",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              2
            </span>
            <span>Injury Details -</span>
          </div>
        </div>
      </div>

      <form
        name="formhome"
        onSubmit={formik.handleSubmit}
        className="pb-3 form-group"
        encType="multipart/jpeg"
        style={{ fontFamily: "Inter" }}
      >
        <div className="d-flex justify-content-center">
          <div>
            <img
              className="manImg"
              style={{
                width: "80px ",
                marginRight: "25px ",
              }}
              alt=""
              // src={img?`${url}${img}`:bimg.src}
              src={
                selectedImage ? URL.createObjectURL(selectedImage) : bimg.src
              }
            />
          </div>
          <div
            className="align-items-center align-middle"
            style={{
              borderRadius: "10px",
              padding: "0px 20px",
              display: "flex",
              flexDirection: "row",
              border: "2px solid rgb(215, 215, 215)",
              backgroundColor: "rgba(244, 246, 251, 0.727)",
              height: "65px",
            }}
          >
            <input
              required
              accept="image/*"
              id="avatar"
              onBlur={formik.handleBlur}
              // onChange={}
              onChange={(e) => {
                handleFormData("avatar");
                selectedFile(e);
                imageChange(e);
              }}
              // style={{ marginLeft: "10px ", display: "none" }}
              type="file"
              className="form-control"
            />

            {/* <p style={{ color: "black", paddingTop: "10px" }}>
              {" "}
              <img style={{ width: "20px" }} src="upload.png" alt="" />
              <a
                style={{ textDecoration: "none", color: "rgb(78, 244, 105)" }}
                href="/"
                onClick={linkClick}
                id="fileSelect"
              >
                Click here
              </a>{" "}
              to select picture from media
            </p> */}
          </div>
        </div>

        <div className="container mb-4">
          <div className="row mb-4">
            <div className="col">
              <label
                htmlFor="fname"
                className="form-label"
                style={{
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                First Name
              </label>

              <input
                name="fname"
                value={formik.values.fname}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                className={`form-control ${styles.tcolor}`}
                id="fname"
                placeholder="First name"
                aria-label="First name"
              />
              {formik.errors.fname && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.fname)}
                </p>
              )}
            </div>
            <div className="col">
              <label
                htmlFor="lname"
                className="form-label"
                style={{
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                Last Name
              </label>
              <label className="text-danger"> *</label>
              <input
                onBlur={formik.handleBlur}
                name="lname"
                value={
                  formik.values.lname == "" ? values.lname : formik.values.lname
                }
                onChange={formik.handleChange}
                type="text"
                className={`form-control ${styles.tcolor}`}
                id="Lname"
                placeholder="Last name"
                aria-label="Last name"
              />
              {formik.errors.fname && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.fname)}
                </p>
              )}
              {/* <p style={{ color: "red" }} className="error">
                {formik.errors.lname &&
                  formik.touched.lname &&
                  formik.errors.lname}
              </p> */}
            </div>

            {"    "}
          </div>

          <div className="row mb-4">
            <div className="col">
              <label
                htmlFor="fname"
                className="form-label"
                style={{
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                Date of Birth
              </label>
              <label className="text-danger"> *</label>

              <input
                onBlur={formik.handleBlur}
                type="date"
                onChange={formik.handleChange}
                id="day"
                name="dob"
                className={`form-control ${styles.tcolor}`}
                value={formik.values.dob}
              />
              {formik.errors.dob && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.dob)}
                </p>
              )}
              {/* <div className="invalid-feedback">
                Please choose a Date of Birth.
              </div> */}
              {/* <p style={{ color: "red" }} className="error">
                {formik.errors.dob && formik.touched.dob && formik.errors.dob}
              </p> */}
            </div>
            <div className="col">
              <label
                htmlFor="Mnumber"
                className="form-label"
                style={{
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                Mobile Number
              </label>
              <label className="text-danger"> *</label>

              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">
                  +91
                </span>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="contact"
                  value={
                    formik.values.contact
                  }
                  type="number"
                  placeholder="9999999999"
                  className={`form-control ${styles.tcolor}`}
                  id="Mnumber"
                />
                {formik.errors.contact && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.contact)}
                </p>
              )}
                {/* <p style={{ color: "red" }} className="error">
                  {formik.errors.contact &&
                    formik.touched.contact &&
                    formik.errors.contact}
                </p> */}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              Gender
            </label>
            <div className="custom-control ">
              <div className="row">
                <div
                  className="col d-flex justify-content-between align-items-center"
                  style={{
                    background: "#F3F6F9",
                    borderRadius: "5px",
                    height: "50px",
                    margin: "10px",
                    color: "rgb(76 76 85)",
                  }}
                >
                  <label className="custom-control-label" htmlFor="male">
                    Male
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.gender == "male"}
                    value="male"
                    type="radio"
                    name="gender"
                    className="custom-control-input"
                    id="male"
                  />
                </div>
                <div
                  className="col d-flex justify-content-between align-items-center"
                  style={{
                    background: "#F3F6F9",
                    borderRadius: "5px",
                    height: "50px",
                    margin: "10px",
                    color: "rgb(76 76 85)",
                  }}
                >
                  <label className="custom-control-label" htmlFor="female">
                    Female
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.gender == "Female"}
                    value="Female"
                    type="radio"
                    name="gender"
                    className="custom-control-input"
                    id="female"
                  />
                </div>
                <div
                  className="col d-flex justify-content-between align-items-center"
                  style={{
                    background: "#F3F6F9",
                    borderRadius: "5px",
                    height: "50px",
                    margin: "10px",
                    color: "rgb(76 76 85)",
                  }}
                >
                  <label className="custom-control-label" htmlFor="others">
                    Others
                  </label>
                  <input
                    value="other"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.gender == "other"}
                    type="radio"
                    className="custom-control-input"
                    name="gender"
                    id="other"
                  />
                </div>
                {formik.errors.gender && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.gender)}
                </p>
              )}
                {/* <p style={{ color: "red" }} className="error">
                  {formik.errors.gender &&
                    formik.touched.gender &&
                    formik.errors.gender}
                </p> */}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              Email address
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={
                formik.values.email
              }
              name="email"
              type="email"
              className={`form-control ${styles.tcolor}`}
              id="Email"
              placeholder="name@example.com"
            />
            {formik.errors.email && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.email)}
                </p>
              )}
            {/* <p style={{ color: "red" }} className="error">
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </p> */}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Qualification"
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              Qualification
            </label>

            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="qualification"
              className={`form-control ${styles.tcolor}`}
              id="Qualification"
              value={
                formik.values.qualification 
              }
              rows={1}
            ></textarea>
            {formik.errors.qualification && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.qualification)}
                </p>
              )}
            {/* <p style={{ color: "red" }} className="error">
              {formik.errors.qualification &&
                formik.touched.qualification &&
                formik.errors.qualification}
            </p> */}
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              Address
            </label>
            <textarea
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="address"
              className={`form-control ${styles.tcolor}`}
              id="address"
              rows={1}
              minLength={10}
              value={
                formik.values.address
              }
            ></textarea>
            {formik.errors.address && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.address)}
                </p>
              )}
            {/* <div className="invalid-feedback">Please Type valid Address.</div> */}
            {/* <p style={{ color: "red" }} className="error">
              {formik.errors.address &&
                formik.touched.address &&
                formik.errors.address}
            </p> */}
          </div>

          <div className="mb-4">
            <label
              htmlFor="District"
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              District
            </label>
            <select
              onChange={formik.handleChange}
              id="District"
              name="district"
              className={`form-select ${styles.tcolor}`}
              onBlur={formik.handleBlur}
            // value={values.district}
            >
              <option defaultChecked value="">
                District
              </option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Amreli">Amreli</option>
            </select>
            {formik.errors.district && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.district)}
                </p>
              )}
            {/* <div className="invalid-feedback">Please choose a District.</div> */}
            {/* <p style={{ color: "red" }} className="error">
              {formik.errors.district &&
                formik.touched.district &&
                formik.errors.district}
            </p> */}
          </div>

          <div className="mb-4">
            <label
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              Bpl Card Holder
            </label>
            <div className="custom-control ">
              <div className="row">
                <div
                  className="col d-flex justify-content-between align-items-center"
                  style={{
                    background: "#F3F6F9",
                    borderRadius: "5px",
                    height: "50px",
                    margin: "10px",
                    color: "rgb(76 76 85)",
                  }}
                >
                  <label className="custom-control-label" htmlFor="bpl">
                    Yes
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.bpl == "yes"}
                    value="yes"
                    type="radio"
                    name="bpl"
                    className="custom-control-input"
                    id="bpl"
                  />
                </div>
                <div
                  className="col d-flex justify-content-between align-items-center"
                  style={{
                    background: "#F3F6F9",
                    borderRadius: "5px",
                    height: "50px",
                    margin: "10px",
                    color: "rgb(76 76 85)",
                  }}
                >
                  <label className="custom-control-label" htmlFor="bplno">
                    NO
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.bpl == "no"}
                    value="no"
                    type="radio"
                    name="bpl"
                    className="custom-control-input"
                    id="bplno"
                  />
                </div>
                {formik.errors.bpl && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.bpl)}
                </p>
              )}
                {/* <p style={{ color: "red" }} className="error">
                  {formik.errors.bpl && formik.touched.bpl && formik.errors.bpl}
                </p> */}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="Description"
                className="form-label"
                style={{
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                Description
              </label>
              <textarea
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="description"
                className={`form-control ${styles.tcolor}`}
                id="Description"
                rows={1}
                value={
                  formik.values.description 
                }
              ></textarea>
              {formik.errors.description && (
                <p style={{ color: "red" }} className="error">
                  {JSON.stringify(formik.errors.description)}
                </p>
              )}
              {/* <p style={{ color: "red" }} className="error">
                {formik.errors.description &&
                  formik.touched.description &&
                  formik.errors.description}
              </p> */}
            </div>
            <div className="d-flex justify-content-end mb-5">
              <button
                type="submit"
                // onClick={submitFormData}
                style={{
                  backgroundColor: "rgba(193, 107, 178, 1)",
                  color: "white",
                  fontSize: "18px",
                }}
                className="btn"
                role="button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserRegister;
