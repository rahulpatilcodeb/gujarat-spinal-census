import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Personal from "./personal";
import Injury from "./injury";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ReactLoading from "react-loading";

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
    if (!Ilogin) {
      router.push("/admin/login")
    } else {
      setLoading(true)
      try {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/user`, example.id)
          .then((response:any) => {
            setUserData(response.data.data);
          })
          .catch((err:any) => console.log(err));
      } catch (err) {
        console.log(`error`, err);
      } finally {
        setLoading(false)
      }
    }
  }, [Ilogin]);

  switch (step) {
    case 1:
      return (
        <div>
          <Container className="w-50">
            {loading ? (
              <center>
                <div style={{ margin: "100px" }}>
                  <ReactLoading type={"spin"} color={"#6BC17A"} />
                </div>
              </center>
            ): ( <Row>
              <Col className="custom-margin">
                <Personal nextStep={nextStep} value={userData} />
              </Col>
            </Row>)}
           
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
                  prevStep={prevStep}
                  value={userData}
                  page={currentPage}
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
