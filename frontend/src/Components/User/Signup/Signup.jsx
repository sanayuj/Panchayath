import React from "react";
import "./Signup.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../../../Services/userApi";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const onSubmit = (values, { resetForm }) => {
    userSignup(values)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          resetForm();
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .strict(true)
      .trim("* Name must not contain white space")
      .test(
        "* no-whitespace",
        "* Name must not contain white space",
        (value) => !/\s/.test(value)
      )
      .min(3, "*Name must be at least 3 characters long")
      .matches(/^[A-Za-z]+$/, "* Name must only contain characters")
      .required("* This field is required"),
    phoneNumber: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "* Invalid phone number. Please enter a 10-digit number."
      )
      .required("* This field is required"),
    email: Yup.string()
      .email("* Invaild email format")
      .required("* This field is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "* Invalid email address"
      ),
    password: Yup.string()
      .required("* This field is required")
      .min(6, "* Password must be at least 6 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
        "* Password must contain at least one capital letter\nand one special character"
      ),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("* This field is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="bodyClass">
      <div className="signup-form">
        <center>
          <h2>Signup</h2>
        </center>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label className="signupLabel" for="username">
              Username:
            </label>
            <input
              className="signupInput"
              type="text"
              id="username"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              required
            />
            {formik.touched.username && formik.errors.username ? (
              <p
                className="text-danger"
                style={{ fontSize: "12px", margin: "0px" }}
              >
                {formik.errors.username}
              </p>
            ) : null}
          </div>

          <div className="form-group">
            <label className="signupLabel" for="phonenumber">
              Phone Number:
            </label>
            <input
              className="signupInput"
              type="text"
              id="phonenumber"
              name="phoneNumber"
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <p
                className="text-danger"
                style={{ fontSize: "12px", margin: "0px" }}
              >
                {formik.errors.phoneNumber}
              </p>
            ) : null}
          </div>

          <div className="form-group">
            <label className="signupLabel" for="email">
              Email:
            </label>
            <input
              className="signupInput"
              type="email"
              id="email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <p
                className="text-danger"
                style={{ fontSize: "12px", margin: "0px" }}
              >
                {formik.errors.email}
              </p>
            ) : null}
          </div>

          <div className="form-group">
            <label className="signupLabel" for="password">
              Password:
            </label>
            <input
              className="signupInput"
              type="password"
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <p
                className="text-danger"
                style={{ fontSize: "12px", margin: "0px" }}
              >
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          <div className="form-group">
            <label className="signupLabel" for="confirmpassword">
              Confirm Password:
            </label>
            <input
              className="signupInput"
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmpassword}
              required
            />
            {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
              <p
                className="text-danger"
                style={{ fontSize: "12px", margin: "0px" }}
              >
                {formik.errors.confirmpassword}
              </p>
            ) : null}
          </div>
          <p>
            Already hava an account
            <Link className="text-decoration-none" to={"/login"}>
              <span> Login </span>
            </Link>
          </p>
          <button className="SignupBtn" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
