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
  const [userId, setUserId] = useState(0);

  const navigate = useNavigate();
  const { isAuth, loggedUser } = useAuth();

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/");
    }
  }, [isAuth]);

  useEffect(() => {
    // console.log("Before: ", userId);
    getUserId();
    // console.log("After: ", userId);
  }, [userId]);

  async function getUserId() {
    try {
      const response = await axios.get(
        "http://localhost:3001/users/getUserId",
        { params: { email: loggedUser.email } }
      );
      const id = response.data.id;

      setUserId(id);
    } catch (err) {
      console.log(err);
    }
  }

  async function getWalletData() {
    try {
      const response = await axios.get(
        "http://localhost:3001/wallets/getWalletData",
        { params: { user_id: userId, wallet_id: 1 } }
      );
      const data = response.data;
      setWalletData(data);
    } catch (error) {
      console.log(error);
    }
  }

  function createChartData(input) {
    if (!input || input.length === 0) {
      return { labels: [], datasets: [] };
    }
    const chartData = {
      labels: input.map((data) => data.date),
      datasets: [
        {
          label: "Portfolio Value",
          data: input.map((data) => data.value),
        },
      ],
    };

    return chartData;
  }

  async function getPortfolioGrowth() {
    if (userId === 0) {
      return;
    }

    const growth = [];
    try {
      console.log("inside try, user id is ", userId);
      const response = await axios.get(
        "http://localhost:3001/portfolio/getPortfolioGrowth",
        { params: { user_id: userId } }
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
      const inputData = createChartData(growth);
      // console.log("Input data", inputData);
      setPortfolioGrowth(inputData);
      // console.log(portfolioGrowth);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPortfolioGrowth();
  }, [userId]);

  useEffect(() => {
    // console.log(portfolioGrowth);
  }, [portfolioGrowth]);

  return (
    <div className="Screen">
      <span>Dashboard</span>
      <div className="dashboard">
        <div className="header">
          <div className="item1">
            {console.log(portfolioGrowth)}
            {portfolioGrowth !== [] ? (
              <LineChart chartData={portfolioGrowth} />
            ) : null}
          </div>
          <div className="item2">{/* <DoughnutChart data={"H"} /> */}</div>
        </div>
        <div className="overview">
          {/* <LineChart chartData={inputChartData} /> */}
        </div>
      </div>
    </div>
  );
}
