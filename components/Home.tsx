import React, { useState } from "react";
import bimg from "@/public/bimage.png";
import "@/styles/Home.module.css";
// import {useFormData} from "./Formdata"

const Home = ({nextStep,handleFormData, values}:any) => {
  // const [data, FormData] = useState({});

  // const handleSubmit = (event) => {
  //   console.log("in handle submit");
  //   event.preventDefault();
    
  //   console.log(data);
  // };

  // function handleFormData(event) {
  //   return FormData({
  //     ...data,
  //     [event.target.name]: event.target.value,
  //   });
  // }

  function submitFormData(e:any){
    e.preventDefault()
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
        <div style={{ marginLeft: "50px " }}>
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
      <form name="formhome" onSubmit={submitFormData} style={{ margin: "0px 339px " }}>
        <div className="d-flex justify-content-center">
          <div>
            <img
              className="manImg"
              style={{ height: "93px ", width: "75px ", marginRight: "15px " }}
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
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <input
                name="fname"
                value={values.fname}
                onChange={handleFormData("fname")}
                type="text"
                className="form-control tcolor"
                id="fname"
                placeholder="First name"
                aria-label="First name"
              />
            </div>
            <div className="col">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <input
                name="Lname"
                value={values.lname}
                onChange={handleFormData('lname')}
                type="text"
                className="form-control tcolor"
                id="Lname"
                placeholder="Last name"
                aria-label="Last name"
              />
            </div>
          </div>

          <div className="row mb-4">
            <label htmlFor="fname" className="form-label ">
              Date of Birth
            </label>
            <div className="col">
              <input
              type="date"
                onChange={handleFormData("dob")}
                id="day"
                name="dob"
                className="form-control tcolor"
                value={values.dob}
              />
                
            </div>
            {/* <div className="col">
              <select
                onChange={handleFormData}
                id="month"
                name="dobm"
                className="form-select tcolor"
              >
                <option value="-1">Month:</option>
                <option value="January">Jan</option>
                <option value="February">Feb</option>
                <option value="March">Mar</option>
                <option value="April">Apr</option>
                <option value="May">May</option>
                <option value="June">Jun</option>
                <option value="July">Jul</option>
                <option value="August">Aug</option>
                <option value="September">Sep</option>
                <option value="October">Oct</option>
                <option value="November">Nov</option>
                <option value="December">Dec</option>
              </select>
            </div>
            <div className="col">
              <select
                onChange={handleFormData}
                id="year"
                name="doby"
                className="form-select tcolor"
              >
                <option value="-1">Year:</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
              </select>
            </div> */}
          </div>

          <div className="mb-4">
            <label className="form-label">Gender</label>
            <div className="custom-control">
              <div className="row">
                <div className="col d-flex justify-content-between">
                  <label className="custom-control-label" htmlFor="male">
                    Male
                  </label>
                  <input
                    onChange={handleFormData("gender")}
                    value="male"
                    type="radio"
                    name="gender"
                    className="custom-control-input"
                    id="male"
                  />
                </div>
                <div className="col d-flex justify-content-between">
                  <label className="custom-control-label" htmlFor="female">
                    Female
                  </label>
                  <input
                    onChange={handleFormData("gender")}
                    value="Female"
                    type="radio"
                    name="gender"
                    className="custom-control-input"
                    id="female"
                  />
                </div>
                <div className="col d-flex justify-content-between">
                  <label className="custom-control-label" htmlFor="others">
                    Others
                  </label>
                  <input
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
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              onChange={handleFormData("address")}
              name="address"
              className="form-control tcolor"
              id="address"
              rows={1}
              value={values.address}
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="District" className="form-label">
              District
            </label>
            <select
              onChange={handleFormData("district")}
              id="District"
              name="district"
              className="form-select tcolor"
              // value={values.district}
            >
              <option defaultChecked  value="">District</option>
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
                onChange={handleFormData("contact")}
                name="contact"
                value={values.contact}
                type="text"
                className="form-control tcolor"
                id="Mnumber"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              onChange={handleFormData("email")}
              value={values.email}
              name="email"
              type="email"
              className="form-control tcolor"
              id="Email"
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Qualification" className="form-label">
              Qualification
            </label>
            <textarea
              onChange={handleFormData("qualification")}
              name="qualification"
              className="form-control tcolor"
              id="Qualification"
              value={values.qualification}
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
                <input
                  onChange={handleFormData("bpl")}
                  type="radio"
                  name="bpl"
                  className="custom-control-input"
                  value="yes"
                  id="bpl"
                />
              </div>
              <div className="col d-flex justify-content-between tcolor">
                <label className="custom-control-label" htmlFor="bplNo">
                  No
                </label>
                <input
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
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <textarea
                onChange={handleFormData("description")}
                name="description"
                className="form-control tcolor"
                id="Description"
                rows={1}
                value={values.description}
              ></textarea>
            </div>
            <div className="d-md-flex justify-content-md-end mb-5">
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
    </>
  );
};

export default Home;
