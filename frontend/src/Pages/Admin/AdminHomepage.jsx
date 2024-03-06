import React from "react";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";
import Header from "../../Components/Admin/Header/Header";
import ListUser from "../../Components/Admin/ListUser/ListUser";

function AdminHomepage() {
  return (
    <div>
      <Header />
      
      <Sidebar />
      <ListUser/>
    </div>
  );
}

export default AdminHomepage;
