import React from "react";
import "./AdminSideBar.css";
function AdminSideBar() {
  return (
    <div className="sidebar__admim">
      <a href="/adminhomepage">Dashboard</a>
      <a href="/addProducts">Add Products</a>
      <a href="/updateproducts">update Products</a>
    </div>
  );
}

export default AdminSideBar;
