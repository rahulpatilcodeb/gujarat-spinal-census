import React from "react";
import styles from  "@/styles/Home.module.css";

const InjuryInfo = ({ nextStep, handleFormData, prevStep, values, onsubmit }:any) => {

  const submitFormData = async (e:any) => {
    e.preventDefault();
    console.log("FormData")
    await onsubmit(e);
    console.log("after")
    nextStep();
  };

  return (
    <>
      <div className="mb-5 d-flex justify-content-center">
        <div>
          <div className="col">
            <span
              style={{
                border: "px solid rgb(231, 231, 231)",
                backgroundColor: "rgb(228, 233, 229)",
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
                border: "2px solid rgb(0, 238, 40)",
                backgroundColor: "rgb(78, 244, 105)",
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
        name="form"
        onSubmit={submitFormData}
        className="pb-3"
      >
        <div className="container mb-4">
          <div className="mb-4">
            <label htmlFor="InjuryYear" className="form-label">
              Injury Year
            </label>
            <input required
            maxLength={4}
            minLength={4}
            onChange={handleFormData("injuryYear")}
            type="text"
            name="injuryYear"
              id="InjuryYear"
              className={`form-control ${styles.tcolor}`}
            />
             
          </div>
          <div className="mb-4">
            <label htmlFor="Ireason" className="form-label">
              Injury Reason
            </label>
            <textarea required
              onChange={handleFormData("injuryReason")}
              name="injuryReason"
              value={values.injuryReason}
              className={`form-control ${styles.tcolor}`}
              id="Ireason"
              rows={1}
            ></textarea>
          </div>
          <label htmlFor="Itype" className="form-label">
            Injury Type
          </label>
          <div className="row mb-4 ">
            <div className="col d-flex justify-content-between">
              <label
                className="custom-control-label"
                htmlFor="ItypeP"
              >
                Paraplagia
              </label>
              <input required
                onChange={handleFormData("injuryType")}
                type="radio"
                name="injuryType"
                className="custom-control-input"
                value="Paraplagia"
                id="ItypeP"
              />
            </div>
            <div className="col d-flex justify-content-between">
              <label
                className="custom-control-label"
                htmlFor="ItypeQ"
              >
                Quadriplegia
              </label>
              <input required
                onChange={handleFormData("injuryType")}
                type="radio"
                name="injuryType"
                className="custom-control-input"
                value="Quadriplegia"
                id="ItypeQ"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="Ilevel" className="form-label">
              Injury Level
            </label>
            <select required
              onChange={handleFormData("injuryLevel")}
              name="injuryLevel"
              id="Ilevel"
              className={`form-select ${styles.tcolor}`}
            >
              <option defaultChecked value=''>Selected</option>
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
          </div>
          <label htmlFor="ImplantFix" className="form-label">
            Implant Fixation
          </label>
          <div className="row mb-4">
            <div className="col d-flex justify-content-between">
              <label className="custom-control-label" htmlFor="ImplantFix">
                Operated
              </label>
              <input required
                onChange={handleFormData("implantFixation")}
                type="radio"
                name="implantFixation"
                className="custom-control-input"
                value="Operated"
                id="ImplantFix"
              />
            </div>
            <div className="col d-flex justify-content-between">
              <label className="custom-control-label" htmlFor="Implant-Fix-No">
                Not Operated
              </label>
              <input required
                onChange={handleFormData("implantFixation")}
                type="radio"
                name="implantFixation"
                className="custom-control-input"
                value="Not Operated"
                id="Implant-Fix-No"
              />
            </div>
          </div>
          <label className="form-label">Injury Status:</label>
          <div className="row mb-4">
            <div className="col d-flex justify-content-between">
              <label className="custom-control-label" htmlFor="Istatus">
                Compled
              </label>
              <input required
                onChange={handleFormData("injuryStatus")}
                type="radio"
                name="injuryStatus"
                className="custom-control-input"
                value="Compled"
                id="Istatus"
              />
            </div>
            <div className="col d-flex justify-content-between">
              <label className="custom-control-label" htmlFor="Istatus-no">
                Incomplete
              </label>
              <input required
                onChange={handleFormData("injuryStatus")}
                type="radio"
                name="injuryStatus"
                className="custom-control-input"
                value="Incomplete"
                id="Istatus-no"
              />
            </div>
          </div>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Physical Status
          </label>
          <div className="row mb-4">
            <div className="col d-flex justify-content-between">
              <label className="custom-control-label" htmlFor="PhysicalStatus">
                Dependent
              </label>
              <input required
                onChange={handleFormData("physicalStatus")}
                type="radio"
                name="physicalStatus"
                className="custom-control-input"
                value="Dependent"
                id="PhysicalStatus"
              />
            </div>
            <div className="col d-flex justify-content-between">
              <label
                className="custom-control-label"
                htmlFor="PhysicalStatusno"
              >
                Not Dependent
              </label>
              <input required
                onChange={handleFormData("physicalStatus")}
                type="radio"
                name="physicalStatus"
                className="custom-control-input"
                value="Not Dependent"
                id="PhysicalStatusno"
              />
            </div>
          </div>
          <label className="form-label">Financial Status</label>
          <div className="row mb-4">
            <div className="col d-flex justify-content-between">
              <label className="custom-control-label" htmlFor="Financialdep">
                Dependent
              </label>
              <input required
                onChange={handleFormData("financialStatus")}
                type="radio"
                name="financialStatus"
                className="custom-control-input"
                value="Dependent"
                id="Financialdep"
              />
            </div>
            <div className="col d-flex justify-content-between">
              <label className="custom-control-label" htmlFor="FinancialInd">
                Independent
              </label>
              <input required
                onChange={handleFormData("financialStatus")}
                type="radio"
                name="financialStatus"
                className="custom-control-input"
                value="Independent"
                id="FinancialInd"
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col d-flex justify-content-between">
              <label className="custom-control-label" htmlFor="FinancialJob">
                Job
              </label>
              <input required
                onChange={handleFormData("financialStatus")}
                type="radio"
                name="financialStatus"
                className="custom-control-input"
                value="Job"
                id="FinancialJob"
              />
            </div>
            <div className="col d-flex justify-content-between ">
              <label className="custom-control-label" htmlFor="FinancialBus">
                Business
              </label>
              <input required
                onChange={handleFormData("financialStatus")}
                type="radio"
                name="financialStatus"
                className="custom-control-input"
                value="Business"
                id="FinancialBus"
              />
            </div>
          </div>
          <div className="div d-flex justify-content-between">
            <button
              onClick={prevStep}
              style={{
                backgroundColor: "rgba(193, 107, 178, 1)",
                color: "white",
              }}
              className="btn"
              role="button"
            >
              Previous
            </button>
            <button
            type="submit"

              style={{
                backgroundColor: "rgba(193, 107, 178, 1)",
                color: "white",
              }}
              // to="/registered"
              className="btn"
              role="button"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default InjuryInfo;
