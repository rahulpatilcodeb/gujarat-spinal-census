import React, { FormEvent, useState } from "react";
import bimg from "@/public/bimage.png";
import styles from "@/styles/Home.module.css";

const url = "https://gsc-project-1.s3.ap-south-1.amazonaws.com/";

const UserRegister = ({nextStep,handleFormData, values}:any) => {
// const [error, setError] = useState(false);
  function submitFormData(evt: any) {
    evt.preventDefault();
    //  if (!evt.target.value) {
    //    setError(true);
    //  } else{      
      nextStep();
// }
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
        onSubmit={submitFormData}
        className="pb-3"
        style={{ fontFamily: "Inter" }}
      >
        <div className="d-flex justify-content-center">
          <div>
            <img
              className="manImg"
              style={{
                height: "93px ",
                width: "75px ",
                marginRight: "15px ",
              }}
              alt=""
              src={bimg.src}
            />
          </div>
          <div
            className="align-items-center"
            style={{
              borderRadius: "5px",
              padding: "0px 15px",
              display: "flex",
              flexDirection: "row",
              border: "2px solid rgb(215, 215, 215)",
              backgroundColor: "rgba(244, 246, 251, 0.727)",
              height: "70px",
            }}
          >
            <span>
              <img src="upload.png" alt="" />
            </span>
            <input
              onChange={handleFormData}
              style={{ marginLeft: "10px " }}
              type="file"
              className="form-control"
            />
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
              <label className="text-danger"> *</label>
              <input
                // required
                name="fname"
                value={values.fname}
                onChange={handleFormData("fname")}
                type="text"
                className={`form-control ${styles.tcolor}`}
                id="fname"
                placeholder="First name"
                aria-label="First name"
              />
              {/* {error ? (
                <strong id="title-error" role="alert">
                  required filll
                </strong>
              ):""} */}
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
                required
                name="Lname"
                value={values.lname}
                onChange={handleFormData("lname")}
                type="text"
                className={`form-control ${styles.tcolor}`}
                id="Lname"
                placeholder="Last name"
                aria-label="Last name"
              />
            </div>
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
                required
                type="date"
                onChange={handleFormData("dob")}
                id="day"
                name="dob"
                className={`form-control ${styles.tcolor}`}
                value={values.dob}
              />
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
                  required
                  onChange={handleFormData("contact")}
                  name="contact"
                  value={values.contact}
                  type="number"
                  className={`form-control ${styles.tcolor}`}
                  id="Mnumber"
                />
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
                    required
                    onChange={handleFormData("gender")}
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
                    required
                    onChange={handleFormData("gender")}
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
                    required
                    value="other"
                    onChange={handleFormData("gender")}
                    type="radio"
                    className="custom-control-input"
                    name="gender"
                    id="other"
                  />
                </div>
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
              required
              onChange={handleFormData("email")}
              value={values.email}
              name="email"
              type="email"
              className={`form-control ${styles.tcolor}`}
              id="Email"
              placeholder="name@example.com"
            />
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
              required
              onChange={handleFormData("qualification")}
              name="qualification"
              className={`form-control ${styles.tcolor}`}
              id="Qualification"
              value={values.qualification}
              rows={1}
            ></textarea>
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
              required
              onChange={handleFormData("address")}
              name="address"
              className={`form-control ${styles.tcolor}`}
              id="address"
              rows={1}
              value={values.address}
            ></textarea>
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
              required
              onChange={handleFormData("district")}
              id="District"
              name="district"
              className={`form-select ${styles.tcolor}`}
              // value={values.district}
            >
              <option defaultChecked value="">
                District
              </option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Amreli">Amreli</option>
            </select>
          </div>

          <div className="col ">
            <label
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              BPL Card Holder
            </label>
            <div className="row mb-4">
              <div
                className="col d-flex justify-content-between bg-muted align-items-center"
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
                  required
                  onChange={handleFormData("bpl")}
                  type="radio"
                  name="bpl"
                  className="custom-control-input"
                  value="yes"
                  id="bpl"
                />
              </div>
              <div
                className="col d-flex justify-content-between tcolor align-items-center"
                style={{
                  background: "#F3F6F9",
                  borderRadius: "5px",
                  height: "50px",
                  margin: "10px",
                  color: "rgb(76 76 85)",
                }}
              >
                <label className="custom-control-label" htmlFor="bplNo">
                  No
                </label>
                <input
                  required
                  onChange={handleFormData("bpl")}
                  type="radio"
                  name="bpl"
                  className="custom-control-input"
                  value="no"
                  id="bplNo"
                />
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
                required
                onChange={handleFormData("description")}
                name="description"
                className={`form-control ${styles.tcolor}`}
                id="Description"
                rows={1}
                value={values.description}
              ></textarea>
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
