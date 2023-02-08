import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../components/paginate";
import { RootState } from "@/store/store";
import { stat } from "fs";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
// import "../../styles/Home.mod.css"

const Patients = () => {
  const router = useRouter();

  const { user: user, islogin: Ilogin } = useSelector(
    (state: RootState) => state.users
  );
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(
       ` ${process.env.NEXT_PUBLIC_API_URL}/users`
      );
      console.log(res);
      setPosts(res.data);
    };
    getPosts();
    setLoading(true)
    if (!Ilogin) {
      router.push("/admin/login");
    }

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
        <div className="container m-5">
          {paginatePosts.map((post, index) => (
            <div className="row row-cols-1 row-cols-md-3 g-4" key={post._id}>
              <div className="col">
                <div className="card">
                  {/* <img src="..." className="card-img-top" alt="..." /> */}
                  <div className="card-body">
                    <h5 className="card-title">
                      {post.fname + " " + post.lname}
                    </h5>
                    <p className="card-text">{post.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

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
    </>
  );
};

export default Patients;
