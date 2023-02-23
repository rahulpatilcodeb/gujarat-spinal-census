import { RootState } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Card } from "semantic-ui-react";
import { debounce } from 'lodash'

export default function Patients() {
  const { user: user, islogin: Ilogin, token: token } = useSelector(
    (state: RootState) => state.users
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [APIData, setAPIData] = useState([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
   let { query: page } = router;
   const activepage = parseInt(`${page.pages}`);
   console.log("active page number",activepage)
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
  const url = "https://gsc-project-1.s3.ap-south-1.amazonaws.com/";

  const searchItems = async (req: any) => {
    try {
      setLoading(true)
      const filteredData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/filtertype`,
        req
      );
      console.log("gdyag", filteredData.data);
      setAPIData(filteredData.data.data);
      setTotalCount(filteredData.data.totalCount);
      // router.push(`/admin/patients?page=${activepage}`);
    } catch (err) {
      console.log("error", err)
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
    setReqObj({
      ...reqObj,
      page: event.selected + 1,
    });
    router.push(`/admin/patients?page=${event.selected + 1}`);
  
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
                        {item.description}
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
    </>
  );
}