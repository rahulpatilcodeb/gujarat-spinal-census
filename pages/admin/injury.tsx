import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const Injury = ({ prevStep, value, page }: any) => {
  const router = useRouter();

  const onclick = (e: any) => {
    e.preventDefault()
    const pages = page;
    router.push({
      pathname: "/admin/patients",
      query: { pages },
    });
    // router.push(`/admin/patients?page=${page}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div>
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
        <div>
          <div>
            {value && value.length > 0 ? (
              value.map((user: any) => {
                return (
                  <form name="form" key={user._id}>
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
                        <input
                          type="text"
                          name="injuryYear"
                          id="InjuryYear"
                          defaultValue={user.injuryYear}
                          readOnly
                          className={`form-control ${styles.tcolor}`}
                        />
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
                          name="injuryReason"
                          defaultValue={user.injuryReason}
                          className={`form-control ${styles.tcolor}`}
                          id="Ireason"
                          rows={1}
                          readOnly
                        ></textarea>
                      </div>
                      <label
                        htmlFor="Itype"
                        className="form-label"
                        style={{
                          fontWeight: 400,
                          fontSize: "18px",
                        }}
                      >
                        Injury Status
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
                            className="custom-control-label"
                            htmlFor="ItypeP"
                          >
                            Paraplegia
                          </label>
                          {`${user.injuryType}` &&
                            `${user.injuryType}` === "Paraplegia" ? (
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
                            htmlFor="ItypeQ"
                          >
                            Quadriplegia
                          </label>
                          {`${user.injuryType}` &&
                            `${user.injuryType}` === "Quadriplegia" ? (
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

                      {/* <div className="mb-4" aria-readonly>
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
                        <input
                          name="injuryLevel"
                          id="Ilevel"
                          defaultValue={user.injuryLevel}
                          className={`form-select ${styles.tcolor}`}
                          readOnly
                        />

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
                            className="custom-control-label"
                            htmlFor="ImplantFix"
                          >
                            Operated
                          </label>
                          {`${user.implantFixation}` &&
                            `${user.implantFixation}` === "Operated" ? (
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
                            htmlFor="Implant-Fix-No"
                          >
                            Not Operated
                          </label>
                          {`${user.implantFixation}` &&
                            `${user.implantFixation}` === "Not Operated" ? (
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
                            className="custom-control-label"
                            htmlFor="Istatus"
                          >
                            Complete
                          </label>
                          {`${user.injuryStatus}` &&
                            `${user.injuryStatus}` === "Complete" ? (
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
                            htmlFor="Istatus-no"
                          >
                            Incomplete
                          </label>
                          {`${user.injuryStatus}` &&
                            `${user.injuryStatus}` === "Incomplete" ? (
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
                      </div> */}
                      <label
                        htmlFor="exampleFormControlTextarea1"
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
                            className="custom-control-label"
                            htmlFor="PhysicalStatus"
                          >
                            Dependent
                          </label>
                          {`${user.physicalStatus}` &&
                            `${user.physicalStatus}` === "Dependent" ? (
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
                            htmlFor="PhysicalStatusno"
                          >
                            Independent
                          </label>
                          {`${user.physicalStatus}` &&
                            `${user.physicalStatus}` === "Independent" ? (
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
                            className="custom-control-label"
                            htmlFor="Financialdep"
                          >
                            Dependent
                          </label>
                          {`${user.financialStatus}` &&
                            `${user.financialStatus}` === "Dependent" ? (
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
                            htmlFor="FinancialInd"
                          >
                            Independent
                          </label>
                          {`${user.financialStatus}` &&
                            `${user.financialStatus}` === "Independent" ? (
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
                            className="custom-control-label"
                            htmlFor="FinancialJob"
                          >
                            Job
                          </label>
                          {`${user.independent}` &&
                            `${user.independent}` === "Job" ? (
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
                            htmlFor="FinancialBus"
                          >
                            Business
                          </label>
                          {`${user.independent}` &&
                            `${user.independent}` === "Business" ? (
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
                          onClick={onclick}
                          style={{
                            backgroundColor: "rgba(193, 107, 178, 1)",
                            color: "white",
                          }}
                          className="btn"
                          role="button"
                        >
                          Home
                        </button>
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
      </div>
    </>
  );
};

export default Injury;
