import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import Pagination from "@/components/Pagination";
import { paginate } from "@/components/paginate";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
export default function AllUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [dropdown, setdropdown] = useState("");
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    try {
      const getPosts = async () => {
        const { data: res } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
        );
        console.log("console msg", res);
        setAPIData(res.data);
      };
      getPosts();
    } catch (err) {
      console.log(`error`, err);
    } finally {
      setLoading(false);
    }
  }, []);
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    console.log(searchInput);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };
  const dropItems = (searchValue: any) => {
    setdropdown(searchValue);
    console.log(dropdown);
    if (dropdown !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(dropdown.toLowerCase());
      });
      setFilteredResults(filteredData);
      console.log(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };
  let onOptionChangeHandler = (event: any) => {
    console.log("User Selected Value - ", event.target.value);
    dropItems(event.target.value);
  };
  useEffect(() => {
    dropItems("");
  }, [dropdown]);
  const paginatePosts = paginate(APIData, currentPage, pageSize);
  const filteredPosts = paginate(filteredResults, currentPage, pageSize);
  const Details = (item: any) => {
    const id = `${item._id}`;
    router.push({
      pathname: "/admin/userDetail",
      query: { id },
    });
  };
  console.log("page", currentPage);
  return (
    <div style={{ padding: 20 }}>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <select onChange={onOptionChangeHandler}>
        <option defaultChecked value="">
          Selected
        </option>
        <option value="Paraplegia">Paraplegia</option>
        <option value="Quadriplegia">Quadriplegia</option>
      </select>
      <div style={{ marginTop: 20, justifyContent: "center" }} className="row">
        {loading && <ReactLoading type={"spin"} color={"black"} />}
        {searchInput.length > 1 || dropdown.length > 1
          ? filteredPosts.map((item: any) => {
              return (
                <div>
                  <Card
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
                </div>
              );
            })
          : paginatePosts.map((item: any) => {
              return (
                <Card
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
        {searchInput.length > 1 ? (
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
  );
}
