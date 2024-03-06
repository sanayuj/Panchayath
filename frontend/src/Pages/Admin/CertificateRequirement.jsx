import React from "react";
 import Header from "../../Components/Admin/Header/Header";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";
import Requirement from "../../Components/Admin/CertificateRequirement/Requirement";

function CertificateRequirement() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Requirement />
    </div>
  );
}

export default CertificateRequirement;
