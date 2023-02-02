import React,{useState} from "react";

const contact = () => {

  const [data, formData]= useState({});

  



  async function Contactapi(url:any) {
    const response = await fetch(url,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body: JSON.stringify(data)
    })
    const contact = response.json()
    console.log(contact)
  }

  function handleChange(e:any){
    return ({
      ...data,[e.target.name]:[e.target.value]
    })

  }



    function handleFormData(e :any){
        e.preventDefault()

    }

  return (
    <form onSubmit={handleFormData} className="container mb-5">
      <div className="m-3">
        <label className="mb-1" htmlFor="mobileno">Mobile Number</label>
        <input onChange={handleChange}
          className="form-control bg-light"
          name="mobile"
          type="text"
          id="mobileno"
          placeholder="+91"
        ></input>
      </div>
      <div className="m-3">
        <label className="mb-1" htmlFor="email">Email Address</label>
        <input onChange={handleChange}
          className="form-control bg-light"
          name="email"
          type="text"
          id="email"
          placeholder="Email Address"
        ></input>
      </div>
      <div className="m-3">
        <label className="mb-1" htmlFor="description">Description</label>
        <input onChange={handleChange}
          className="form-control bg-light"
          name="description"
          type="text"
          id="description"
          placeholder="Description"
        ></input>
      </div>
      <div className="d-flex justify-content-end mt-3 me-3">
        <button type="reset" className="btn btn-outline-secondary me-3">
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
};

export default contact;
