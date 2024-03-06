import React from "react";
import CertificateDetails from "../../Components/Admin/AddCertificate/CertificateDetails";
import Header from "../../Components/Admin/Header/Header";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";

function AddCertificatePage() {
  return (
    <div>
    <Header/>
      <Sidebar />
      <CertificateDetails />
    </div>
  );
}

export default AddCertificatePage;
