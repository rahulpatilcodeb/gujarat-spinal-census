import React, { useEffect } from "react";
import bimg from "@/public/bimage.png";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Select from "react-select";
import { useTranslation } from "react-i18next";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'



const url = "https://gsc-project-1.s3.ap-south-1.amazonaws.com/";


const UserRegister = ({
  nextStep,
  values,
  setFormData,
  // translate,
}: any) => {
  const [initValue, setInitValue] = useState(values);

  const { t: translate } = useTranslation('common')


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
    // description: Yup.string().required("Please enter description!"),
    gender: Yup.string().required("Please enter gender here"),
    bpl: Yup.string().required("Do you have bpl card!"),
    qualification: Yup.string().required("Please enter your Qualification!"),
    file: Yup.mixed().required("please select an image").test("file", "Unsupported File Format",
      (value: any) => {
        if (value) {
          return (
            value.type === "image/jpeg" ||
            value.type === "image/jpg" ||
            value.type === "image/png"
          );
        } else {
          return true;
        }
      }).test('file', 'file size should less than 3MB', (value: any) => {
        // console.log(value.size<=1024 * 1024)

        return !value || (value && value.size <= 1024 * 1024 * 3)
      })
  });


  const formik = useFormik({
    initialValues: initValue,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      setFormData(formik.values)
      // console.log("values", values, "formik values", formik.values);
      nextStep();
    },
  });



  function linkClick(e: any) {
    e.preventDefault();
    const fileSelect = document.getElementById("avatar");

    fileSelect?.click();
  }
  const options = [
    { value: "Ahmedabad", label: translate("Ahmedabad") },
    { value: "Vadodara", label: translate("Vadodara") },
    { value: "Anand", label: translate("Anand") },
    { value: "Chota Udepur", label: translate("Chota Udepur") },
    { value: "Dahod", label: translate("Dahod") },
    { value: "Kheda", label: translate("Kheda") },
    { value: "Mahisagar", label: translate("Mahisagar") },
    { value: "Panchmahal", label: translate("Panchmahal") },
    { value: "Gandhinagar", label: translate("Gandhinagar") },
    { value: "Aravalli", label: translate("Aravalli") },
    { value: "Banaskantha", label: translate("Banaskantha") },
    { value: "Mehsana", label: translate("Mehsana") },
    { value: "Patan", label: translate("Patan") },
    { value: "Sabarkantha", label: translate("Sabarkantha") },
    { value: "Kutch", label: translate("Kutch") },
    { value: "Rajkot", label: translate("Rajkot") },
    { value: "Amreli", label: translate("Amreli") },
    { value: "Bhavnagar", label: translate("Bhavnagar") },
    { value: "Botad", label: translate("Botad") },
    { value: "Devbhoomi Dwarka", label: translate("Devbhoomi Dwarka") },
    { value: "Gir Somnath", label: translate("Gir Somnath") },
    { value: "Jamnagar", label: translate("Jamnagar") },
    { value: "Junagadh", label: translate("Junagadh") },
    { value: "Morbi", label: translate("Morbi") },
    { value: "Porbandar", label: translate("Porbandar") },
    { value: "Surendranagar", label: translate("Surendranagar") },
    { value: "Surat", label: translate("Surat") },
    { value: "Bharuch", label: translate("Bharuch") },
    { value: "Dang", label: translate("Dang") },
    { value: "Narmada", label: translate("Narmada") },
    { value: "Navsari", label: translate("Navsari") },
    { value: "Tapi", label: translate("Tapi") },
    { value: "Valsad", label: translate("Valsad") }
  ];

  const optionsG = [
    { value: "Ahmedabad", label: translate("Ahmedabad") },
    { value: "Vadodara", label: translate("Vadodara") },
    { value: "Anand", label: translate("Anand") },
    { value: "Chota Udepur", label: translate("Chota Udepur") },
    { value: "Dahod", label: translate("Dahod") },
    { value: "Kheda", label: translate("Kheda") },
    { value: "Mahisagar", label: translate("Mahisagar") },
    { value: "Panchmahal", label: translate("Panchmahal") },
    { value: "Gandhinagar", label: translate("Gandhinagar") },
    { value: "Aravalli", label: translate("Aravalli") },
    { value: "Banaskantha", label: translate("Banaskantha") },
    { value: "Mehsana", label: translate("Mehsana") },
    { value: "Patan", label: translate("Patan") },
    { value: "Sabarkantha", label: translate("Sabarkantha") },
    { value: "Kutch", label: translate("Kutch") },
    { value: "Rajkot", label: translate("Rajkot") },
    { value: "Amreli", label: translate("Amreli") },
    { value: "Bhavnagar", label: translate("Bhavnagar") },
    { value: "Botad", label: translate("Botad") },
    { value: "Devbhoomi Dwarka", label: translate("Devbhoomi Dwarka") },
    { value: "Gir Somnath", label: translate("Gir Somnath") },
    { value: "Jamnagar", label: translate("Jamnagar") },
    { value: "Junagadh", label: translate("Junagadh") },
    { value: "Morbi", label: translate("Morbi") },
    { value: "Porbandar", label: translate("Porbandar") },
    { value: "Surendranagar", label: translate("Surendranagar") },
    { value: "Surat", label: translate("Surat") },
    { value: "Bharuch", label: translate("Bharuch") },
    { value: "Dang", label: translate("Dang") },
    { value: "Narmada", label: translate("Narmada") },
    { value: "Navsari", label: translate("Navsari") },
    { value: "Tapi", label: translate("Tapi") },
    { value: "Valsad", label: translate("Valsad") }
  ]


  return (
    <>
      <div
        className="mb-5 d-flex justify-content-center"
        style={{ fontSize: "22px" }}
      >
        <div style={{ marginRight: "50px" }}>
          <div className="col">
            <span
              style={{

                backgroundColor: "rgb(78, 244, 105)",
                padding: "6px 13px",
                borderRadius: "10px",
                marginRight: "10px",
                color: "white"

              }}
            >
              1
            </span>
            <span>{translate('Personal Details')} -</span>
          </div>
        </div>
        <div>
          <div className="col">
            <span
              style={{
                backgroundColor: "rgb(228, 233, 229)",
                padding: "6px 13px",
                borderRadius: "10px",
                marginRight: "10px",
              }}
            >
              2
            </span>
            <span>{translate('Injury Details')} -</span>
          </div>
        </div>
      </div>

      <form
        noValidate
        name="formhome"
        onSubmit={formik.handleSubmit}
        className="pb-3 form-group"
        encType="multipart/jpeg"
      >
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <img

              className="manImg mt-1"
              style={{
                width: "50px ",
                height: "60px",
                marginRight: "25px ",

              }}
              alt=""
              src={
                formik.values.file
                  ? URL.createObjectURL(formik.values.file)
                  : bimg.src
              }
            />
          </div>
          <div
            className="align-items-center "
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
              name="file"
              onBlur={formik.handleBlur}
              onChange={(e: any) => {
                formik.setFieldValue("file", e.target.files[0]);
                // console.log(e.target.files[0]);
              }}
              style={{ marginLeft: "10px ", display: "none" }}
              type="file"
              className="form-control"
            />

            <p style={{ color: "black", paddingTop: "10px" }}>
              {" "}
              <img style={{ width: "20px" }} src="upload.png" alt="" />
              <Link
                style={{ textDecoration: "none", color: "rgb(78, 244, 105)" }}
                href="/"
                onClick={linkClick}
                id="fileSelect"
              >
                Click here
              </Link>{" "}
              to select picture from media
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {formik.touched.file && formik.errors.file && (
            <p style={{ color: "red" }} className="error">
              {(formik.errors.file).toString()}
            </p>
          )}
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

                {translate('First Name')}
                {/* {translate('home')} */}


              </label>

              <input
                name="fname"
                value={formik.values.fname}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                className={`form-control ${styles.tcolor}`}
                id="fname"
                placeholder={translate('First Name') as string}
                aria-label="First name"
              />
              {formik.touched.fname && formik.errors.fname && (
                <p style={{ color: "red" }} className="error">
                  {formik.errors.fname.toString()}
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
                {translate('Last Name')}
              </label>
              <label className="text-danger"> *</label>
              <input
                onBlur={formik.handleBlur}
                name="lname"
                value={formik.values.lname}
                onChange={formik.handleChange}
                type="text"
                className={`form-control ${styles.tcolor}`}
                id="Lname"
                placeholder={translate('Last Name') as string}
                aria-label="Last name"
              />
              {formik.touched.lname && formik.errors.lname && (
                <p style={{ color: "red" }} className="error">
                  {(formik.errors.lname).toString()}
                </p>
              )}
            </div>

            {"    "}
          </div>

          <div className="row mb-1">
            <div className="col">
              <label
                htmlFor="fname"
                className="form-label"
                style={{
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                {translate('Date of Birth')}
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
              {formik.touched.dob && formik.errors.dob && (
                <p style={{ color: "red" }} className="error">
                  {(formik.errors.dob).toString()}
                </p>
              )}

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
                {translate('contact number')}
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
                  value={formik.values.contact}
                  type="number"
                  placeholder="9999999999"
                  className={`form-control ${styles.tcolor}`}
                  id="Mnumber"
                />
                {formik.touched.contact && formik.errors.contact && (
                  <p style={{ color: "red" }} className="error">
                    {(formik.errors.contact).toString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              {translate('gender')}
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
                  <label
                    className="custom-control-label"
                    htmlFor="male"
                    style={{ width: "100%" }}
                  >
                    {translate('male')}
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
                  <label
                    className="custom-control-label"
                    htmlFor="female"
                    style={{ width: "100%" }}
                  >
                    {translate('female')}

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
                  <label
                    className="custom-control-label"
                    htmlFor="others"
                    style={{ width: "100%" }}
                  >
                    {translate('others')}


                  </label>
                  <input
                    value="other"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.gender == "other"}
                    type="radio"
                    className="custom-control-input"
                    name="gender"
                    id="others"
                  />
                </div>
                {formik.touched.gender && formik.errors.gender && (
                  <p style={{ color: "red" }} className="error">
                    {(formik.errors.gender).toString()}
                  </p>
                )}
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
              {translate('e-mail address')}


            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              type="email"
              className={`form-control ${styles.tcolor}`}
              id="Email"
              placeholder="name@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{ color: "red" }} className="error">
                {(formik.errors.email).toString()}
              </p>
            )}
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
              {translate('Educational Qualification')}


            </label>

            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="qualification"
              className={`form-control ${styles.tcolor}`}
              id="Qualification"
              value={formik.values.qualification}
              rows={1}
            ></textarea>
            {formik.touched.qualification && formik.errors.qualification && (
              <p style={{ color: "red" }} className="error">
                {(formik.errors.qualification).toString()}
              </p>
            )}
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
              {translate('address')}


            </label>
            <textarea
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="address"
              className={`form-control ${styles.tcolor}`}
              id="address"
              rows={1}
              minLength={10}
              value={formik.values.address}
            ></textarea>
            {formik.touched.address && formik.errors.address && (
              <p style={{ color: "red" }} className="error">
                {(formik.errors.address).toString()}
              </p>
            )}
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
              {translate('District')}


            </label>
            {/* <Select
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
              <option
                value="Ahmedabad"
                selected={formik.values.district == "Ahmedabad"}
              >
                Ahmedabad
              </option>
              <option
                value="Amreli"
                selected={formik.values.district == "Amreli"}
              >
                Amreli
              </option>
            </Select> */}

            <Select
              defaultValue={options.find((e) => formik.values.district == e.value)}
              onChange={(e: any) => formik.setFieldValue("district", e.value)}
              options={options}
              id="District"
              name="district"

              // className={`form-select ${styles.tcolor}`}
              onBlur={formik.handleBlur}
            // value={values.district}
            />
            {formik.touched.district && formik.errors.district && (
              <p style={{ color: "red" }} className="error">
                {(formik.errors.district).toString()}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              {translate('BPL')}


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
                  <label
                    className="custom-control-label"
                    htmlFor="bpl"
                    style={{ width: "100%" }}
                  >
                    {translate('yes')}


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
                  <label
                    className="custom-control-label"
                    htmlFor="bplno"
                    style={{ width: "100%" }}
                  >
                    {translate('no')}


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
                {formik.touched.bpl && formik.errors.bpl && (
                  <p style={{ color: "red" }} className="error">
                    {(formik.errors.bpl).toString()}
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
                {translate('Description')}


              </label>
              <textarea
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="description"
                className={`form-control ${styles.tcolor}`}
                id="Description"
                rows={1}
                value={formik.values.description}
                style={{ overflow: "hidden:", resize: "none" }}
              ></textarea>
              {/* {formik.touched.description && formik.errors.description && (
                <p style={{ color: "red" }} className="error">
                  {(formik.errors.description).toString()}
                </p>
              )} */}
            </div>
            <div className="d-flex justify-content-end mb-5">
              <button
                type="submit"
                // disabled={formik.isSubmitting}
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
