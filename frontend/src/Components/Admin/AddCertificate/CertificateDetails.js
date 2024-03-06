import React, { useEffect, useState } from "react";
import "./CertificateDetails.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addCertificate, getAllCertificate } from "../../../Services/adminApi";
import { toast } from "react-toastify";
function CertificateDetails() {
  const [certificate, setCertificate] = useState([]);
  useEffect(() => {
    getAllCertificate()
      .then((res) => {
        console.log(res.data.certificate);
        setCertificate(res.data.certificate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, );

  const initialValues = {
    certName: "",
  };
  const onSubmit = async (values, { resetForm }) => {
    const { data } = await addCertificate(values);
    if (data.status) {
      toast.success(data.message);
      resetForm();
    } else {
      toast.error("Unable to add certificate");
    }
  };

  const validationSchema = Yup.object({
    certName: Yup.string()
      .min(3, "*Name must be at least 3 characters long")
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
                <h2 className="">Add certificate</h2>
                {/* <p>Fill the requirement of your document</p> */}
              </center>
            </div>

            <div className="fformbold-mb-3">
              <div>
                <label for="certificateName" className="formbold-form-label">
                  Certificate Name
                </label>
                <input
                  type="text"
                  name="certName"
                  id="certName"
                  className="formbold-form-input"
                  onBlur={formik.handleBlur}
                  value={formik.values.certName}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.certName && formik.errors.certName ? (
                <p
                  className="text-danger"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {formik.errors.certName}
                </p>
              ) : null}
            </div>

            <button type="submit" className="formbold-btn">
              Submit
            </button>
          </form>

          <div className="showTable">
    <h5 className=" mb-5">Issued Certificate</h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Si.no</th>

                  <th scope="col">Certificate Name</th>
                </tr>
              </thead>
              <tbody>
                {certificate.map((value, index) => (
                  <tr key={value._id}>
                    <th scope="row">{index + 1}</th>

                    <th scope="row">{value.certificateName}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateDetails;
