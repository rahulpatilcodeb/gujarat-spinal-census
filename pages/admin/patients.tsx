import { RootState } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "semantic-ui-react";
import { debounce } from 'lodash'
import { logout } from "@/store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Patients() {
  const { user: user, islogin: Ilogin, token: token } = useSelector(
    (state: RootState) => state.users
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [APIData, setAPIData] = useState([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  let { query: page } = router;
  const activepage = parseInt(`${page.pages}`);
  const [reqObj, setReqObj] = useState<any>({
    filter: {
      fname: undefined,
      injuryType: undefined,
      district: undefined
    },
    page: activepage || 1,
    limit: 8
  })
  const pageSize = 8;
  const [totalCount, setTotalCount] = useState(0);
  // const url = "https://gsc-project-1.s3.ap-south-1.amazonaws.com/";
  const url = "https://gujrat-spinal-selsus.s3.amazonaws.com/";
  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${token}`
  // }


  const searchItems = async (req: any) => {
    try {
      setLoading(true)
      const filteredData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/filtertype`, {
        body: req
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log(filteredData)
      // console.log("gdyag", filteredData.data);
      setAPIData(filteredData.data.data);
      setTotalCount(filteredData.data.totalCount);
      // router.push(`/admin/patients?page=${activepage}`);

    } catch (err: any) {
      console.log(err.response.data == "jwt expired")
      const expire = () => { dispatch(logout()); }
      const myTimeout = setTimeout(expire, 5000);
      if (err.response.data == "jwt expired") {
        // toast.error("Session Expired!");
        alert("seesion expired")
        // setTimeout(expire, 10000)
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Ilogin) {
      searchItems(reqObj);
    }
    else {
      router.push("/admin/login");
    }
  }, [reqObj, currentPage, Ilogin]);


  const searchChange = debounce((e) => {
    setReqObj({
      ...reqObj,
      filter: { ...reqObj.filter, fname: { $regex: e.target.value, $options: "i" } },
    })
  }, 500)

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1);
    // console.log("first",event)
    setReqObj({
      ...reqObj,
      page: event.selected + 1,
    });
  };

  const Details = (item: any) => {
    const id = `${item._id}`;
    const page = currentPage;
    router.push({
      pathname: "/admin/userDetail",
      query: { id, page },
    });
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <div
          className="d-flex justify-content-between p-2"
          style={{
            background: "#F7FCF8",
            borderRadius: "5px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "60%",
            }}
          >
            <input
              style={{
                width: "100%",
                background: "#FFFFFF",
                border: "1px solid rgba(181, 181, 195, 0.4)",
                borderRadius: "10px",
              }}
              placeholder="Search..."
              onChange={searchChange}
            />
          </div>
          <div
            style={{
              width: "15%",
            }}
          >
            <select
              onChange={(e) =>
                setReqObj({
                  ...reqObj,
                  filter: { ...reqObj.filter, injuryType: e.target.value },
                })
              }
              style={{
                width: "100%",
                height: "100%",
                background: "#FFFFFF",
                border: "1px solid rgba(181, 181, 195, 0.4)",
                borderRadius: "10px",
              }}
            >
              <option defaultChecked value="">
                Type
              </option>
              <option value="Paraplagia">Paraplegia</option>
              <option value="Quadriplegia">Quadriplegia</option>
            </select>
          </div>
          <div style={{ width: "15%" }}>
            <select
              onChange={(e) =>
                setReqObj({
                  ...reqObj,
                  filter: { ...reqObj.filter, district: e.target.value },
                })
              }
              style={{
                width: "100%",
                height: "100%",
                background: "#FFFFFF",
                border: "1px solid rgba(181, 181, 195, 0.4)",
                borderRadius: "10px",
              }}
            >
              <option defaultChecked value="">
                District
              </option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Amreli">Amreli</option>
              <option value="Bharuch">Bharuch</option>
              <option value="Bhavnagar">Bhavnagar</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Surat">Surat</option>
              <option value="Anand">Anand</option>
              <option value="Aravalli">Aravalli</option>
              <option value="Dahod">Dahod</option>
              <option value="Dang">Dang</option>
              <option value="Devbhoomi Dwarka">Devbhoomi Dwarka</option>
              <option value="Gandhinagar">Gandhinagar</option>
              <option value="Gir Somnath">Gir Somnath</option>
              <option value="Jamnagar">Jamnagar</option>
              <option value="Junagadh">Junagadh</option>
              <option value="Kutch">Kutch</option>
              <option value="Kheda">Kheda</option>
              <option value="Mahisagar">Mahisagar</option>
              <option value="Mehsana">Mehsana</option>
              <option value="Morbi">Morbi</option>
              <option value="Narmada">Narmada</option>
              <option value="Navsari">Navsari</option>
              <option value="Panchmahal">Panchmahal</option>
              <option value="Patan">Patan</option>s
              <option value="Porbandar">Porbandar</option>
              <option value="Sabarkantha">Sabarkantha</option>
              <option value="Surendranagar">Surendranagar</option>
              <option value="Tapi">Tapi</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Valsad">Valsad</option>
              <option value="Banaskantha">Banaskantha</option>
              <option value="Botad">Botad</option>
              <option value="Chhota Udaipur">Chhota Udaipur</option>

            </select>
          </div>
        </div>
        <div
          style={{ marginTop: 20, justifyContent: "center" }}
          className="row pb-5"
        >
          {loading ? (
            <center>
              <div style={{ margin: "100px" }}>
                <ReactLoading type={"spin"} color={"#6BC17A"} />
              </div>
            </center>
          ) : (
            APIData.map((item: any) => {
              return (
                <Card
                  key={item._id}
                  style={{
                    width: "18rem",
                    padding: "2%",
                    margin: "1.5%",
                    background: "#FFFFFF",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "10px",
                  }}
                >
                  <Card.Content
                    onClick={() => {
                      Details(item);
                    }}
                  >
                    <div>
                      <img
                        style={{
                          height: "8rem",
                          width: "14rem",
                        }}
                        src={`${url}${item.email}/${item.image}`}
                        alt="image"
                      />
                    </div>
                    <Card.Header
                      className="headText mt-1"
                      style={{
                        fontWeight: 400,
                        fontSize: "18px",
                        color: "#181C32",
                      }}
                    >
                      {item.fname} {item.lname}
                    </Card.Header>
                    <br />
                    <Card.Description className="descText">
                      <label style={{ border: "0", color: "#171919" }}>
                        {item.description.slice(0, 30)}...
                      </label>
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>
                {reqObj.page} of {Math.ceil(totalCount / pageSize)}
              </p>
            </div>
            <div>
              <ReactPaginate
                pageCount={Math.ceil(totalCount / pageSize)}
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                marginPagesDisplayed={0}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                forcePage={reqObj.page - 1}

              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}