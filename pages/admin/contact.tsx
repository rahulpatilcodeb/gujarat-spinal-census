import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../components/paginate";
// import "../../styles/Home.mod.css"

const Home = () => {
  const [posts, setPosts] = useState([]);
  const pageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      const  {data:res} = await axios.get(
        process.env.NEXT_PUBLIC_API_URL_Contact as string
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
      <table className="table">
        <thead>
          <tr>
            <th>no</th>
            <th>Contact</th>
            <th>email</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {paginatePosts.map((post,index) => (
            
            <tr key={post._id}>
              <td>{index+1}</td>
              <td> {post.email} </td>
              <td> {post.description} </td>
              <td>
                {post.contact}
              </td>
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
  );
};

export default Home;
