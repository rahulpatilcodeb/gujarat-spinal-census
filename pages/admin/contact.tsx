import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../components/paginate";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";

// const axiosInstance = axios.create({
//   baseURL: process.env.,
// });

// import "../../styles/Home.mod.css"

const Home = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const {
    user: user,
    islogin: Ilogin,
    token: token,
  } = useSelector((state: RootState) => state.users);
  // const header = `Authorization: Bearer ${token}`

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
      try {
        if (!Ilogin) {
          router.push("/admin/login");
        } else {
          setLoading(true);
          apiCall();
          const getPosts = async () => {
            const { data: res } = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/contactPage`
              // { headers: { Authorization: `${token}` } }
            );
            setTotalCount(res.data[0].count);
          };
          getPosts();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    // paginatePosts.map((posts)=>{
    //   console.log("in page",posts.data)
    // })
  }, [Ilogin, currentPage]);

  // const handlePageChange = (page: any) => {
  //   setCurrentPage(page);
  // };
  async function apiCall() {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/contactPage`,
      { page: currentPage }
    );
    console.log(resp.data, "resp");
    setPosts((resp.data).reverse());
  }

  // const endOffset = itemOffset + pageSize;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = APIData.slice(itemOffset, endOffset);
  // console.log("current", currentItems)
  // const [itemOffset, setItemOffset] = useState(0);
  const pageCount = Math.ceil(totalCount / pageSize);
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * pageSize) % totalCount;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setCurrentPage(event.selected + 1);
    // setItemOffset(newOffset);
  };


  const paginatePosts = paginate(posts, currentPage, pageSize);

  return (
    <>
      {loading && (
        <center>
          <div style={{ margin: "100px" }}>
            <ReactLoading type={"spin"} color={"#6BC17A"} />
          </div>
        </center>
      )}
      {/* {loading ? ( */}
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
            {posts.map((post: any, index) => (
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
                      style={{
                        width: "100%",
                        height: "30px",
                        resize: "none",
                      }}
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
                  items={posts.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                /> */}
          </div>
        </div>
      </div>
      {/* ) : (
          <center>
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </center>
        )} */}
      ;
    </>
  );
};

export default Home;
