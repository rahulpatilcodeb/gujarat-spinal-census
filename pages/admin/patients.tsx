import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import Pagination from "@/components/Pagination";
import { paginate } from "@/components/paginate";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
export default function Patients() {
  const { user: user, islogin: Ilogin, token: token } = useSelector(
    (state: RootState) => state.users
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [typeData, setTypeData] = useState("");
  const [districtData, setDistrictData] = useState("");
  const pageSize = 8;
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const url = "https://gsc-project-1.s3.ap-south-1.amazonaws.com/";
  let demo = null;
  console.log(currentPage, "currentpage")
  useEffect(() => {
    setLoading(false);
    apiCall();
    setLoading(true)
    try {
      if (!Ilogin) {
        router.push("/admin/login");
      } else {
        apiCall()
        setLoading(false);
        const getPosts = async () => {
          const { data: res } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/pagination`
            // { headers: { Authorization: `${token}` } }
          );
          demo = res.data[0].count / 8;
          setTotalCount(res.data[0].count);
          console.log("total", res.data[0].count);
          console.log("this", Math.ceil(demo))
          // setAPIData(demo.reverse());
        };
        getPosts();
      }
    } catch (err) {
      console.log(`error`, err);
    } finally {
      setLoading(true);
    }
  }, [Ilogin,currentPage]);
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };


  async function apiCall() {
    console.log(currentPage, "this is current page")
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pagination`,
      { page: currentPage }
    )
    console.log(resp.data, "resp");
    setAPIData((resp.data).reverse())
    router.push(`/admin/patients?page=${currentPage}`);

  }




  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes((searchInput.toLowerCase()));
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };
  const dropItems = (searchValue: any) => {
    setTypeData(searchValue);
    if (typeData !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(typeData.toLowerCase());
      });
      setFilteredResults(filteredData);
    }
  };
  let onOptionChangeType = (event: any) => {
    dropItems(event.target.value);
  };
  useEffect(() => {
    dropItems("");
  }, [typeData]);
  const districtItems = (searchValue: any) => {
    setDistrictData(searchValue);
    if (districtData !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(districtData.toLowerCase());
      });
      setFilteredResults(filteredData);
    }
  };
  let onOptionChangeDistrict = (event: any) => {
    districtItems(event.target.value);
  };
  useEffect(() => {
    districtItems("");
  }, [districtData]);
  const paginatePosts = paginate(APIData, currentPage, pageSize);
  const filteredPosts = paginate(filteredResults, currentPage, pageSize);
  const Details = (item: any) => {
    const id = `${item._id}`;
    const page= currentPage
    router.push({
      pathname: "/admin/userDetail",
      query: { id, page },
    });
  };
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + pageSize;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = APIData.slice(itemOffset, endOffset);
  // console.log("current", currentItems)
  const pageCount = Math.ceil(totalCount/ pageSize);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any, role: any) => {
    const newOffset = (event.selected * pageSize) % totalCount;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setCurrentPage(event.selected + 1);
    setItemOffset(newOffset);
  };

  console.log("pageeeeee",currentPage)

  return (
    <>
      {loading ? (
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
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div
              style={{
                width: "15%",
              }}
            >
              <select
                onChange={onOptionChangeType}
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
                onChange={onOptionChangeDistrict}
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
            {
              filteredResults.length > 1
                ? filteredPosts.map((item: any) => {
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
                              height: "10rem",
                              width: "14rem",
                            }}
                            // src="/user.png"
                            src={`${url}${item.email}/${item.image}`}
                            alt="image"
                          />
                        </div>
                        <Card.Header
                          style={{
                            fontWeight: 400,
                            fontSize: "18px",
                            color: "#181C32",
                          }}
                        >
                          {item.fname} {item.lname}
                        </Card.Header>
                        <br />
                        <Card.Description>
                          <textarea
                            style={{ border: "0", color: "#171919" }}
                            readOnly
                            value={item.description}
                          >
                            {/* {item.description} */}
                          </textarea>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  );
                })
                : APIData.map((item: any) => {
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
                            // src="/user.png"
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
                          <label
                            style={{ border: "0", color: "#171919" }}
                          >
                            {item.description}
                          </label>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  );
                })
            }
            {filteredResults.length > 1 ? (
              <div>
                <Pagination
                  items={filteredResults.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p>
                    {currentPage} of {Math.ceil(totalCount / pageSize)}
                  </p>
                </div>
                <div>
                  <ReactPaginate
                    pageCount={pageCount}
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={3}
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
                  />
                  {/* <Pagination
                    items={APIData.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  /> */}
                </div>
              </div>
            )}
          </div>
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
      )}
    </>
  );
}