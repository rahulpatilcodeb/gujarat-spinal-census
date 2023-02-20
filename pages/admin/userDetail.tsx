import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Personal from "./personal";
import Injury from "./injury";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Roots } from "aws-sdk/clients/organizations";
import { RootState } from "@/store/store";

function UserDetail() {

  const { user: user, islogin: Ilogin, token: token } = useSelector((state: RootState) => state.users)
  const [loading, setLoading] = useState(false)

  const router = useRouter();
  let { query: id, query: page } = router;
  const example = { id };
  const currentPage = parseInt(`${page.page}`);
  const [step, setstep] = useState(1);
  const [userData, setUserData] = useState([]);

  const nextStep = () => {
    setstep(step + 1);
  };
  const prevStep = () => {
    setstep(step - 1);
  };



  useEffect(() => {
    setLoading(true)
    if (!Ilogin) {
      router.push("/admin/login")
    }
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
  }, [Ilogin]);

  switch (step) {
    case 1:
      return loading ? (
        <div>
          <Container className="w-50">
            <Row>
              <Col className="custom-margin">
                <Personal nextStep={nextStep} value={userData} />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <center>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </center>
      );
    case 2:
      return loading ? (
        <div>
          <Container className="w-50">
            <Row>
              <Col className="custom-margin pb-5">
                <Injury
                  nextStep={nextStep}
                  prevStep={prevStep}
                  value={userData}
                  page={currentPage}
                />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <center>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </center>
      );
    default:
      return <div></div>;
  }
}
export default UserDetail;
