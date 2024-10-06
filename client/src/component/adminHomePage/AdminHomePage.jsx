import React from "react";
import AdminSideBar from "../adminSideBar/AdminSideBar";
import "./AdminHomePage.css";

function AdminHomePage() {
  return (
    <div>
      <div className="admin__dashbord__container">
        <h3 className="admin__navbar__adminHomePage">Admin dashbord</h3>
      </div>
      <AdminSideBar />
    </div>
  );
}

export default AdminHomePage;
