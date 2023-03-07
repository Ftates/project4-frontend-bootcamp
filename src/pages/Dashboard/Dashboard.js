import React from "react";
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import "./Dashboard.css";
import dateFormat from "../../helpers/dateFormat";
import formatAllHoldings from "../../helpers/formatAllHoldings";
import costBasis from "../../helpers/costBasis";

import LineChart from "../../components/LineChart";
import DoughnutChart from "./Doughnut-Dashboard";
import LatestTransaction from "../Dashboard/LatestTransaction";
import OverviewTable from "./OverviewTable";

import getAllWallet from "../../API_Services/getAllWallet";
import getWalletValue from "../../API_Services/getWalletValue";
import getAllTransactions from "../../API_Services/getAllTransaction";
import getAllWalletData from "../../API_Services/getAllWalletData";

export default function Dashboard(props) {
  const navigate = useNavigate();
  const { isAuth, loggedUser } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioGrowth, setPortfolioGrowth] = useState([]);
  const [walletList, setWalletList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/");
    }
    getAllWalletData(loggedUser.id).then((response) => setData(response.data));
  }, [isAuth]);

  useEffect(() => {
    setTimeout(() => {
      props.onChildEvent("toDashboardPageView");
    }, 100);
  });

  useEffect(() => {
    console.log("DATA: ", data);
  }, [data]);

  const [alltxn, setAllTxn] = useState([]);
  const [formattxn, setFormatTxn] = useState([]);
  const [overview, setOverview] = useState([]);

  function formatTransaction(array) {
    // array = [{wallet: wallet1, alltxn: [{txn1,txn2,...}] , formatTxn: [{coin1}, {coin2}, ...]}]
    const txn_array = [];
    const formattxn_array = [];

    for (let i = 0; i < array.length; i++) {
      txn_array.push(...array[i]["alltxn"]);
      formattxn_array.push(...array[i]["formatTxn"]);
    }

    console.log("txn_array", txn_array);
    console.log("formattxn_array", formattxn_array);

    setAllTxn(txn_array);
    setFormatTxn(formattxn_array);
  }

  useEffect(() => {
    formatTransaction(data);
  }, [data]);

  useEffect(() => {
    setPortfolio(formatAllHoldings(formattxn));
  }, [formattxn]);

  useEffect(() => {
    setOverview(costBasis(alltxn, portfolio));
  }, [portfolio]);

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
    const growth = [];
    try {
      const response = await axios.get(
        "http://localhost:3001/portfolio/getPortfolioGrowth",
        { params: { user_id: loggedUser.id } }
      );
      console.log("Response: ", response);
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
      console.log("Input data ", inputData);
      setPortfolioGrowth(inputData);
      console.log("Portfolio Growth ", portfolioGrowth);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPortfolioGrowth();
  }, []);

  return (
    <div className="Screen disable-scroll">
      <div className="dashboard">
        <div className="header">
          <div className="item1">
            Performance
            {portfolioGrowth !== [] ? (
              <LineChart chartData={portfolioGrowth} />
            ) : null}
          </div>
          <div className="item2">
            Holdings
            <DoughnutChart chartData={portfolio} />
          </div>
        </div>
        <div className="overview">
          Overview
          <OverviewTable data={overview} />
        </div>
      </div>
    </div>
  );
}
