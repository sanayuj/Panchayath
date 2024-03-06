import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Requirement.css";
import { addCertificateRequirement, getAllCertificate } from "../../../Services/adminApi";
import { toast } from "react-toastify";

function Requirement() {
  const [certificate, setCertificate] = useState([]);
  useEffect(() => {
    getAllCertificate().then((res) => {
      setCertificate(res.data.certificate);
    });
  }, []);

  const initialValues = {
    certRequirement: "",
    certificateName: "",
  };

  const onSubmit = (values,{resetForm}) => {
    console.log(values, "&&&");
    const [Id, certificateName] = values.certificateName.split(',');
    const dataToSend = {
      certRequirement: values.certRequirement,
      certificateId: Id,
      certificateName: certificateName,
    };
    console.log(dataToSend,"oooo");
   addCertificateRequirement(dataToSend).then((res)=>{
    if(res.data.status){
      toast.success(res.data.message)
      resetForm()
    }else{
      toast.error("Unable to submit")
    }
   })
  };

  const validationSchema = Yup.object({
    certRequirement: Yup.string().required("* This field is required"),
    certificateName: Yup.string().required("* This field is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="formbold-form-title">
            <center>
              <h2 className="">Add certificate requirement</h2>
            </center>
          </div>

          <div className="fformbold-mb-3">
            <div>
              <label htmlFor="certificateName" className="formbold-form-label">
                Certificate Name
              </label>
              <select
                name="certificateName"
                id="certificateName"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                value={formik.values.certificateName}
                onChange={formik.handleChange}
                aria-label="Select Certificate"
              >
                <option value=""   className="formbold-form-input" label="Select Certificate" />
                {certificate.map((value, index) => (
                  <option   className="formbold-form-input" key={value._id} value={`${value._id},${value.certificateName}`}>
                    {value.certificateName}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.certificateName && formik.errors.certificateName ? (
              <p
                className="text-danger"
                style={{ fontSize: "12px", margin: "0px", padding: "0px" }}
              >
                {formik.errors.certificateName}
              </p>
            ) : null}
          </div>

          <div className="fformbold-mb-3">
            <div>
              <label htmlFor="certRequirement" className="formbold-form-label">
                Required Details
              </label>
              <textarea
                name="certRequirement"
                id="certRequirement"
                className="formbold-form-input"
                onBlur={formik.handleBlur}
                placeholder="separate using ',' "
                value={formik.values.certRequirement}
                onChange={formik.handleChange}
                aria-label="Required Details"
                
              />
            </div>
            {formik.touched.certRequirement && formik.errors.certRequirement ? (
              <p
                className="text-danger"
                style={{ fontSize: "12px", margin: "0px", padding: "0px" }}
              >
                {formik.errors.certRequirement}
              </p>
            ) : null}
          </div>

          <button type="submit" className="formbold-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Requirement;
