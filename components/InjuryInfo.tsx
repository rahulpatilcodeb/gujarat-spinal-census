import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  injuryYear: Yup.number().required("Please enter your first name!"),
  injuryReason: Yup.string().required("Please enter your family name!"),
  injuryType: Yup.string().required("Please enter your family name!"),
  injuryLevel: Yup.string().required("Please enter your family name!"),
  implantFixation: Yup.string().required("please select district"),
  injuryStatus: Yup.string().required("please select district"),

  physicalStatus: Yup.string().required("Please enter your family name!"),

  financialStatus: Yup.string().required("Please enter your family name!"),
});

const InjuryInfo = ({
  nextStep,
  handleFormData,
  prevStep,
  values,
  onsubmit,
}: any) => {
  const submitFormData = async (e: any) => {
    e.preventDefault();
    // console.log("FormData");
    // await onsubmit(e);
    // console.log("after");
    // nextStep();
    formik.handleSubmit();
    values.injuryYear = formik.values.injuryYear;
    values.injuryReason = formik.values.injuryReason;
    values.injuryType = formik.values.injuryType;
    values.injuryLevel = formik.values.injuryLevel;
    values.implantFixation = formik.values.implantFixation;
    values.injuryStatus = formik.values.injuryStatus;
    values.physicalStatus = formik.values.physicalStatus;
    values.financialStatus = formik.values.financialStatus;

    if (
      formik.values.injuryYear != "" &&
      formik.errors.injuryYear == undefined &&
      formik.values.injuryReason != "" &&
      formik.errors.injuryReason == undefined &&
      formik.values.injuryLevel != "" &&
      formik.errors.injuryLevel == undefined &&
      formik.values.injuryStatus != "" &&
      formik.errors.injuryStatus == undefined &&
      formik.values.injuryType != "" &&
      formik.errors.injuryType == undefined &&
      formik.values.implantFixation != "" &&
      formik.errors.implantFixation == undefined &&
      formik.values.physicalStatus != "" &&
      formik.errors.physicalStatus == undefined &&
      formik.values.financialStatus != "" &&
      formik.errors.financialStatus == undefined
    ) {
      await onsubmit(e);
      nextStep();
    }
  };

  const formik = useFormik({
    initialValues: {
      injuryYear: "",
      injuryReason: "",
      injuryType: "",
      injuryLevel: "",
      implantFixation: "",
      injuryStatus: "",
      physicalStatus: "",
      financialStatus: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (values.fname != "") {
      values.injuryYear = formik.values.injuryYear;
      values.injuryReason = formik.values.injuryReason;
      values.injuryType = formik.values.injuryType;
      values.injuryLevel = formik.values.injuryLevel;
      values.implantFixation = formik.values.implantFixation;
      values.injuryStatus = formik.values.injuryStatus;
      values.physicalStatus = formik.values.physicalStatus;
      values.financialStatus = formik.values.financialStatus;
    }
    if (values.injuryYear != "") {
      formik.values.injuryYear = values.injuryYear;

      formik.values.injuryReason = values.injuryReason;

      formik.values.injuryLevel = values.injuryLevel;

      formik.values.injuryStatus = values.injuryStatus;

      formik.values.injuryType = values.injuryType;

      formik.values.implantFixation = values.implantFixation;

      formik.values.physicalStatus = values.physicalStatus;

      formik.values.financialStatus = values.financialStatus;
    }
    // },[]);
  }, [
    formik.values.injuryYear,
    formik.values.injuryReason,
    formik.values.injuryType,
    formik.values.injuryLevel,
    formik.values.implantFixation,
    formik.values.injuryStatus,
    formik.values.physicalStatus,
    formik.values.financialStatus,
  ]);

  return (
    <>
      <div style={{ fontFamily: "Inter" }}>
        <div
          className="mb-5 d-flex justify-content-center"
          style={{ fontSize: "22px" }}
        >
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
        <form noValidate name="form" onSubmit={submitFormData} className="pb-5">
          <div className="container mb-4">
            <div className="mb-4">
              <label
                htmlFor="InjuryYear"
                className="form-label"
                style={{
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                Injury Year
              </label>
              <label className="text-danger"> *</label>
              <input
                required
                maxLength={4}
                minLength={4}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={
                  formik.values.injuryYear == ""
                    ? values.injuryYear
                    : formik.values.injuryYear
                }
                name="injuryYear"
                placeholder="2023"
                id="InjuryYear"
                className={`form-control ${styles.tcolor}`}
              />
              <p style={{ color: "red" }} className="error">
                {formik.errors.injuryYear &&
                  formik.touched.injuryYear &&
                  formik.errors.injuryYear}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="Ireason"
                className="form-label"
                style={{
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                Injury Reason
              </label>
              <textarea
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="injuryReason"
              value={formik.values.injuryReason}
              className={`form-control ${styles.tcolor}`}
              id="Ireason"
              placeholder="Road Accident"
              rows={1}
            ></textarea>
            <p style={{ color: "red" }} className="error">
              {formik.errors.injuryReason &&
                formik.touched.injuryReason &&
                formik.errors.injuryReason}
            </p>
            </div>
            <label
              htmlFor="Itype"
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              Injury Type
            </label>
            <div className="row mb-4 ">
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
                <label className="custom-control-label pe-5" htmlFor="ItypeP">
                  Paraplagia
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="injuryType"
                className="custom-control-input"
                value="Paraplagia"
                id="ItypeP"
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
                <label className="custom-control-label pe-5" htmlFor="ItypeQ">
                  Quadriplegia
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="injuryType"
                className="custom-control-input"
                value="Quadriplegia"
                id="ItypeQ"
              />
              </div>
              <p style={{ color: "red" }} className="error">
              {formik.errors.injuryType &&
                formik.touched.injuryType &&
                formik.errors.injuryType}
            </p>
              
            </div>
            <div className="mb-4">
              <label
                htmlFor="Ilevel"
                className="form-label"
                style={{
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                Injury Level
              </label>
              <select
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="injuryLevel"
              id="Ilevel"
              className={`form-select ${styles.tcolor}`}
            >
                <option defaultChecked value="">
                  Selected
                </option>
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </select>
              <p style={{ color: "red" }} className="error">
              {formik.errors.injuryLevel &&
                formik.touched.injuryLevel &&
                formik.errors.injuryLevel}
            </p>
            </div>
            <label
              htmlFor="ImplantFix"
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              Implant Fixation
            </label>
            <label className="text-danger"> *</label>
            <div className="row mb-4">
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
                  className="custom-control-label pe-5"
                  htmlFor="ImplantFix"
                >
                  Operated
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="implantFixation"
                className="custom-control-input"
                value="Operated"
                id="ImplantFix"
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
                  className="custom-control-label pe-5"
                  htmlFor="Implant-Fix-No"
                >
                  Not Operated
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="implantFixation"
                className="custom-control-input"
                value="Not Operated"
                id="Implant-Fix-No"
              />
              </div>
              <p style={{ color: "red" }} className="error">
              {formik.errors.implantFixation &&
                formik.touched.implantFixation &&
                formik.errors.implantFixation}
            </p>
            </div>
            <label
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              Injury Status
            </label>
            <div className="row mb-4">
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
                <label className="custom-control-label pe-5" htmlFor="Istatus">
                  Completed
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="injuryStatus"
                className="custom-control-input"
                value="Complete"
                id="Istatus"
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
                  className="custom-control-label pe-5"
                  htmlFor="Istatus-no"
                >
                  Incomplete
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="injuryStatus"
                className="custom-control-input"
                value="Incomplete"
                id="Istatusno"
              />
              </div>
              <p style={{ color: "red" }} className="error">
              {formik.errors.injuryStatus &&
                formik.touched.injuryStatus &&
                formik.errors.injuryStatus}
            </p>
            </div>
            <label
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              Physical Status
            </label>
            <div className="row mb-4">
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
                  className="custom-control-label pe-5"
                  htmlFor="PhysicalStatus"
                >
                  Dependent
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="physicalStatus"
                className="custom-control-input"
                value="Dependent"
                id="PhysicalStatus"
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
                  className="custom-control-label pe-5"
                  htmlFor="PhysicalStatusno"
                >
                  Independent
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="physicalStatus"
                className="custom-control-input"
                value="Independent"
                id="PhysicalStatusno"
              />
              </div>
              <p style={{ color: "red" }} className="error">
              {formik.errors.physicalStatus &&
                formik.touched.physicalStatus &&
                formik.errors.physicalStatus}
            </p>
            </div>
            <label
              className="form-label"
              style={{
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              Financial Status
            </label>
            <div className="row mb-4">
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
                  className="custom-control-label pe-5"
                  htmlFor="Financialdep"
                >
                  Dependent
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="financialStatus"
                className="custom-control-input"
                value="Dependent"
                id="Financialdep"
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
                  className="custom-control-label pe-5"
                  htmlFor="FinancialInd"
                >
                  Independent
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="financialStatus"
                className="custom-control-input"
                value="Independent"
                id="FinancialInd"
              />
              </div>
            </div>
            <div className="row mb-4">
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
                  className="custom-control-label pe-5"
                  htmlFor="FinancialJob"
                >
                  Job
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="financialStatus"
                className="custom-control-input"
                value="Job"
                id="FinancialJob"
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
                  className="custom-control-label pe-5"
                  htmlFor="FinancialBus"
                >
                  Business
                </label>
                <input
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio"
                name="financialStatus"
                className="custom-control-input"
                value="Business"
                id="FinancialBus"
              />
              </div>
              <p style={{ color: "red" }} className="error">
              {formik.errors.financialStatus &&
                formik.touched.financialStatus &&
                formik.errors.financialStatus}
            </p>
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
      </div>
      
    </>
  );
};

export default InjuryInfo;
