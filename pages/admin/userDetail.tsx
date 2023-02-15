import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Personal from "./personal";
import Injury from "./injury";
import { useRouter } from "next/router";

function UserDetail() {
  const router = useRouter();
  const { query: id } = router;
  const example = { id };
  const [step, setstep] = useState(1);
  const [userData, setUserData] = useState([]);

  const nextStep = () => {
    setstep(step + 1);
  };
  const prevStep = () => {
    setstep(step - 1);
  };

  useEffect(() => {
    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/user`, example.id)
        .then((response) => {
          setUserData(response.data.data);
          // console.log("userdata info", response);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(`error`, err);
    }
    // axios
    //   .post(process.env.NEXT_PUBLIC_API_URL_User as string, example.id)
    //   .then((response) => {
    //     setUserData(response.data.data);
    //     console.log("userdata info", response.data.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  switch (step) {
    case 1:
      return (
        <div>
          <Container className="w-50">
            <Row>
              <Col className="custom-margin">
                <Personal nextStep={nextStep} value={userData} />
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
              <Col className="custom-margin pb-5">
                <Injury
                  nextStep={nextStep}
                  prevStep={prevStep}
                  value={userData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    default:
      return <div></div>;
  }
}
export default UserDetail;
