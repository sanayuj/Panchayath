import React, { useEffect, useState } from "react";
import "./AppliedCertView.css";
import { appliedCertificate, fetchAllMarriageCert } from "../../../Services/adminApi";
import { useNavigate } from "react-router-dom";

function AppliedCertView() {
  const [appliedBirthCert, setAppliedBirthCert] = useState([]);
  const [appliedMarriageCert, setAppliedMarriageCert] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch applied birth certificates
    appliedCertificate()
      .then((response) => {
        if (response.data.status) {
          setAppliedBirthCert(response.data.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching applied birth certificates:", error);
      });

    // Fetch applied marriage certificates
    fetchAllMarriageCert()
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.data)
          setAppliedMarriageCert(response.data.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching applied marriage certificates:", error);
      });
  }, []);

  return (
    <div className="ViewAppliedCertMainpage">
      <h5>Applied Certificates</h5>
      
      {/* Display applied birth certificates */}
      {appliedBirthCert.map((cert) => (
        <div key={cert._id} className="viewAppliedCert">
          <div>{cert.certName}</div>
          <div>
            <span className="dateView">
              Applied date: {new Date(cert.date).toLocaleDateString("en-GB")}
            </span>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`/admin/viewCertDetails/${cert._id}`);
              }}
            >
              View
            </button>
          </div>
        </div>
      ))}

      {/* Display applied marriage certificates */}
      {appliedMarriageCert.map((cert) => (
        <div key={cert._id} className="viewAppliedCert">
          <div>{cert.certName}</div>
          <div>
            <span className="dateView">
              Applied date: {new Date(cert.date).toLocaleDateString("en-GB")}
            </span>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`/admin/marriageCertDetails/${cert._id}`);
              }}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppliedCertView;
