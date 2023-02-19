import React from "react";
import { Link } from "react-router-dom";

import "boxicons";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <body className="nav">
        <ul>
          <li>
            <Link to="/dashboard">
              <box-icon name="home"></box-icon>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/wallet">
              <box-icon name="wallet"></box-icon>
              <span className="text">Wallet</span>
            </Link>
          </li>
          <li>
            <Link to="/transactions">
              <box-icon name="data" type="solid"></box-icon>
              <span className="text">Transactions</span>
            </Link>
          </li>
          <li>
            <Link to="/analytics">
              <box-icon name="bar-chart-alt-2"></box-icon>{" "}
              <span className="text">Analytics</span>
            </Link>
          </li>
        </ul>
      </body>
    </div>
  );
}
