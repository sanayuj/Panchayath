import React, { useEffect, useState } from "react";
import "./ShowUserComplaints.css";
import {
  fetchAllComplaints,
  fetchSpecificComplaint,
  changeComplaintStatus,
} from "../../../Services/adminApi";
import { toast } from "react-toastify";
function ShowUserComplaints() {
  const [certificate, setCertificate] = useState([]);
  const [detailsCert, setDetailCert] = useState([]);
  const complaintFetchById = async (id) => {
    console.log(id);
    fetchSpecificComplaint(id).then((res) => {
      console.log(res.data.data, "****");
      if (res.data.status) {
        setDetailCert(res.data.data);
      }
    });
  };

  useEffect(() => {
    fetchAllComplaints()
      .then((res) => {
        console.log(res.data.Data, "##");
        setCertificate(res.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const toogleComplaintStatus = (id) => {
    console.log(id,"PP front");
    changeComplaintStatus(id)
      .then((res) => {
if(res.data.status){
  toast.success(res.data.message)
}
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="ShowUserComplaintsDiv">
      <h4 className="mb-4">User Complaints List</h4>
      {certificate.map((value) => (
        <div className="complaintMainDiv m-4">
          <div className="complaintDiv">
            Complaint relate to {value.complaintTopic}
          </div>
          <button
            onClick={() => {
              complaintFetchById(value._id);
            }}
            className="viewBtn btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            View
          </button>
        </div>
      ))}

      {/* modal */}

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          {detailsCert.map((value) => (
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Complaint Details
                </h1>

                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div>
                  <p>Name : {value.username}</p>

                  <p>Ward no: {value.wardnumber}</p>
                  <p>Contact no: {value.phonenumber}</p>
                  <p> Email Id: {value.email}</p>
                  <p>
                    {" "}
                    Date:{" "}
                    {new Date(value.date).toLocaleString("en-US", options)}
                  </p>
                  <p>Subject : {value.complaintTopic}</p>
                  <p>{value.complaintDescription}</p>
                  <img
                    className="compliantImage"
                    src={`http://localhost:4000/Img/${value.imageUrl}`}
                  ></img>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    toogleComplaintStatus(value._id);
                  }}
                >
                  Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowUserComplaints;
