import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../components/paginate";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// const axiosInstance = axios.create({
//   baseURL: process.env.,
// });

// import "../../styles/Home.mod.css"

const Home = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const pageSize = 10;

  const {
    user: user,
    islogin: Ilogin,
    token: token,
  } = useSelector((state: RootState) => state.users);
  // const header = `Authorization: Bearer ${token}`

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      if (Ilogin) {
        const { data: res } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/contactPage`,
          // { headers: { Authorization: `${token}` } }
        );
        console.log(res);
        const demo = (res.data);
        setPosts(demo.reverse());
      }
      if (!Ilogin) {
        router.push("/admin/login");
      }
      setLoading(true);
    };
    getPosts();
    // paginatePosts.map((posts)=>{
    //   console.log("in page",posts.data)
    // })
  }, [Ilogin]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const paginatePosts = paginate(posts, currentPage, pageSize);

  return (
    <>
      <div>
        {loading ? (
          <div className="container pb-3">
            <table className="table border">
              <thead style={{ fontSize: "18px" }}>
                <tr>
                  <th>
                    <center>Sr.No.</center>
                  </th>
                  <th>
                    <center>Email</center>
                  </th>
                  <th>
                    <center>Contact No.</center>
                  </th>
                  <th>
                    <center>Description</center>
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "16px" }}>
                {paginatePosts.map((post, index) => (
                  <tr key={post._id}>
                    <td>
                      <center> {index + 1}</center>
                    </td>
                    <td>
                      <center> {post.email}</center>
                    </td>
                    <td>
                      <center> {post.contact}</center>
                    </td>
                    <td>
                      <center>
                        <textarea
                          style={{ width: "100%", height: "30px", resize: "none" }}
                          readOnly
                          value={post.description}

                        >
                          {/* {post.description} */}
                        </textarea>
                      </center>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p>
                  {currentPage} of {Math.ceil(posts.length / pageSize)}
                </p>
              </div>
              <div>
                <Pagination
                  items={posts.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
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
        ;
      </div>
    </>
  );
};

export default Home;
