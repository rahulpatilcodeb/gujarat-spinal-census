import React, { useState } from "react";
import styles from "@/styles/Home.module.css";

const Personal = ({ nextStep, value }: any) => {
  console.log("personal value", value);
  function submitFormData(e: any) {
    e.preventDefault();
    nextStep();
  }

  return (
    <>
      <div className="mb-5 d-flex justify-content-center">
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
      <div>
        {value && value.length > 0 ? (
          value.map((user: any) => {
            return (
              <form name="formhome" onSubmit={submitFormData} key={user._id}>
                <div className="container mb-4">
                  <div className="row mb-4">
                    <div className="col">
                      <label htmlFor="fname" className="form-label">
                        First Name
                      </label>
                      <input
                        name="fname"
                        value={user.fname}
                        type="text"
                        className={`form-control ${styles.tcolor}`}
                        id="fname"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="lname" className={"form-label"}>
                        Last Name
                      </label>
                      <input
                        name="Lname"
                        value={user.lname}
                        type="text"
                        className={`form-control ${styles.tcolor}`}
                        id="Lname"
                        placeholder="Last name"
                        aria-label="Last name"
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <label htmlFor="fname" className={"form-label"}>
                      Date of Birth
                    </label>
                    <div className="col">
                      <input
                        type="text"
                        id="day"
                        name="dob"
                        className={`form-control ${styles.tcolor}`}
                        value={user.dob}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Gender</label>
                    <div className="custom-control">
                      <div className="row">
                        <div className="col d-flex justify-content-between">
                          <label
                            className="custom-control-label"
                            htmlFor="male"
                          >
                            Male
                          </label>

                          {`${user.gender}` && `${user.gender}` === "male" ? (
                            <input
                              type="radio"
                              className="custom-control-input"
                              defaultChecked
                            />
                          ) : (
                            <input
                              type="radio"
                              className="custom-control-input"
                              disabled
                            />
                          )}
                        </div>
                        <div className="col d-flex justify-content-between">
                          <label
                            className="custom-control-label"
                            htmlFor="female"
                          >
                            Female
                          </label>
                          {`${user.gender}` && `${user.gender}` === "Female" ? (
                            <input
                              type="radio"
                              className="custom-control-input"
                              defaultChecked
                            />
                          ) : (
                            <input
                              type="radio"
                              className="custom-control-input"
                              disabled
                            />
                          )}
                        </div>
                        <div className="col d-flex justify-content-between">
                          <label
                            className="custom-control-label"
                            htmlFor="others"
                          >
                            Others
                          </label>
                          {`${user.gender}` && `${user.gender}` === "other" ? (
                            <input
                              type="radio"
                              className="custom-control-input"
                              defaultChecked
                            />
                          ) : (
                            <input
                              type="radio"
                              className="custom-control-input"
                              disabled
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      name="address"
                      className={`form-control ${styles.tcolor}`}
                      id="address"
                      rows={1}
                      value={user.address}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="District" className="form-label">
                      District
                    </label>
                    <select
                      id="District"
                      name="district"
                      className={`form-select ${styles.tcolor}`}
                      value={user.district}
                    >
                      <option defaultChecked value="">
                        District
                      </option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Amreli">Amreli</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="Mnumber" className="form-label">
                      Mobile Number
                    </label>
                    <div className="input-group mb-4">
                      <span className="input-group-text" id="basic-addon1">
                        +91
                      </span>
                      <input
                        name="contact"
                        value={user.contact}
                        type="text"
                        className={`form-control ${styles.tcolor}`}
                        id="Mnumber"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="Email" className="form-label">
                      Email address
                    </label>
                    <input
                      value={user.email}
                      name="email"
                      type="email"
                      className={`form-control ${styles.tcolor}`}
                      id="Email"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Qualification" className="form-label">
                      Qualification
                    </label>
                    <textarea
                      name="qualification"
                      className={`form-control ${styles.tcolor}`}
                      id="Qualification"
                      value={user.qualification}
                      rows={1}
                    ></textarea>
                  </div>

                  <div className="col ">
                    <label className="form-label">BPL Card Holder</label>
                    <div className="row mb-4">
                      <div className="col d-flex justify-content-between bg-muted">
                        <label className="custom-control-label" htmlFor="bpl">
                          Yes
                        </label>
                        {`${user.bpl}` && `${user.bpl}` === "yes" ? (
                          <input
                            type="radio"
                            className="custom-control-input"
                            defaultChecked
                          />
                        ) : (
                          <input
                            type="radio"
                            className="custom-control-input"
                            disabled
                          />
                        )}
                      </div>
                      <div className="col d-flex justify-content-between tcolor">
                        <label className="custom-control-label" htmlFor="bplNo">
                          No
                        </label>
                        {`${user.bpl}` && `${user.bpl}` === "no" ? (
                          <input
                            type="radio"
                            className="custom-control-input"
                            defaultChecked
                          />
                        ) : (
                          <input
                            type="radio"
                            className="custom-control-input"
                            disabled
                          />
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Description" className="form-label">
                        Description
                      </label>
                      <textarea
                        name="description"
                        className={`form-control ${styles.tcolor}`}
                        id="Description"
                        rows={1}
                        value={user.description}
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end mb-5">
                      <button
                        type="submit"
                        style={{
                          backgroundColor: "rgba(193, 107, 178, 1)",
                          color: "white",
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
            );
          })
        ) : (
          <p className="justify-content-center fw-bold">No record</p>
        )}
      </div>
    </>
  );
};

export default Personal;
