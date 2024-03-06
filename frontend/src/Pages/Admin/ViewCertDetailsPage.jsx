import React from "react";

import Header from "../../Components/Admin/Header/Header";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";
import CertDetails from "../../Components/Admin/CertDetail/CertDetails";

function ViewCertDetailsPage() {
  return (
    <div>
      <Header />
      <Sidebar />
      <CertDetails/>
    </div>
  );
}

export default ViewCertDetailsPage;
