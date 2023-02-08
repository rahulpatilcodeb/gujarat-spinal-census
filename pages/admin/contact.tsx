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
          ` ${process.env.NEXT_PUBLIC_API_URL}/users`,
          { headers: { Authorization: `${token}` } }
        );
        console.log(res);
        setPosts(res.data);
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
      {loading ? (
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>no</th>
                <th>email</th>
                <th>contactco</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {paginatePosts.map((post, index) => (
                <tr key={post._id}>
                  <td>{index + 1}</td>
                  <td> {post.email} </td>
                  <td> {post.contact} </td>
                  <td>{post.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {{posts.map((value, index) => {
        return (
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">{value}</p>
              <p className="card-text">{index}</p>
            </div>
          </div>
        );
      })} */}

          <Pagination
            items={posts.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
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
    </>
  );
};

export default Home;
