import React, { useEffect, useState } from "react";
import "./MarriageCertDetails.css";
import { useParams } from "react-router-dom";
import {
  fetchSpecificMarriageCert,
  verifyMarriageCert,
} from "../../../Services/adminApi";
import { toast } from "react-toastify";

function MarriageCertDetails() {
  const [marriageCert, setMarriageCert] = useState([]);
  const certId = useParams().certId;

  useEffect(() => {
    fetchSpecificMarriageCert(certId)
      .then((response) => {
        console.log(response.data.data);
        setMarriageCert(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [certId]);

  const verifyCert = async (userId, certId) => {
    const data = await verifyMarriageCert(userId, certId);

    if (data.data.status) {
      toast.success(data.data.message);
    } else {
      toast.error("Unable to verify");
    }
  };

  return (
    <div className="mainMarriageCert">
      <h2 className="pb-5">Marriage Certificate Details</h2>
      {marriageCert.map((values) => (
        <div>
          <div className="firstPart">
            <div>
              <p>
                <strong>Date of Marriage : </strong>
                {values.dateOfMarriage}
              </p>
              <p>
                <strong>Place of Marriage : </strong>
                {values.placeOfMarriage}
              </p>
            </div>
            <div className="rightSideFirstPart">
              <p>
                <strong>Applied Date : </strong>
                {new Date(values.date).toDateString()}
              </p>
              <p>
                <strong>Applicant Name : </strong>
                {values.userId.username}
              </p>
            </div>
          </div>
          <table className="certificateInfo">
            <tbody>
              <>
                <tr key={values._id}>
                  <th>DOB:</th>
                  <td>{values.husbandDOB}</td>
                  <td>{values.wifeDOB}</td>
                </tr>
                <tr key={values._id}>
                  <th>Name:</th>
                  <td>{values.husbandName}</td>
                  <td>{values.wifeName}</td>
                </tr>
                <tr key={values._id}>
                  <th>Nationality:</th>
                  <td>{values.husbandNationality}</td>
                  <td>{values.husbandNationality}</td>
                </tr>
                <tr key={values._id}>
                  <th>Previous Marital Status:</th>
                  <td>{values.husMaritalStatus}</td>
                  <td>{values.wifeMaritalStatus}</td>
                </tr>
                <tr key={values._id}>
                  <th>Photo:</th>
                  <td>
                    <img
                      className="husbandImg"
                      src={`http://localhost:4000/img/${values.husbandImage}`}
                      alt="Husband"
                    />
                  </td>
                  <td>
                    <img
                      className="husbandImg"
                      src={`http://localhost:4000/img/${values.wifeImage}`}
                      alt="Husband"
                    />
                  </td>
                </tr>
                <tr key={values._id}>
                  <th>Address Proof:</th>
                  <td>
                    <img
                      className="husbandAddressProof"
                      src={`http://localhost:4000/img/${values.husbandAadhar}`}
                      alt="Address Proof"
                    />
                  </td>
                  <td>
                    <img
                      className="husbandAddressProof"
                      src={`http://localhost:4000/img/${values.wifeAadhar}`}
                      alt="Address Proof"
                    />
                  </td>
                </tr>
              </>
            </tbody>
          </table>
          <div className="btnDiv">
            {values.certStatus ? (
              <h3 className="verifiedStatus">Verified</h3>
            ) : (
              <button
                className="btn btn-primary verfyBtn"
                onClick={() => verifyCert(values.userId._id, certId)}
              >
                <strong>Verify</strong>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MarriageCertDetails;
