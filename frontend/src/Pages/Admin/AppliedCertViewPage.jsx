import React from "react";
import AppliedCertView from "../../Components/Admin/AppliedCertView/AppliedCertView";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";
import Header from "../../Components/Admin/Header/Header";

function AppliedCertViewPage() {
  return (
    <div>
      <Header />
      <Sidebar />
      <AppliedCertView />
    </div>
  );
}

export default AppliedCertViewPage;
