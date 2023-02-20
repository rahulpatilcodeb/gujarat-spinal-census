import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Router } from "express";
import { useRouter } from "next/router";

const Personal = ({ nextStep, value }: any) => {

  const { user: user, islogin: Ilogin } = useSelector(
    (state: RootState) => state.users
  );
  const router = useRouter()

  useEffect(() => {

    if (!Ilogin) {
      router.push("/admin/login")
    }
  }, [Ilogin])
  console.log("personal value", value);
  function submitFormData(e: any) {
    nextStep();
  }
  const url = "https://gsc-project-1.s3.ap-south-1.amazonaws.com/";



  return (
    <>
      <div>
        <div className="mb-5 d-flex justify-content-center"
          style={{ fontSize: "22px" }} >
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
                <form
                  name="formhome"
                  className="pb-3"
                  onSubmit={submitFormData}
                  key={user._id}
                >
                  <img
                    // onChange={(e)=>setImg(e)}
                    className="manImg"
                    style={{ height: "80px ", marginRight: "15px " }}
                    alt=""
                    src={`${url}${user.email}/${user.image}`}
                  />

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
                          defaultValue={user.fname}
                          type="text"
                          className={`form-control ${styles.tcolor}`}
                          id="fname"
                          readOnly
                        />
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
                        <input
                          name="Lname"
                          defaultValue={user.lname}
                          type="text"
                          className={`form-control ${styles.tcolor}`}
                          id="Lname"
                          placeholder="Last name"
                          aria-label="Last name"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
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
                      <div className="col">
                        <input
                          type="text"
                          id="day"
                          name="dob"
                          className={`form-control ${styles.tcolor}`}
                          defaultValue={user.dob}
                          readOnly
                        />
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
                      <div className="custom-control">
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
                            >
                              Female
                            </label>
                            {`${user.gender}` &&
                              `${user.gender}` === "Female" ? (
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
                            >
                              Others
                            </label>
                            {`${user.gender}` &&
                              `${user.gender}` === "other" ? (
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
                        name="address"
                        className={`form-control ${styles.tcolor}`}
                        id="address"
                        rows={1}
                        defaultValue={user.address}
                        readOnly
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
                        id="District"
                        name="district"
                        className={`form-select ${styles.tcolor}`}
                        defaultValue={user.district}
                      >
                        <option defaultChecked value="">
                          District
                        </option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Amreli">Amreli</option>
                      </select>
                    </div>
                    <div className="mb-4">
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
                      <div className="input-group mb-4">
                        <span className="input-group-text" id="basic-addon1">
                          +91
                        </span>
                        <input
                          name="contact"
                          defaultValue={user.contact}
                          type="text"
                          className={`form-control ${styles.tcolor}`}
                          id="Mnumber"
                          readOnly
                        />
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
                        defaultValue={user.email}
                        name="email"
                        type="email"
                        className={`form-control ${styles.tcolor}`}
                        id="Email"
                        placeholder="name@example.com"
                        readOnly
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
                        name="qualification"
                        className={`form-control ${styles.tcolor}`}
                        id="Qualification"
                        defaultValue={user.qualification}
                        rows={1}
                        readOnly
                      ></textarea>
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
                          className="col d-flex justify-content-between align-items-center bg-muted"
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
                        <div
                          className="col d-flex justify-content-between align-items-center tcolor"
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
                            htmlFor="bplNo"
                          >
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
                          name="description"
                          className={`form-control ${styles.tcolor}`}
                          id="Description"
                          rows={1}
                          defaultValue={user.description}
                          readOnly
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
      </div>
    </>
  );
};

export default Personal;
