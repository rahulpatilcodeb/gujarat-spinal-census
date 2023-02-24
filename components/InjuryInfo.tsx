import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReactLoading from "react-loading";
import Select from "react-select";

const InjuryInfo = ({
  nextStep,
  prevStep,
  values,
  setFormData,
}: any) => {

  const date = new Date().getFullYear()
  const schema = Yup.object().shape({
    injuryYear: Yup.number().required("Please enter year").max(date, "Invalid data"),
    injuryReason: Yup.string().required("Please enter reason"),
    injuryType: Yup.string().required("Please select type"),
    injuryLevel: Yup.string().required("Please select level"),
    implantFixation: Yup.string().required("please choose one value"),
    injuryStatus: Yup.string().required("please select your injury status"),
    physicalStatus: Yup.string().required("Please select"),
    financialStatus: Yup.string().required("Please select"),
  });

  const [initValue, setInitValue] = useState(values);
  const [loading, setLoading] = useState(false);

  const fileupload = async (file: any) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/image`,
        { name: file.name, type: file.type, email: values.email }
      );
      const url = data.url;
      const resp1 = await axios.put(url, file);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(()=> {
    window.scrollTo(0, 0)
  },[])

  function handlePrev() {
    setFormData(formik.values)
    prevStep()
  }


  const formik = useFormik(
    {
      initialValues: initValue,
      enableReinitialize: true,
      validationSchema: schema,
      onSubmit: async (values) => {
        try {
          fileupload(values.file);
          setLoading(true)
          setFormData(formik.values)
          // fileupload(Ifile);
          values.avatar = values.file.name;
          await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/users`, values)
            .catch((err) => { console.error(err) });
          nextStep()
        } catch (err) {
          console.log("error", err)
        } finally {
          setLoading(false);
        }
      },
    });

  const options = [
    { value: "high", label: "high" },
    { value: "low", label: "low" },
    { value: "medium", label: "medium" },
  ];

  return (
    <>
      {loading ? (
        <center>
          <div style={{ margin: "100px" }}>
            <ReactLoading type={"spin"} color={"#6BC17A"} />
          </div>
        </center>
      ) : (
        <div>
          <div
            className="mb-5 d-flex justify-content-center"
            style={{ fontSize: "22px" }}
          >
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
                  1
                </span>
                <span>Personal Details -</span>
              </div>
            </div>
            <div style={{ marginLeft: "50px " }}>
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
                  2
                </span>
                <span>Injury Details -</span>
              </div>
            </div>
          </div>
          <form
            noValidate
            name="form"
            onSubmit={formik.handleSubmit}
            className="pb-5"
          >
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
                  value={formik.values.injuryYear}
                  name="injuryYear"
                  placeholder="2023"
                  id="InjuryYear"
                  className={`form-control ${styles.tcolor}`}
                />
                {formik.touched.injuryYear && formik.errors.injuryYear && (
                  <p style={{ color: "red" }} className="error">
                    {formik.errors.injuryYear.toString()}
                  </p>
                )}
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
                {formik.touched.injuryReason && formik.errors.injuryReason && (
                  <p style={{ color: "red" }} className="error">
                    {formik.errors.injuryReason.toString()}
                  </p>
                )}
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
                  <label
                    className="custom-control-label pe-5"
                    htmlFor="ItypeP"
                    style={{ width: "100%" }}
                  >
                    Paraplagia
                  </label>
                  <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.injuryType == "Paraplagia"}
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
                  <label
                    className="custom-control-label pe-5"
                    htmlFor="ItypeQ"
                    style={{ width: "100%" }}
                  >
                    Quadriplegia
                  </label>
                  <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.injuryType == "Quadriplegia"}
                    type="radio"
                    name="injuryType"
                    className="custom-control-input"
                    value="Quadriplegia"
                    id="ItypeQ"
                  />
                </div>
                {formik.touched.injuryType && formik.errors.injuryType && (
                  <p style={{ color: "red" }} className="error">
                    {formik.errors.injuryType.toString()}
                  </p>
                )}
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
                {/* <select
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
                  <option
                    value="high"
                    selected={formik.values.injuryLevel == "high"}
                  >
                    high
                  </option>
                  <option
                    value="medium"
                    selected={formik.values.injuryLevel == "medium"}
                  >
                    medium
                  </option>
                  <option
                    value="low"
                    selected={formik.values.injuryLevel == "low"}
                  >
                    low
                  </option>
                </select> */}
                <Select
                  defaultValue={options.find(
                    (e) => formik.values.injuryLevel == e.value
                  )}
                  onChange={(e: any) => formik.setFieldValue("injuryLevel", e.value)}
                  options={options}
                  name="injuryLevel"
                  id="Ilevel"
                  onBlur={formik.handleBlur}
                // value={values.district}
                />
                {formik.touched.injuryLevel && formik.errors.injuryLevel && (
                  <p style={{ color: "red" }} className="error">
                    {formik.errors.injuryLevel.toString()}
                  </p>
                )}
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
                    style={{ width: "100%" }}
                  >
                    Operated
                  </label>
                  <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.implantFixation == "Operated"}
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
                    style={{ width: "100%" }}
                  >
                    Not Operated
                  </label>
                  <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.implantFixation == "Not Operated"}
                    type="radio"
                    name="implantFixation"
                    className="custom-control-input"
                    value="Not Operated"
                    id="Implant-Fix-No"
                  />
                </div>
                {formik.touched.implantFixation &&
                  formik.errors.implantFixation && (
                    <p style={{ color: "red" }} className="error">
                      {formik.errors.implantFixation.toString()}
                    </p>
                  )}
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
                  <label
                    className="custom-control-label pe-5"
                    htmlFor="Istatus"
                    style={{ width: "100%" }}
                  >
                    Completed
                  </label>
                  <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.injuryStatus == "Complete"}
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
                    htmlFor="Istatusno"
                    style={{ width: "100%" }}
                  >
                    Incomplete
                  </label>
                  <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="radio"
                    checked={formik.values.injuryStatus == "Incomplete"}
                    name="injuryStatus"
                    className="custom-control-input"
                    value="Incomplete"
                    id="Istatusno"
                  />
                </div>
                {formik.touched.injuryStatus && formik.errors.injuryStatus && (
                  <p style={{ color: "red" }} className="error">
                    {formik.errors.injuryStatus.toString()}
                  </p>
                )}
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
                    style={{ width: "100%" }}
                  >
                    Dependent
                  </label>
                  <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.physicalStatus == "Dependent"}
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
                    style={{ width: "100%" }}
                  >
                    Independent
                  </label>
                  <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.physicalStatus == "Independent"}
                    type="radio"
                    name="physicalStatus"
                    className="custom-control-input"
                    value="Independent"
                    id="PhysicalStatusno"
                  />
                </div>
                {formik.touched.physicalStatus &&
                  formik.errors.physicalStatus && (
                    <p style={{ color: "red" }} className="error">
                      {formik.errors.physicalStatus.toString()}
                    </p>
                  )}
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
                    style={{ width: "100%" }}
                  >
                    Dependent
                  </label>
                  <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.financialStatus == "Dependent"}
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
                    style={{ width: "100%" }}
                  >
                    Independent
                  </label>
                  <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.financialStatus == "Independent"}
                    type="radio"
                    name="financialStatus"
                    className="custom-control-input"
                    value="Independent"
                    id="FinancialInd"
                  />
                </div>
                {formik.touched.financialStatus &&
                  formik.errors.financialStatus && (
                    <p style={{ color: "red" }} className="error">
                      {formik.errors.financialStatus.toString()}
                    </p>
                  )}
              </div>

              {formik.values.financialStatus == "Independent" ? (
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
                      htmlFor="independentJob"
                      style={{ width: "100%" }}
                    >
                      Job
                    </label>
                    <input
                      required
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      checked={formik.values.independent == "Job"}
                      type="radio"
                      name="independent"
                      className="custom-control-input"
                      value="Job"
                      id="independentJob"
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
                      htmlFor="independentBus"
                      style={{ width: "100%" }}
                    >
                      Business
                    </label>
                    <input
                      required
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      checked={formik.values.independent == "Business"}
                      type="radio"
                      name="independent"
                      className="custom-control-input"
                      value="Business"
                      id="independentBus"
                    />
                  </div>
                  {formik.touched.independent && formik.errors.independent && (
                    <p style={{ color: "red" }} className="error">
                      {formik.errors.independent.toString()}
                    </p>
                  )}
                </div>
              ) : (
                <></>
              )}
              <div className="div d-flex justify-content-between">
                <button
                  onClick={handlePrev}
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
      )}
    </>
  );
};

export default InjuryInfo;
