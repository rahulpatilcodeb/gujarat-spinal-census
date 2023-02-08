import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import Pagination from "@/components/Pagination";
import { paginate } from "@/components/paginate";
import { useRouter } from "next/router";

export default function AllUser() {
  const router = useRouter();
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [dropdown, setdropdown] = useState("");
  const [districtDrop, setDistrictDrop] = useState("");
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const { data: res } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users`
        );
        console.log("console msg", res);
        setAPIData(res.data);
      };
      getPosts();
    } catch (err) {
      console.log(`error`, err);
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
      console.log("filteredResults", filteredResults);
      console.log("filteredData", filteredData);
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
      console.log("func filteredResults", filteredResults);
      console.log("filteredData", filteredData);
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
    console.log(" use effect filteredResults", filteredResults);
  }, [dropdown]);

  const districtItems = (searchValue: any) => {
    setDistrictDrop(searchValue);
    console.log(districtDrop);
    if (districtDrop !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(districtDrop.toLowerCase());
      });
      setFilteredResults(filteredData);
      console.log("result", filteredData);
      console.log("filteredResults", filteredResults);
    } else {
      setFilteredResults(APIData);
    }
  };

  let onOption = (event: any) => {
    console.log("User Selected Value - ", event.target.value);
    districtItems(event.target.value);
  };

  useEffect(() => {
    districtItems("");
    console.log("filteredResults", filteredResults);
  }, [districtDrop]);

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
      <div style={{display:"flex"}}>
        <Input
          icon="search"
          placeholder="Search..."
          onChange={(e) => searchItems(e.target.value)}
        />
        <select onChange={onOptionChangeHandler} value={dropdown}>
          <option defaultChecked value="">
            Type
          </option>
          <option value="Paraplagia">Paraplegia</option>
          <option value="Quadriplegia">Quadriplegia</option>
        </select>

        <select onChange={onOption}>
          <option defaultChecked value="">
            District
          </option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Amreli">Amreli</option>
        </select>
      </div>

      <div style={{ marginTop: 20, justifyContent: "center" }} className="row">
        {searchInput.length > 1 ||
        dropdown.length > 1 ||
        districtDrop.length > 1
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
        {dropdown.length > 1 ? (
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

// import axios from "axios";
// import { useState, useEffect } from "react";
// import Pagination from "../../components/Pagination";
// import { paginate } from "../../components/paginate";
// import { RootState } from "@/store/store";
// import { stat } from "fs";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";
// // import "../../styles/Home.mod.css"

// const Patients = () => {
//   const router = useRouter();

//   const { user: user, islogin: Ilogin } = useSelector(
//     (state: RootState) => state.users
//   );
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const pageSize = 10;

//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const getPosts = async () => {
//       const { data: res } = await axios.get(
//        `${process.env.NEXT_PUBLIC_API_URL}/users`
//       );
//       console.log(res);
//       setPosts(res.data);
//     };
//     getPosts();
//     setLoading(true)
//     if (!Ilogin) {
//       router.push("/admin/login");
//     }

//     // paginatePosts.map((posts)=>{
//     //   console.log("in page",posts.data)
//     // })
//   }, [Ilogin]);

//   const handlePageChange = (page: any) => {
//     setCurrentPage(page);
//   };

//   const paginatePosts = paginate(posts, currentPage, pageSize);

//   return (
//     <>
//       {loading ? (
//         <div className="container m-5">
//           {paginatePosts.map((post, index) => (
//             <div className="row row-cols-1 row-cols-md-3 g-4" key={post._id}>
//               <div className="col">
//                 <div className="card">
//                   {/* <img src="..." className="card-img-top" alt="..." /> */}
//                   <div className="card-body">
//                     <h5 className="card-title">
//                       {post.fname + " " + post.lname}
//                     </h5>
//                     <p className="card-text">{post.description}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <Pagination
//             items={posts.length}
//             pageSize={pageSize}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       ) : (
//         <center>
//           <div className="lds-ring">
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//           </div>
//         </center>
//       )}
//     </>
//   );
// };

// export default Patients;
