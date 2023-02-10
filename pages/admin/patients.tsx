import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import Pagination from "@/components/Pagination";
import { paginate } from "@/components/paginate";
 import { RootState } from "@/store/store";
 import { stat } from "fs";
 import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

export default function Patients() {
   const { user: user, islogin: Ilogin } = useSelector(
    (state: RootState) => state.users
  );
  const router = useRouter();
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [typeData, setTypeData] = useState("");
  const [districtData, setDistrictData] = useState("");
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    try {
      if (!Ilogin) {
        router.push("/admin/login");
      } else {
        const getPosts = async () => {
          const { data: res } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/users`
          );
          setAPIData(res.data);
        };
        getPosts();
      }
    } catch (err) {
      console.log(`error`, err);
    }
  }, [Ilogin]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

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
    router.push({
      pathname: "/admin/userDetail",
      query: { id },
    });
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <div
          style={{
            display: "flex",
            padding: "2%",
            background: "#F7FCF8",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              width: "60%",
              marginRight: "2%",
              marginLeft: "2%",
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
              marginRight: "2%",
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
          className="row"
        >
          {searchInput.length > 1 || filteredResults.length > 1
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
                          src="/user.png"
                          alt="image"
                        />
                      </div>

                      <Card.Header>
                        {item.fname} {item.lname}
                      </Card.Header>
                      <br />
                      <Card.Description>{item.description}</Card.Description>
                    </Card.Content>
                  </Card>
                );
              })
            : paginatePosts.map((item: any) => {
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
                          src="/user.png"
                          alt="image"
                        />
                      </div>

                      <Card.Header className="headText">
                        {item.fname} {item.lname}
                      </Card.Header>
                      <br />
                      <Card.Description className="descText">
                        {item.description}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                );
              })}
          {searchInput.length > 1 || filteredResults.length > 1 ? (
            <div>
              <Pagination
                items={filteredResults.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <div>
              <Pagination
                items={APIData.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}