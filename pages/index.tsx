import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Home from "@/components/Home";
import Login from "@/components/Login";
import Register from "@/components/Register";
import axios from "axios";

function Common() {
  const [step, setstep] = useState(1);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    dob: "",
    gender: "",
    address: "",
    district: "",
    contact: "",
    email: "",
    qualification: "",
    bpl: "",
    description: "",
    injuryYear: "",
    injuryReason: "",
    injuryType: "",
    injuryLevel: "",
    implantFixation: "",
    injuryStatus: "",
    physicalStatus: "",
    financialStatus: "",
  });
  console.log("hzsudhui", formData);
  const onsubmit = () => {
    axios
      .post("https://gujarat-spinal-census.vercel.app/api/users", formData)
      .then(() => console.log("User Added"))
      .catch((err) => {
        console.error(err);
      });
    console.log("data added");
  };
  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };
  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };
  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input:any) => (e:any) => {
    // input value from the form
    const { value } = e.target;
    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };
  // javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div>
          <Container>
            <Row>
              <Col className="custom-margin">
                <Home
                  nextStep={nextStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div>
          <Container>
            <Row>
              <Col className="custom-margin">
                <Login
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                  onsubmit={onsubmit}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // Only formData is passed as prop to show the final value at form submit
    case 3:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <Register />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // default case to show nothing
    default:
      return <div></div>;
  }
}
export default Common;
