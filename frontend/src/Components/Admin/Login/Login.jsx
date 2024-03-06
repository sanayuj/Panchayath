import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminLogin } from "../../../Services/adminApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../../Features/setAdmin";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      adminLogin(values)
        .then((res) => {
          if (res.data.status) {
            dispatch(setAdminDetails(res.data.adminDetails));
            localStorage.setItem("adminJWT", res.data.token);
            toast.success(res.data.message);
            navigate("/admin/home");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error("Unable to login");
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("* Invaild email format")
      .required("* This field is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "* Invalid email address"
      ),
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
          <h2>Admin Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group my-3">
              <input
                className="loginInput my-3"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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

            <div className="form-group ">
              <input
                className="loginInput "
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
