import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Contact = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    contact: "",
    email: "",
    description: "",
  });

  // const [data, formData]= useState({});
  console.log("formData", formData);

  async function onSubmit(e: any) {
    e.preventDefault();
    // console.log(formData);
    await axios
      .post(process.env.NEXT_PUBLIC_API_URL_Contact as string, formData)
      .then(() => alert("data addad"))
      .catch((err: any) => {
        console.error(err);
      });
    router.push("/");
    // console.log("data added");
  }

  const handleInputData = (e: any) => {
    e.preventDefault();
    //updating for data state taking previous state and then adding new value to create new object
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="container mb-5">
      <div className="col d-flex justify-content-center">
        <span ><b>--Contact Us --</b></span>
      </div>

      <div className="m-3">
        <label className="mb-1" htmlFor="contact">
          Mobile Number
        </label>
        <input
          required
          onChange={handleInputData}
          className="form-control bg-light"
          name="contact"
          type="text"
          id="contact"
          placeholder="+91"
          value={formData.contact}
        ></input>
      </div>
      <div className="m-3">
        <label className="mb-1" htmlFor="email">
          Email Address
        </label>
        <input
          required
          onChange={handleInputData}
          className="form-control bg-light"
          name="email"
          type="text"
          id="email"
          value={formData.email}
          placeholder="Email Address"
        ></input>
      </div>
      <div className="m-3">
        <label className="mb-1" htmlFor="description">
          Description
        </label>
        <input
          onChange={handleInputData}
          required
          // onChange={handleInputData("description")}
          className="form-control bg-light"
          name="description"
          type="text"
          id="description"
          value={formData.description}
          placeholder="Description"
        ></input>
      </div>
      <div className="d-flex justify-content-end mt-3 me-3">
        <button type="reset" className="btn btn-outline-secondary me-3">
          Cancel
        </button>
        <button
          type="submit"
          onClick={onSubmit}
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
};

export default Contact;
