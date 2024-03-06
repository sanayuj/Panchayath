import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { uploadMarriageCertDetails } from "../../../Services/userApi";

function MarriageForm() {
  const user = useSelector((state) => state?.user?.value);

  const userId = user?._id;

  const initialValues = {
    DateOfMarriage: "",
    PlaceOfMarriage: "",

    HusbandName: "",
    HusbandDateOfBrith: "",
    HusbandNationality: "",
    HusbandAddress: "",
    HusbandPreviousMaritalStatus: "",
    HusAadharImage: null,
    HusbandImage: null,

    WifeName: "",
    WifeDateOfBrith: "",
    WifeNationality: "",
    WifeAddress: "",
    WifePreviousMaritalStatus: "",
    WifeAadharImage: null,
    WifeImage: null,
  };

  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    const {data}= await uploadMarriageCertDetails(values,userId)
    console.log(data);
    if(data.status){
      toast.success(data.message)
      resetForm ()
    }else{
      toast.error("Unable to submit")
    }
  };
  const validationSchema = Yup.object({
    HusbandName: Yup.string()
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
    HusbandDateOfBrith: Yup.string().required("* This field is required"),
    DateOfMarriage: Yup.string().required("* This field is required"),
    PlaceOfMarriage: Yup.string()
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
    HusbandNationality: Yup.string()
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
    HusbandAddress: Yup.string()
      .min(3, "*Name must be at least 3 characters long")
      .required("* This field is required"),
    HusbandPreviousMaritalStatus: Yup.string().required(
      "* This field is required"
    ),

    HusAadharImage: Yup.mixed()
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

    HusbandImage: Yup.mixed()
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
    // Wife Session

    WifeName: Yup.string()
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
    WifeDateOfBrith: Yup.string().required("* This field is required"),
    WifeNationality: Yup.string()
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

    WifeAddress: Yup.string()
      .min(3, "*Name must be at least 3 characters long")
      .required("* This field is required"),
    WifePreviousMaritalStatus: Yup.string().required(
      "* This field is required"
    ),
    WifeAadharImage: Yup.mixed()
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
    WifeImage: Yup.mixed()
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
                <h2 className="">Marriage Certificate form</h2>
                <p>Fill the details of your Marriage</p>
              </center>
            </div>
            <div className="formbold-input-flex">
              {/* Date of marriage */}
              <div>
                <label for="firstname" className="formbold-form-label">
                  Date of Marriage
                </label>
                <input
                  type="date"
                  name="DateOfMarriage"
                  id="DateOfMarriage"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.DateOfMarriage}
                  onChange={formik.handleChange}
                />
                {formik.touched.DateOfMarriage &&
                formik.errors.DateOfMarriage ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.DateOfMarriage}
                  </p>
                ) : null}
              </div>
              {/* Date of marriage */}

              {/* {Place of Marriage} */}
              <div>
                <label for="firstname" className="formbold-form-label">
                  Place of Marriage
                </label>
                <input
                  type="text"
                  name="PlaceOfMarriage"
                  id="PlaceOfMarriage"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.PlaceOfMarriage}
                  onChange={formik.handleChange}
                />
                {formik.touched.PlaceOfMarriage &&
                formik.errors.PlaceOfMarriage ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.PlaceOfMarriage}
                  </p>
                ) : null}
              </div>
              {/* {Husband DOB} */}
            </div>

            <hr></hr>
            <center>
              <p>Husband Details</p>
            </center>
            <hr></hr>
            <div className="formbold-input-flex">
              {/* Husband Name */}
              <div>
                <label for="firstname" className="formbold-form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="HusbandName"
                  id="husName"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.HusbandName}
                  onChange={formik.handleChange}
                />
                {formik.touched.HusbandName && formik.errors.HusbandName ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.HusbandName}
                  </p>
                ) : null}
              </div>
              {/* Husband Name */}

              {/* {Husband DOB} */}
              <div>
                <label for="firstname" className="formbold-form-label">
                  DOB
                </label>
                <input
                  type="date"
                  name="HusbandDateOfBrith"
                  id="husName"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.HusbandDateOfBrith}
                  onChange={formik.handleChange}
                />
                {formik.touched.HusbandDateOfBrith &&
                formik.errors.HusbandDateOfBrith ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.HusbandDateOfBrith}
                  </p>
                ) : null}
              </div>
              {/* {Husband DOB} */}
            </div>
            {/* Husband Nationality */}
            <div>
              <label for="firstname" className="formbold-form-label">
                Nationality
              </label>
              <input
                type="text"
                name="HusbandNationality"
                id="Nationality"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                value={formik.values.HusbandNationality}
                onChange={formik.handleChange}
              />
              {formik.touched.HusbandNationality &&
              formik.errors.HusbandNationality ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.HusbandNationality}
                </p>
              ) : null}
            </div>
            {/* Husband Nationality */}

            {/* Husband Address */}
            <div className="fformbold-mb-3">
              <div>
                <label for="phone" className="formbold-form-label">
                  Address
                </label>
                <textarea
                  type="text"
                  name="HusbandAddress"
                  id="phone"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.HusbandAddress}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.HusbandAddress && formik.errors.HusbandAddress ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.HusbandAddress}
                </p>
              ) : null}
            </div>
            {/* Husband Address */}

            {/* Husband Marital Status */}
            <div className="formbold-mb-3">
              <label
                htmlFor="HusbandPreviousMaritalStatus"
                className="formbold-form-label"
              >
                Previous Marital Status
              </label>
              <select
                name="HusbandPreviousMaritalStatus"
                id="HusbandPreviousMaritalStatus"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                value={formik.values.HusbandPreviousMaritalStatus}
                onChange={formik.handleChange}
              >
                <option value="" label="Select One" />
                <option value="single" label="Single" />
                <option value="married" label="Married" />
                <option value="divorced" label="Divorced" />
                <option value="widowed" label="Widowed" />
              </select>
              {formik.touched.HusbandPreviousMaritalStatus &&
              formik.errors.HusbandPreviousMaritalStatus ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.HusbandPreviousMaritalStatus}
                </p>
              ) : null}
            </div>
            {/* Husband Marital Status */}

            {/* Husband Aadhar */}
            <div className="formbold-mb-3">
              <label for="address" className="formbold-form-label">
                Aadhar upload
              </label>
              <input
                type="File"
                name="HusAadharImage"
                id="HusAadharImage"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  formik.setFieldValue("HusAadharImage", event.target.files[0]);
                }}
              />
              {formik.touched.HusAadharImage && formik.errors.HusAadharImage ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.HusAadharImage}
                </p>
              ) : null}
            </div>
            {/* Husband Aadhar */}

            {/* Husband Photo */}
            <div className="formbold-mb-3">
              <label for="address" className="formbold-form-label">
                Passport Photo
              </label>
              <input
                type="File"
                name="HusbandImage"
                id="HusbandImage"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  formik.setFieldValue("HusbandImage", event.target.files[0]);
                }}
              />
              {formik.touched.HusbandImage && formik.errors.HusbandImage ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.HusbandImage}
                </p>
              ) : null}
            </div>
            {/* Husband Photo */}

            <hr></hr>
            <center>
              <p>Wife Details</p>
            </center>
            <hr></hr>

            <div className="formbold-input-flex">
              {/* Wife Name */}
              <div>
                <label for="firstname" className="formbold-form-label">
                  Wife Name
                </label>
                <input
                  type="text"
                  name="WifeName"
                  id="WifeName"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.WifeName}
                  onChange={formik.handleChange}
                />
                {formik.touched.WifeName && formik.errors.WifeName ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.WifeName}
                  </p>
                ) : null}
              </div>
              {/* Wife Name */}
              {/* {Husband DOB} */}
              <div>
                <label for="firstname" className="formbold-form-label">
                  DOB
                </label>
                <input
                  type="date"
                  name="WifeDateOfBrith"
                  id="WifeDateOfBrith"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.WifeDateOfBrith}
                  onChange={formik.handleChange}
                />
                {formik.touched.WifeDateOfBrith &&
                formik.errors.WifeDateOfBrith ? (
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    {formik.errors.WifeDateOfBrith}
                  </p>
                ) : null}
              </div>
              {/* {Husband DOB} */}
            </div>
            {/* Wife Nationality */}
            <div>
              <label for="firstname" className="formbold-form-label">
                Nationality
              </label>
              <input
                type="text"
                name="WifeNationality"
                id="WifeNationality"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                value={formik.values.WifeNationality}
                onChange={formik.handleChange}
              />
              {formik.touched.WifeNationality &&
              formik.errors.WifeNationality ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.WifeNationality}
                </p>
              ) : null}
            </div>
            {/* Wife Nationality */}
            {/* Wife Address */}
            <div className="formbold-mb-3">
              <label for="address" className="formbold-form-label">
                Address
              </label>
              <textarea
                type="text"
                name="WifeAddress"
                id="WifeAddress"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                value={formik.values.WifeAddress}
                onChange={formik.handleChange}
              />
              {formik.touched.WifeAddress && formik.errors.WifeAddress ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.WifeAddress}
                </p>
              ) : null}
            </div>
            {/* Wife Address */}

            {/* wife Marital Status */}
            <div className="formbold-mb-3">
              <label
                htmlFor="WifePreviousMaritalStatus"
                className="formbold-form-label"
              >
                Previous Marital Status
              </label>
              <select
                name="WifePreviousMaritalStatus"
                id="WifePreviousMaritalStatus"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                value={formik.values.WifePreviousMaritalStatus}
                onChange={formik.handleChange}
              >
                <option value="" label="Select One" />
                <option value="single" label="Single" />
                <option value="married" label="Married" />
                <option value="divorced" label="Divorced" />
                <option value="widowed" label="Widowed" />
              </select>
              {formik.touched.WifePreviousMaritalStatus &&
              formik.errors.WifePreviousMaritalStatus ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.WifePreviousMaritalStatus}
                </p>
              ) : null}
            </div>
            {/* wife Marital Status */}

            {/* Wife Aadhar */}
            <div className="formbold-mb-3">
              <label for="address" className="formbold-form-label">
                Aadhar upload
              </label>
              <input
                type="File"
                name="WifeAadharImage"
                id="WifeAadharImage"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  formik.setFieldValue(
                    "WifeAadharImage",
                    event.target.files[0]
                  );
                }}
              />
              {formik.touched.WifeAadharImage &&
              formik.errors.WifeAadharImage ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.WifeAadharImage}
                </p>
              ) : null}
            </div>
            {/* Wife Aadhar */}

            {/* Wife Photo */}
            <div className="formbold-mb-3">
              <label for="address" className="formbold-form-label">
                Passport Photo
              </label>
              <input
                type="File"
                name="WifeImage"
                id="WifeImage"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  formik.setFieldValue("WifeImage", event.target.files[0]);
                }}
              />
              {formik.touched.WifeImage && formik.errors.WifeImage ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.WifeImage}
                </p>
              ) : null}
            </div>
            {/* Wife Photo */}

            <button type="submit" className="formbold-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MarriageForm;
