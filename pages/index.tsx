import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Register from "@/components/Register";
import axios from "axios";
import InjuryInfo from "@/components/InjuryInfo";
import UserRegister from "@/components/UserRegister";

function Common() {
  const [step, setstep] = useState(1);
  const [file, setFile] = useState();
  const [img, setImg] = useState(null);
  const [formData, setFormData] = useState({
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
  });
  console.log("hzsudhui", formData);

  const onsubmit = async () => {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/users`, formData)
      .then(() => console.log("User Added"))
      .catch((err) => {
        console.error(err);
      });
  };
  // const[data,setData] =useState("")
  const fileupload = async (file: any) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/image`,
        { name: file.name, type: file.type }
      );
      console.log(data);

      const url = data.url;
      setImg(file.name);
      const resp1 = await axios.put(url, file);
      console.log("resp1", resp1);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (file) {
      fileupload(file);
    }
  }, [file]);

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };
  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };
  const selectedFile = (e: any) => {
    setFile(e.target.files[0]);

    console.log(e.target.files[0]);
    console.log(file);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input: any) => (e: any) => {
  

    const { value } = e.target;
    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      avatar: img,
      [input]: value,
    }));
  };
  // javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div>
          <Container className="w-75">
            <Row>
              <Col className="custom-margin">
                <UserRegister
                  nextStep={nextStep}
                  img={img}
                  setImg={setImg}
                  handleFormData={handleInputData}
                  selectedFile={selectedFile}
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
          <Container className="w-75">
            <Row>
              <Col className="custom-margin">
                <InjuryInfo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                  onsubmit={onsubmit}
                  selectedFile={selectedFile}
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
          <Container className="w-75">
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
