import React, { useEffect, useState } from "react";
import "./UserAppliedCert.css";
import { useSelector } from "react-redux";
import {
  ViewComplaintStatus,
  getAllMarriageCert,
  getUserAppliedCert,
} from "../../../Services/userApi";
import { useNavigate } from "react-router-dom";

function UserAppliedCert() {
  const navigate = useNavigate();
  const [certStatus, setCertStatus] = useState([]);
  const [complaintData, setComplaintData] = useState([]);
  const [marriageCertDetails,setMarriageCertDetails]=useState([])
  const user = useSelector((state) => state?.user?.value);

  const complaint = (userId) => {
    ViewComplaintStatus(userId).then((res) => {
      if (res.data.status) {
        setComplaintData(res.data.Details);
      }
    });
  };

  const marriageCert=(userId)=>{
    getAllMarriageCert(userId).then((res)=>{
      if(res.data.status){
       
        setMarriageCertDetails(res.data.data)
      }
    })

  }
  useEffect(() => {
    getUserAppliedCert(user?._id).then((response) => {
      console.log(response.data);
      if (response.data.status) {
        console.log(response.data.data);
        setCertStatus(response.data.data);
      }
    });
    complaint(user?._id);
    marriageCert(user?._id);
  }, [user?._id]);
  return (
    <div className="certStatusMainDiv">
      <h5 className="mb-4">Applied Certificates</h5>

      {certStatus.map((value) => (
        <div className="certDetailsDiv mb-3">
          <div className="statusCertName">
            Certificate Name : {value.certName}{" "}
          </div>
          <div>Status : {value.certStatus ? "Success" : "Pending"}</div>

          <div>
            {value.certStatus ? (
              <button
                onClick={() => navigate(`/brithCertView/${value._id}`)}
                className="btn btn-primary"
              >
                View
              </button>
            ) : (
              ""
            )}{" "}
          </div>
        </div>
      ))}

  {marriageCertDetails.length > 0 && marriageCertDetails.map((values) => (
  <div className="certDetailsDiv mb-3">
    <div className="statusCertName">
      Certificate Name: {values.certName}
    </div>
    <div>Status: {values.certStatus ? "Success" : "Pending"}</div>
    <div>
      {values.certStatus ? (
        <button
          onClick={() => navigate(`/marriageCertView/${values._id}`)}
          className="btn btn-primary"
        >
          View
        </button>
      ) : (
        ""
      )}
    </div>
  </div>
))}


      <h5 className="mt-4 mb-4">Complaint Status</h5>
      {complaintData.map((value) => (
        <div className="certDetailsDiv mb-3 ">
          <div className="statusCertName">
            Complaint : {value.complaintTopic}
          </div>
          <div>Status : {value.complaintStatus ? "Viewed" : "Pending"}</div>
        </div>
      ))}
    </div>
  );
}

export default UserAppliedCert;
