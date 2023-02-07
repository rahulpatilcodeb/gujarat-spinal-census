import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "@/store/userSlice";
// import user from "@/model/user.entity";
import { useRouter } from "next/router";
import { login } from "@/store/userSlice";
// import { setCookie, getCookie } from "cookies-next";
import { RootState } from "@/store/store";
import Style from "@/styles/loader.module.scss";

const Login = () => {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axiosInstance.get("/data");
  //     setData(response.data);
  //   };
  //   fetchData();
  // }, []);

  const router = useRouter();

  let { user: users, islogin: Ilogin } = useSelector(
    (state: RootState) => state.users
  );

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [signin, setSignin] = useState(false);

  useEffect(() => {
    console.log(Ilogin);
    setSignin(Ilogin);
    if (Ilogin) {
      router.push("/admin/patients");
    }
    setLoading(true);
  }, [Ilogin]);

  async function onSubmit(e: any) {
    e.preventDefault();

    try {
      setLoading(false);
      // Send a request to the server to check the username and password
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL_ADMIN as string,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const datadb = await response.json();
      console.log(datadb);

      // if success
      if (response.ok) {
        console.log("first if", datadb.name);
        if (datadb.name != undefined) {
          // console.log("second if");
          // console.log(datadb);
          // setCookie("token", datadb.key);
          dispatch(login({ user: datadb.name, token: datadb.key }));
          // console.log(response);
          // axios.defaults.headers.common.Authorization = `Bearer ${datadb.key}`;
          // return true;
          router.push("/admin/patients");
        }
      } else {
        throw new Error(datadb.message);
      }
    } catch (error) {
      alert(`\n Please provide correct input.\n ${error} \n thank you!`);
    }
  }

  const handleInputData = (e: any) => {
    //updating for data state taking previous state and then adding new value to create new object
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {loading ? (
        <form className="container mb-5">
          <div className="col d-flex justify-content-center">
            <span>
              <b>--Admin Login --</b>
            </span>
          </div>

          <div className="m-3">
            <label className="mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              required
              onChange={handleInputData}
              className="form-control bg-light"
              name="email"
              type="email"
              id="email"
              value={formData.email}
              placeholder="Email Address"
            ></input>
          </div>
          <div className="m-3">
            <label className="mb-1" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleInputData}
              required
              className="form-control bg-light"
              name="password"
              type="password"
              id="password"
              value={formData.password}
              placeholder="Password"
            ></input>
          </div>
          <div className="d-flex justify-content-end mt-3 me-3">
            <button type="reset" className="btn btn-outline-secondary me-3">
              Cancel
            </button>
            <button
              type="submit"
              onClick={onSubmit}
              style={{
                backgroundColor: "rgba(193, 107, 178, 1)",
                color: "white",
              }}
              className="btn"
              role="button"
            >
              Submit
            </button>
          </div>
        </form>
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

export default Login;