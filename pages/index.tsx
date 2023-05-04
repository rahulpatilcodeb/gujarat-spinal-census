import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Register from "@/components/Register";
import axios from "axios";
import InjuryInfo from "@/components/InjuryInfo";
import UserRegister from "@/components/userInfo";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


function Common() {

  const [step, setstep] = useState(1);
  const [formData, setFormData] = useState<any>({
    file: null,
    avatar: null,
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
    injuryStatus: "",
    // injuryLevel: "",
    // implantFixation: "",
    // injuryStatus: "",
    physicalStatus: "",
    financialStatus: "",
    independent: "",
  });

 
  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };



  const handleInputData = (input: any) => (e: any) => {
    const { value } = e.target;
    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState: any) => ({
      ...prevState,
      avatar: formData.file?.name,
      [input]: value,
    }));
  };

  switch (step) {
    case 1:
      return (
        <div>
          <Container className="w-50">
            <Row>
              <Col className="custom-margin">
                <UserRegister
                  nextStep={nextStep}
                  setFormData={setFormData}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 2:
      return (
        <div>
          <Container className="w-50">
            <Row>
              <Col className="custom-margin">
                <InjuryInfo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                  onsubmit={onsubmit}
                  setFormData={setFormData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 3:
      return (
        <div className="App">
          <Container className="w-75">
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <Register />
              </Col>
            </Row>
          </Container>
        </div>
      );
    default:
      return <div></div>;
  }
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}
export default Common;
