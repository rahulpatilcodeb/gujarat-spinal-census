import axios from "axios";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { logout } from "@/store/userSlice";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [reqObj, setReqObj] = useState<any>({
    filter: {
      fname: undefined,
    },
    page: 1,
    limit: 10
  })
  const {
    user: user,
    islogin: Ilogin,
    token: token,
  } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch()

  // try {
  const apiCall = async () => {
    // setLoading(true);
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/contactPage`,
      { reqObj }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((resp) => {
      console.log(resp.data, "resp");
      setPosts(resp.data.post);
      setTotalCount(resp.data.count)
    })
      .catch((err) => {
        console.log("err", err)

        console.log(err.response.data == "jwt expired")
        if (err.response.data == "jwt expired") {
          alert("seesion expired")
          dispatch(logout());


        }
      });

  }

  // }catch(err)
  // {
  //   console.log(err)
  // }

  useEffect(() => {
    try {
      if (!Ilogin) {
        router.push("/admin/login");
      } else {
        setLoading(true);
        apiCall();

      }
    }
    finally {
      console.log("error")
      setLoading(false);
    }
  }, [Ilogin, currentPage]);


  const pageCount = Math.ceil(totalCount / pageSize);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1);
    setReqObj({
      ...reqObj,
      page: event.selected + 1,
    });
  };

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      background: "#c6edc2",
      color: "black",
      boxShadow: theme.shadows[1],
      fontSize: 16,
    },
  }));

  return (
    <>
      {loading ? (
        <center>
          <div style={{ margin: "100px" }}>
            <ReactLoading type={"spin"} color={"#6BC17A"} />
          </div>
        </center>
      ) : (
        <div className="container pb-3">
          <table className="table border" style={{ background: "#F7FCF8" }}>
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
                <th style={{ width: "40%" }}>
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
                      <LightTooltip title={post.description} className="border" sx={{}}>
                          <p>{post.description.slice(0, 30)}...</p>
                      </LightTooltip>                  
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
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default Home;


