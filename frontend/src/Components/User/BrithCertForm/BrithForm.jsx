import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./BrithForm.css";
import { applyCertificate } from "../../../Services/userApi";
import { toast } from "react-toastify";
import {useSelector} from "react-redux"
function BrithForm() {
  const user = useSelector((state) => state.user.value);
  

  const initialValues = {

    dateOfBrith: "",
    childName:"",
    hospitalName:"",
    nameOfFather: "",
    nameOfMother: "",
    permanentAddress: "",
    state: "",
    post: "",
    locationOfBrith: "",
    addressProof:null,
    

  };

  const onSubmit = async(values,{resetForm}) => {
    try {

      const {data}=await applyCertificate(values,user._id)
      if(data.status){
        toast.success(data.message)
        resetForm()
      }else{
        toast.error("Unable to submit")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    hospitalName:Yup.string()
    .min(3, "* Name must be at least 3 characters long")
    .matches(/^[A-Za-z]+$/, "* Name must only contain characters")
    .required("* Name of Father is required"),
    childName:Yup.string()
    .min(3, "* Name must be at least 3 characters long")
    .matches(/^[A-Za-z]+$/, "* Name must only contain characters")
    .required("* Name of Father is required"),
    dateOfBrith: Yup.date().required("* Date of Birth is required"),
    nameOfFather: Yup.string()
      .min(3, "* Name must be at least 3 characters long")
      .matches(/^[A-Za-z]+$/, "* Name must only contain characters")
      .required("* Name of Father is required"),
    nameOfMother: Yup.string()
      .min(3, "* Name must be at least 3 characters long")
      .matches(/^[A-Za-z]+$/, "* Name must only contain characters")
      .required("* Name of Mother is required"),
    permanentAddress: Yup.string().required("* Permanent Address is required"),
    state: Yup.string().required("* State is required"),
    post: Yup.string().required("* Post/Zip code is required"),
    locationOfBrith: Yup.string().required("* Brith location is required"),
    addressProof: Yup.mixed()
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
    <div>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={formik.handleSubmit}>
            <div className="formbold-form-title">
              <center>
                {" "}
                <h2 className="">Brith Certificate</h2>
                <p>Fill the details</p>
              </center>
            </div>

            <div className="formbold-input-flex">
              <div>
                <label for="firstname" className="formbold-form-label">
                Date of Brith
                </label>
                <input
                  type="date"
                  name="dateOfBrith"
                  id="dateOfBrith"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.dateOfBrith}
                  onChange={formik.handleChange}
                />
                {formik.touched.dateOfBrith && formik.errors.dateOfBrith ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.dateOfBrith}
                  </p>
                ) : null}
              </div>

              <div className="fformbold-mb-3">
                <div>
                  <label for="hospitalName" className="formbold-form-label">
                  Hospital Name
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    id="hospitalName"
                    className="formbold-form-input"
                    onBlur={formik.handleBlur}
                    value={formik.values.hospitalName}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.hospitalName && formik.errors.hospitalName ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.hospitalName}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="fformbold-mb-3">
              <div>
                <label for="childName" className="formbold-form-label">
                  Name of Child
                </label>
                <input
                  type="text"
                  name="childName"
                  id="childName"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.childName}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.childName && formik.errors.childName ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.childName}
                </p>
              ) : null}
            </div>
            <div className="fformbold-mb-3">
              <div>
                <label for="nameOfFather" className="formbold-form-label">
                  Name of Father
                </label>
                <input
                  type="text"
                  name="nameOfFather"
                  id="nameOfFather"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.nameOfFather}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.nameOfFather && formik.errors.nameOfFather ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.nameOfFather}
                </p>
              ) : null}
            </div>
            <div className="fformbold-mb-3">
              <div>
                <label for="nameOfMother" className="formbold-form-label">
                  Name of Mother
                </label>
                <input
                  type="text"
                  name="nameOfMother"
                  id="nameOfMother"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.nameOfMother}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.nameOfMother && formik.errors.nameOfMother ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.nameOfMother}
                </p>
              ) : null}
            </div>

            <div className="formbold-mb-3">
              <label for="permanentAddress" className="formbold-form-label">
               Permanent Address
              </label>
              <textarea
                type="text"
                name="permanentAddress"
                id="permanentAddress"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                value={formik.values.permanentAddress}
                onChange={formik.handleChange}
              />
              {formik.touched.permanentAddress && formik.errors.permanentAddress ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.permanentAddress}
                </p>
              ) : null}
            </div>

            <div className="formbold-input-flex">
              <div>
                <label for="state" className="formbold-form-label">
                  {" "}
                  State{" "}
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                />
                {formik.touched.state && formik.errors.state ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.state}
                  </p>
                ) : null}
              </div>

              <div>
                <label for="post" className="formbold-form-label">
                {" "}
                  Post/Zip code{" "}
                </label>
                <input
                  type="text"
                  name="post"
                  id="post"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.post}
                  onChange={formik.handleChange}
                />
                {formik.touched.post && formik.errors.post ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.post}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="formbold-input-flex">
              <div>
                <label for="locationOfBrith" className="formbold-form-label">
                Location of brith
                </label>
                <input
                  type="text"
                  name="locationOfBrith"
                  id="locationOfBrith"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.locationOfBrith}
                  onChange={formik.handleChange}
                />
                {formik.touched.locationOfBrith && formik.errors.locationOfBrith ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.locationOfBrith}
                  </p>
                ) : null}
              </div>

              <div className="fformbold-mb-3">
                <div>
                  <label for="addressProof" className="formbold-form-label">
                   Address proof
                  </label>
                  <input
                    type="file"
                    name="addressProof"
                    id="addressProof"
                    className="formbold-form-input"
                    onBlur={formik.handleBlur}
                    onChange={(event) => {
                  formik.setFieldValue("addressProof", event.target.files[0]);
                }}
                  />
                </div>
                {formik.touched.addressProof && formik.errors.addressProof ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.addressProof}
                  </p>
                ) : null}
              </div>
            </div>

            {/* <div className="formbold-input-flex">
              <div>
                <label for="post" className="formbold-form-label">
                  {" "}
                  Post/Zip code{" "}
                </label>
                <input
                  type="text"
                  name="post"
                  id="post"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.post}
                  onChange={formik.handleChange}
                />
                {formik.touched.post && formik.errors.post ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.post}
                  </p>
                ) : null}
              </div>
              <div>
                <label for="area" className="formbold-form-label">
                  {" "}
                  Poultry population{" "}
                </label>
                <input
                  type="number"
                  name="poultryPopulation"
                  id="area"
                  class="formbold-form-input"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.poultryPopulation}
                />
                {formik.touched.poultryPopulation &&
                formik.errors.poultryPopulation ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.poultryPopulation}
                  </p>
                ) : null}
              </div>
            </div> */}

            <button type="submit" className="formbold-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BrithForm;




// <div>
// <label for="phone" className="formbold-form-label">
//   Name of father
// </label>
// <input
//   type="text"
//   name="nameOfFather"
//   id="nameOfFather"
//   className="formbold-form-input"
//   onBlur={formik.handleBlur}
//   value={formik.values.nameOfFather}
//   onChange={formik.handleChange}
// />
// </div>