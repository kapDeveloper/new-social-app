import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/authSlice";

// tostify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegUser = () => {
  //navigate
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();

  // formik
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),

      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol")
        .required("Required"),

      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        'Must match "password" field value'
      ),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("Submitted Data:", values);

      dispatch(signUpUser(values));

      navigate("/log-user");
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="userName">First Name</label>
        <input
          id="userName"
          type="text"
          {...formik.getFieldProps("userName")}
        />
        {formik.touched.userName && formik.errors.userName ? (
          <div>{formik.errors.userName}</div>
        ) : null}
        <br />
        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <br />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
        <br />
        <button type="submit">Register</button>
        <ToastContainer />
      </form>
      <button
        onClick={() => {
          navigate("/log-user");
        }}
      >
        Login
      </button>
    </>
  );
};

export default RegUser;
