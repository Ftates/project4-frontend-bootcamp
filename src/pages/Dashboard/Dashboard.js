import React from "react";
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import "./Dashboard.css";
import dateFormat from "../../helpers/dateFormat";

import LineChart from "../../components/LineChart";
import DoughnutChart from "../../components/Doughnut";

export default function Dashboard() {
  const [txnData, setTxnData] = useState([]);
  const [walletData, setWalletData] = useState([]);
  const [portfolioGrowth, setPortfolioGrowth] = useState([]);

  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/");
    }
  }, [isAuth]);

  async function getWalletData() {
    try {
      const response = await axios.get(
        "http://localhost:3001/wallets/getWalletData",
        { params: { user_id: 1, wallet_id: 1 } }
      );
      const data = response.data;
      setWalletData(data);
    } catch (error) {
      console.log(error);
    }
  }

  function createChartData(input) {
    const chartData = {
      labels: input.map((data) => data.date),
      datasets: [
        {
          label: "Value",
          data: input.map((data) => data.value),
        },
      ],
    };

    return chartData;
  }

  async function getPortfolioGrowth() {
    const growth = [];
    try {
      const response = await axios.get(
        "http://localhost:3001/portfolio/getPortfolioGrowth",
        { params: { user_id: 1 } }
      );

      const data = response.data; // array

      data.forEach((element) => {
        const dayId = element.days;
        const dates = dateFormat(element.dates);
        const value = element.value;

        const payload = {
          id: dayId,
          date: dates,
          value: value,
        };
        growth.push(payload);
      });
      setPortfolioGrowth(growth);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getWalletData();
    getPortfolioGrowth();
  }, []);

  useEffect(() => {
    // console.log("Wallet data", walletData);
    console.log("Portfolio Growth", portfolioGrowth);
  }, [walletData, portfolioGrowth]);

  return (
    <div className="Screen">
      <div>
        {/* <span>Dashboard</span> */}
        <div className="dashboard">
          <div className="header">
            <div className="item1">{/* <LineChart chartData={test} /> */}</div>
            <div className="item2">
              <DoughnutChart />
            </div>
          </div>
          <div className="overview">
            {/* <LineChart chartData={inputChartData} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
