import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//redux
import { logout, signInUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        rememberPassword: { ...formData.rememberPassword, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInUser(formData));
    } catch (error) {
      console.error("Error While Login:", error);
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  const logoutHandle = () => {
    dispatch(logout);
  };

  return (
    <>
      <div>
        <h1 className="text-2xl text-center font-bold">Login</h1>
      </div>
      <div></div>
      <div className="flex bg-teal-200 justify-center">
        <form>
          <h2>Sign in to your account</h2>

          <label htmlFor="email">
            Your email: <br />
            <input
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="abc123@gmail.com"
              onChange={handleChange}
              value={formData.email}
            />
          </label>
          <br />
          <label htmlFor="password">
            Password: <br />
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="*******"
              onChange={handleChange}
              value={formData.password}
            />
          </label>
          <br />
          <button onClick={handleSubmit}>Sign in</button>
          <br />
          <button onClick={logoutHandle}>Logout</button>
          <br />
          <p>
            Don’t have an account yet?{" "}
            <Link to="/register">
              <span className=" text-red-900 font-bold">Sign up</span>
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPage;

/*
const data = useSelector((state) => state.user.user[0].data.email);
  console.log("Logged User:", data);
*/
