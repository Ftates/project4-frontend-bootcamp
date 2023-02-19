import React from "react";

import "./Dashboard.css";
import Sidebar from "../../components/sidebar";

export default function Dashboard() {
  return (
    <div className="Screen">
      <div className="sidebar">
        <Sidebar />
      </div>

      <span className="header">Dashboard</span>
    </div>
  );
}
