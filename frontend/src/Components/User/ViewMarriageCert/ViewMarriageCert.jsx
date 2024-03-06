import React, { useEffect, useState } from "react";
import "./ViewMarriageCert.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMarriageCert } from "../../../Services/userApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


function ViewMarriageCert() {
  const [certDetails, setCertDetails] = useState([]);
  const certId = useParams().id;
  const user = useSelector((state) => state?.user?.value);

  useEffect(() => {
    getMarriageCert(certId, user?._id)
      .then((response) => {
        if (response.data.status) {
          setCertDetails(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [certId, user?._id]);



  const handleDownload = () => {
    const element = document.getElementById("ViewMarriageCertMainDivOne");
  

    const options = {
      scale: 2, 
      scrollY: -window.scrollY, 
      useCORS: true, 
      logging: false, 
    };
  
    html2canvas(element, options).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; 
      const aspectRatio = canvas.width / canvas.height;
      const imgHeight = imgWidth / aspectRatio;
  
      const marginTop = 20;
  
      pdf.addImage(imgData, "PNG", 0, marginTop, imgWidth, imgHeight);
      pdf.save("marriage_certificate.pdf");
    });
  };
  
  
  
  return (
    <div id="ViewMarriageCertMainDivOne" className="viewMarriageCertMainDivOne">
      <div id="mainMarriageCertOne" className="mainMarriageCert">
        <span>Key No.{certId}</span>
        <div className="certHeading">
        <center>
          <div className="centerContent">
            <div className="logoImg">
              <img
                className="govImageLogo"
                src="https://gad.kerala.gov.in/sites/default/files/inline-images/kerala%20final%20emblem_0.jpg"
                alt="Government Logo"
              />
            </div>

            <h5>
              <strong>FORM No.IV</strong>
            </h5>
            <span className="rulePara">
              <em>[See Rule 11(1)]</em>
            </span>
            <h5>
              <strong>GOVERNMENT OF KERALA</strong>
            </h5>
            <h5>DEPARTMENT OF PANCHAYAT</h5>
            <h5>
              <strong>CERTIFICATE OF MARRIAGE</strong>
            </h5>
          </div>
          </center>
          <div>{""}</div>
        </div>

        <p className="mb-4">
          <center>
            [Issued under rule 11 (1) of the Kerala Registration of Marriage
            (Common) Rule, 2008]
          </center>
        </p>
        {certDetails.map((values, index) => (
          <div key={index}>
            <div className="firstPart">
              <div>
                <p>
                  This is to certify that the following information has been
                  taken from the Register of Marriages (Common) maintained in
                  Form No. III in the Office of the Local Register of{" "}
                  {values.placeOfMarriage}.
                </p>
                <p>1. Date of Marriage: {values.dateOfMarriage}</p>
                <p>2. Place of Marriage: {values.placeOfMarriage}</p>
                <p>3. Details of Parties to the Marriage (as on the date of marriage)</p>
              </div>
            </div>
            <table className="certificateInfo">
              <tbody>
                <tr>
                  <th>Details</th>
                  <th>Husband</th>
                  <th>Wife</th>
                </tr>
                <tr>
                  <th>DOB:</th>
                  <td>{values.husbandDOB}</td>
                  <td>{values.wifeDOB}</td>
                </tr>
                <tr>
                  <th>Name:</th>
                  <td>{values.husbandName}</td>
                  <td>{values.wifeName}</td>
                </tr>
                <tr>
                  <th>Nationality:</th>
                  <td>{values.husbandNationality}</td>
                  <td>{values.wifeNationality}</td>
                </tr>
                <tr>
                  <th>Previous Marital Status:</th>
                  <td>{values.husbandMaritalStatus}</td>
                  <td>{values.wifeMaritalStatus}</td>
                </tr>
                <tr>
                  <th>Photo:</th>
                  <td>
                    <img
                      className="husbandImg"
                      src={`http://localhost:4000/img/${values.husbandImage}`}
                      alt={`Husband ${values.husbandName}`}
                    />
                  </td>
                  <td>
                    <img
                      className="husbandImg"
                      src={`http://localhost:4000/img/${values.wifeImage}`}
                      alt={`Wife ${values.wifeName}`}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="bottomPart">
              <p>Date of Issue: {new Date(values.date).toLocaleDateString()}</p>
              <p>
                Local Register: Local Register of Marriages (Common), {values.placeOfMarriage}
              </p>
              <p>QR Code</p>
              <center>
                This certificate is computer-generated and does not require any Seal/Signature in original. Software developed and supported by sanay.
              </center>
            </div>
          </div>
        ))}
      </div>
      <div className="btnDiv">
        <button className="btn btn-primary mb-5" onClick={handleDownload}>
          <strong>
            Download <i className="bi bi-file-earmark-arrow-down-fill"></i>
          </strong>
        </button>
      </div>
    </div>
  );
}

export default ViewMarriageCert;
