// import "./App.css";
import { useState } from "react";
import axios from "axios";
import styles from "@/styles/Home.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    contact: "",
    email: "",
    description: "",
  });

  console.log("formData", formData);

  const onsubmit = () => {
    axios
      .post(` ${process.env.NEXT_PUBLIC_API_URL}/contact`, formData)
      .then(() => console.log("User Added"))
      .catch((err) => {
        console.error(err);
      });
    console.log("data added");
  };

  const handleInputData = (input: any) => (e: any) => {
    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  return (
    <>
      <div>
        <div>
          <p
            style={{
              fontFamily: "Inter",
              // fontWeight: "400",
              fontSize: "20%",
              marginLeft: "15%",
            }}
          >
            Contact Form
          </p>
        </div>
        <div className="d-flex justify-content-center ">
          <form onSubmit={onsubmit}>
            <div className="mb-4">
              <label htmlFor="Mnumber" className="form-label">
                Mobile Number
              </label>
              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">
                  +91
                </span>
                <input
                  required
                  minLength={10}
                  maxLength={10}
                  onChange={handleInputData("contact")}
                  name="contact"
                  value={formData.contact}
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
                required
                onChange={handleInputData("email")}
                value={formData.email}
                name="email"
                type="email"
                className={`form-control ${styles.tcolor}`}
                id="Email"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <textarea
                required
                onChange={handleInputData("description")}
                name="description"
                className={`form-control ${styles.tcolor}`}
                id="Description"
                rows={1}
                value={formData.description}
              ></textarea>
            </div>
            <div className="d-flex">
              <div
                className="d-md-flex justify-content-md-end mb-5"
                style={{ marginLeft: "47%" }}
              >
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#F5F5F5",
                    color: "#171919",
                    border: "1px solid rgba(23, 25, 25, 0.4)",
                    borderRadius: "5px",
                  }}
                  className="btn"
                  role="button"
                >
                  Cancel
                </button>
              </div>
              <div
                className="d-md-flex justify-content-md-end mb-5"
                style={{ marginLeft: "7%" }}
              >
                <button
                  type="submit"
                  style={{
                    background: "#C16BB2",
                    borderRadius: "5px",
                    color: "white",
                  }}
                  className="btn"
                  role="button"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
