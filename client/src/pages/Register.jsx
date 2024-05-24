import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const okRegister = useSelector((state) => state.user.flag);
  console.log("okRegister", okRegister);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        termCondition: { ...formData.termCondition, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signUpUser(formData));

      if (okRegister) {
        console.log("here ", okRegister);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error While User Login:=>", error);
    }

    setFormData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div>
        <h1 className="text-2xl text-center font-bold">Register</h1>
      </div>
      <div className="flex bg-teal-200 justify-center">
        <form>
          <h2>Create an account</h2>
          <label htmlFor="userName">
            Username: <br />
            <input
              className="input"
              type="text"
              name="userName"
              id="userName"
              placeholder="abc123"
              onChange={handleChange}
              value={formData.userName}
              required
            />
          </label>
          <br />
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
              required
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
              required
            />
          </label>
          <br />
          <label htmlFor="confirmPassword">
            Confirm Password: <br />
            <input
              className="input"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="*******"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            />
          </label>
          <br />

          <button onClick={handleSubmit}>Create an account</button>

          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span className="font-bold">Login here</span>
            </Link>
          </p>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default Register;
