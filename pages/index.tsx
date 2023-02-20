import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Register from "@/components/Register";
import axios from "axios";
import InjuryInfo from "@/components/InjuryInfo";
import UserRegister from "@/components/UserRegister";

function Common() {
  const [step, setstep] = useState(1);
  const [file, setFile] = useState<any>({});
  const [formData, setFormData] = useState<any>({
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
    injuryType: "",
    injuryLevel: "",
    implantFixation: "",
    injuryStatus: "",
    physicalStatus: "",
    financialStatus: "",
    independent:"",
  });

  useEffect(() => {
    console.log("in formdata", formData)
  }, [formData])
  console.log("hzsudhui", formData);

  const onsubmit = async () => {
    console.log("in onsubmit index")
    formData.avatar = file.name;
    fileupload(file);
    console.log("formdata in before api call ", formData)
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/users`, formData)
      .then(() => console.log("User Added"))
      .catch((err) => {
        console.error(err);
      });
    console.log("after out submitFormData")
  };
  const fileupload = async (file: any) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/image`,
        { name: file.name, type: file.type, email: formData.email }
      );
      console.log(data);

      const url = data.url;
      const resp1 = await axios.put(url, file);
      console.log("resp1", resp1);
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect(() => {
  //   setFile(file)
  //   if (file) {

  //     console.log("this is in useEffect",file)
  //     // fileupload(file);
  //   }
  // }, [file])

  useEffect(() => {
    console.log("this is in useEffect", file?.name);

    // fileupload(file);
  }, [file]);


  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  const selectedFile = (e: any) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    console.log(file);
  };

  const handleInputData = (input: any) => (e: any) => {
    const { value } = e.target;
    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState: any) => ({
      ...prevState,
      avatar: file?.name,
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
                  Ifile={file}
                  setFile={setFile}
                  nextStep={nextStep}
                  setFormData={setFormData}
                  handleFormData={handleInputData}
                  selectedFile={selectedFile}
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
                  Ifile={file}
                  setFile={setFile}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                  onsubmit={onsubmit}
                  setFormData={setFormData}
                  selectedFile={selectedFile}
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
export default Common;
