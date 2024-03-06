import React from "react";
import { useFormik } from "formik";
import "./Complaint.css";
import * as Yup from "yup";
import "./Complaint.css";
import { sendComplaint } from "../../../Services/userApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function Complaint() {
  const user = useSelector((state) => state?.user?.value);
  const userId=user?._id
  const initialValues = {
    username: "",
    wardNumber: "",
    phonenumber: "",
    email: "",
    image: null,
    complaintTopic: "",
    complaintDescription: "",
  };

  const onSubmit = async(values,{resetForm}) => {
    const {data}=await sendComplaint(values,userId)
    console.log(data);
    if(data.status){
      toast.success(data.message)
      resetForm()
    }else{
      toast.error(data.message)
    }
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
    wardNumber: Yup.string()
      .required("* This field is required")
      .matches(/^\d{1,2}$/, "* Invalid ward number"),
    phonenumber: Yup.string()
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
    image: Yup.mixed()
      .test("fileSize", "File size is too large", (value) => {
        if (value) return value.size <= 8 * 1024 * 1024;
        return true;
      })
      .test("fileFormat", "Invalid file format", (value) => {
        if (value) {
          const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
          return allowedFormats.includes(value.type);
        }
        return true;
      })
      .required("* This field is required"),
    complaintTopic: Yup.string().required("* This field is required"),
    complaintDescription: Yup.string().required("* This field is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <div>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={formik.handleSubmit}>
            <div className="formbold-form-title">
              <center>
                <h2 className="">Complaint form</h2>
                <p>Fill the details of your Complaint</p>
              </center>
            </div>

            <div className="formbold-input-flex">
              <div>
                <label for="firstname" className="formbold-form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                {formik.touched.username && formik.errors.username ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.username}
                  </p>
                ) : null}
              </div>

              <div className="fformbold-mb-3">
                <div>
                  <label for="phone" className="formbold-form-label">
                    Ward no
                  </label>
                  <input
                    type="text"
                    name="wardNumber"
                    id="wardNumber"
                    className="formbold-form-input"
                    onBlur={formik.handleBlur}
                    value={formik.values.wardNumber}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.wardNumber && formik.errors.wardNumber ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.wardNumber}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="fformbold-mb-3">
              <div>
                <label for="phone" className="formbold-form-label">
                  Phone number
                </label>
                <input
                  type="text"
                  name="phonenumber"
                  id="phone"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.phonenumber && formik.errors.phonenumber ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.phonenumber}
                </p>
              ) : null}
            </div>

            <div className="formbold-mb-3">
              <label for="address" className="formbold-form-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.email}
                </p>
              ) : null}
            </div>

            <div className="formbold-mb-3">
              <label for="address" className="formbold-form-label">
                Image upload
              </label>
              <input
                type="File"
                name="image"
                id="image"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  formik.setFieldValue("image", event.target.files[0]);
                }}
              />
              {formik.touched.image && formik.errors.image ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.image}
                </p>
              ) : null}
            </div>

            <div className="formbold-mb-3">
              <label for="address" className="formbold-form-label">
                Complaint Subject
              </label>
              <input
                type="text"
                name="complaintTopic"
                id="complaintTopic"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                value={formik.values.complaintTopic}
                onChange={formik.handleChange}
              />
              {formik.touched.complaintTopic && formik.errors.complaintTopic ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.complaintTopic}
                </p>
              ) : null}
            </div>

            <div className="formbold-mb-3">
              <label for="address" className="formbold-form-label">
                Complaint Description
              </label>
              <textarea
                type="text"
                name="complaintDescription"
                id="complaintDescription"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                value={formik.values.complaintDescription}
                onChange={formik.handleChange}
              />
              {formik.touched.complaintDescription &&
              formik.errors.complaintDescription ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.complaintDescription}
                </p>
              ) : null}
            </div>

            <button type="submit" className="formbold-btn">
              Submit
            </button>
          </form>
        </div>
      
      </div>
    </div>
  );
}

export default Complaint;
