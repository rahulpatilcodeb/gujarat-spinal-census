import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login } from "@/store/userSlice";
import { RootState } from "@/store/store";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();

  let { user: users, islogin: Ilogin } = useSelector(
    (state: RootState) => state.users
  );

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(Ilogin);
    if (Ilogin) {
      router.push("/admin/patients");
    }
  }, [Ilogin]);

  async function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/adminlogin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const datadb = await response.json();
      console.log(datadb);
      if (response.ok) {
        console.log("first if", datadb.payload.name);
        if (datadb.payload.name != undefined) {
          
          dispatch(
            login({ user: datadb.payload.name, token: datadb.payload.key })
          );
          setLoading(false)
          toast("Login Success", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          router.push("/admin/patients");
        }
      } else {
        return alert("invalid input");
      }
    } catch (error) {
      setLoading(false)
      // toast("Login Success", {
      //   hideProgressBar: true,
      //   autoClose: 2000,
      //   type: "success",
      // });
      alert(`Please provide correct input!`);
    } finally {
      setLoading(false)
    }
  }

  const handleInputData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {loading ? (
        <center>
          <div style={{ margin: "100px" }}>
            <ReactLoading type={"spin"} color={"#6BC17A"} />
          </div>
        </center>
      ) : (
        <form
          onSubmit={onSubmit}
          className="container w-25"
          style={{ marginBottom: "13%" }}
        >
          <div className="col d-flex justify-content-center">
            <span>
              <b style={{ fontSize: "18px" }}>--Admin Login--</b>
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
      )}

    </>
  );
};

export default Login;