import InjuryInfo from "@/components/InjuryInfo";
import Register from "@/components/Register";
import UserRegister from "@/components/userInfo";
import styles from '@/styles/personal.module.css';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";


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
        <div className={`${styles['personal-detail-box']}`}>
          <Container style={{ justifyContent: "center" }}>
            <Row>
              <Col>
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
          <Container >
            <Row>
              <Col className="">
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
        <div >
          <Container >
            <Row>
              <Col md={{ span: 6, offset: 3 }} >
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
