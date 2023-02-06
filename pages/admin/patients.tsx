import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../components/paginate";
// import "../../styles/Home.mod.css"

const Patients = () => {
  const [posts, setPosts] = useState([]);
  const pageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL as string
      );
      console.log(res);
      setPosts(res.data);
    };
    getPosts();
    // paginatePosts.map((posts)=>{
    //   console.log("in page",posts.data)
    // })
  }, []);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const paginatePosts = paginate(posts, currentPage, pageSize);

  return (
    <div className="container">
      {paginatePosts.map((post, index) => (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card">
              {/* <img src="..." className="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h5 className="card-title">{post.fname+" "+post.lname}</h5>
                <p className="card-text">{post.description}
                </p>
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
  );
};

export default Patients;
