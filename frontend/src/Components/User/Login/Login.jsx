import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userLogin } from "../../../Services/userApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../Features/setUser";

function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const initialValues = {
    phoneNumber: "",
    password: "",
  };

  const onSubmit = async (values) => {
    const { data } = await userLogin(values);
    if (data.status) {
      localStorage.setItem("jwt", data.token);
      dispatch(setUserDetails(data.user));
      navigate("/")
      console.log(data);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "* Invalid phone number. Please enter a 10-digit number."
      )
      .required("* This Phone number is required"),
    password: Yup.string().required("* This field is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <div className="loginbodyClass">
      <div className="login-container">
        <div className="login-form ">
          <h2>Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group my-3">
              <input
                className="loginInput my-3"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phonenumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                required
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

            <div className="form-group ">
              <input
                className="loginInput "
                type="password"
                id="password"
                name="password"
                placeholder="Password"
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
            <p>
              Don't have account
              <Link className="text-decoration-none" to={"/signup"}>
                <span> Signup</span>
              </Link>
            </p>
            <button className="submitBtn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
