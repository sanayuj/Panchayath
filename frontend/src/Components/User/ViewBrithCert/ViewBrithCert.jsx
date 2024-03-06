import React, { useEffect, useState } from "react";
import "./ViewBrithCert.css";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { ViewBrithCertDetails } from "../../../Services/userApi";
function ViewBrithCert() {
  const certId = useParams().id;
  const [certDetails, setCertDetails] = useState([]);
  useEffect(() => {
    console.log(certId, "****");
    ViewBrithCertDetails(certId)
      .then((res) => {
        console.log(res?.data?.certDetails, "DATA@");
        setCertDetails(res?.data?.certDetails);
        console.log(certDetails, "%%^^^^%%%");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [certId]);

  const handleDownload = () => {
    const content = document.getElementById("certificate-content");

    const pdfOptions = {
      margin: 10,
      filename: "BirthCertificate.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(content).set(pdfOptions).save();
  };
  return (
    <div className="mainViewBrith">
      <div className="birth-certificate" id="certificate-content">
        <div className="certificate-header">
          <h1>
            <b>Birth Certificate</b>
          </h1>
        </div>

        <div className="personal-info">
          {certDetails.map((value) => (
            <p className="mt-5">
              {" "}
              <span className="babyName">
                {value.childName}
                <hr />{" "}
              </span>
              <span className="mt-5">
                {" "}
                Was Born in {value.hospitalName},{value?.brithLocation} to{" "}
                {value?.nameOfMother} and {value?.nameOfFather} on {value?.dob}.
              </span>
            </p>
          ))}
        </div>
        <div className="author">
          <div>
            Chairperson <hr></hr>
          </div>
          <div>
            Secretary<hr></hr>
          </div>
        </div>
        <div className="certificate-footer">
          <p>
            This certificate is a record of the birth of the above-named person.
          </p>
        </div>
      </div>
      <div className="downloadBtn">
        <button
          className="btn btn-primary"
          onClick={() => {
            handleDownload();
          }}
        >
          Download <i class="bi bi-file-earmark-arrow-down-fill"></i>
        </button>
      </div>
    </div>
  );
}

export default ViewBrithCert;
