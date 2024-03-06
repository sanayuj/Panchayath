import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./AddProject.css";
import { uploadProjectDetails } from "../../../Services/adminApi";
import { toast } from "react-toastify";
function AddProject() {
  const initialValues = {
    date: "",
    projectName: "",
    projectDescription: "",
    Website: "",
    projectPhotos: null,
  };

  const onSubmit = async(values,{ resetForm }) => {
    console.log(values);
    const {data}=await uploadProjectDetails(values)
    console.log(data,"&&&&&");
    if(data.status){
      toast.success(data.message)
      resetForm()
    }else{
      toast.error("Unable to submit")
    }
  };

  const validationSchema = Yup.object({
    projectName: Yup.string()
      .min(3, "* Name must be at least 3 characters long")
      .required("* Name of Project is required"),
    date: Yup.date().required("* Date is required"),
    Website: Yup.string().required("* Website is required"),
    projectDescription: Yup.string().required(
      "* Project description is required"
    ),
    projectPhotos: Yup.mixed()
      .test("fileFormat", "Invalid file format", (value) => {
        if (value) {
          const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
          return allowedFormats.includes(value.type);
        }
        return true;
      })
      .required("* This field is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <div className="AddProjectMainClass">
      <h5 mb-4>Add Project</h5>
      <div>
        <div className="formbold-main-wrapper">
          <div className="formbold-form-wrapper">
            <form onSubmit={formik.handleSubmit}>
              <div className="formbold-form-title">
                <center>
                  {" "}
                  <h2 className="">Panchayath Project</h2>
                  <p>Fill the details</p>
                </center>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label for="date" className="formbold-form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="formbold-form-input"
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.date && formik.errors.date ? (
                    <p
                      className="text-danger"
                      style={{
                        fontSize: "12px",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      {formik.errors.date}
                    </p>
                  ) : null}
                </div>

                <div className="fformbold-mb-3">
                  <div>
                    <label for="projectName" className="formbold-form-label">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      id="projectName"
                      className="formbold-form-input"
                      onBlur={formik.handleBlur}
                      value={formik.values.projectName}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.touched.projectName && formik.errors.projectName ? (
                    <p
                      className="text-danger"
                      style={{
                        fontSize: "12px",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      {formik.errors.projectName}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="fformbold-mb-3 mt-3">
                <div>
                  <label for="projectDescription" className="formbold-form-label">
                    Project Description
                  </label>
                  <textarea
                    type="text"
                    name="projectDescription"
                    id="projectDescription"
                    className="formbold-form-input"
                    onBlur={formik.handleBlur}
                    value={formik.values.projectDescription}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.projectDescription && formik.errors.projectDescription ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.projectDescription}
                  </p>
                ) : null}
              </div>
              <div className="fformbold-mb-3 mt-3">
                <div>
                  <label for="Website" className="formbold-form-label">
                    Website
                  </label>
                  <input
                    type="text"
                    name="Website"
                    id="Website"
                    className="formbold-form-input"
                    onBlur={formik.handleBlur}
                    value={formik.values.Website}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.Website && formik.errors.Website ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.Website}
                  </p>
                ) : null}
              </div>

              <div className="fformbold-mb-3 mt-3">
                <div>
                  <label for="projectPhotos" className="formbold-form-label">
                    Project Photos
                  </label>
                  <input
                    type="file"
                    name="projectPhotos"
                    id="projectPhotos"
                    className="formbold-form-input"
                    onBlur={formik.handleBlur}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "projectPhotos",
                        event.target.files[0]
                      );
                    }}
                  />
                </div>
                {formik.touched.projectPhotos && formik.errors.projectPhotos ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.projectPhotos}
                  </p>
                ) : null}
              </div>

              <button type="submit" className="formbold-btn ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
