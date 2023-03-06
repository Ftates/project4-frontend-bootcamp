import React from "react";
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import "./Dashboard.css";
import dateFormat from "../../helpers/dateFormat";

import LineChart from "../../components/LineChart";
import DoughnutChart from "./Doughnut-Dashboard";
import LatestTransaction from "../Dashboard/LatestTransaction";

import getAllWallet from "../../API_Services/getAllWallet";
import getWalletValue from "../../API_Services/getWalletValue";
import getAllTransactions from "../../API_Services/getAllTransaction";

export default function Dashboard(props) {
  const navigate = useNavigate();
  const { isAuth, loggedUser } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioGrowth, setPortfolioGrowth] = useState([]);
  const [walletList, setWalletList] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [txn, setTxn] = useState([]);

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/");
    } 
  }, [isAuth]);

  useEffect(() => {
    setTimeout(()=>{
      props.onChildEvent("toDashboardPageView")
    },100)
  })

  async function getPortfolio() {
    try {
      const response = await axios.get(
        "http://localhost:3001/wallets/getPortfolio",
        { params: { user_id: loggedUser.id } }
      );
      const data = response.data.data;
      setPortfolio(data);
    } catch (error) {
      console.log(error);
    }
  }

  // async function formatTransaction(userId) {
  //   const data = await getAllTransactions(userId);
  //   console.log(data);

  //   if (data.length < 5) {
  //     setTxn(data);
  //     return;
  //   } else {
  //     const latestFive = data[-5];
  //     console.log(latestFive);
  //     setTxn(latestFive);
  //   }
  // }

  useEffect(() => {
    getPortfolio();
    getAllWallet(loggedUser.id).then((response) => setWalletList(response));
  }, []);

  useEffect(() => {
    getAllTransactions(loggedUser.id).then((response) => {
      const data = response.data;
      if (data.length <= 5) {
        setTxn(data);
      } else {
        setTxn(data.slice(-5));
      }
    });
  }, []);

  useEffect(() => {
    console.log(txn);
  }, [txn]);

  /// TOUCH UP AGAIN AFTER PRESENTATION ///
  // useEffect(() => {
  //   formatWalletData(walletList, loggedUser.id);
  // }, []);

  // async function formatWalletData(walletList, userID) {
  //   const array = [];
  //   for (let i = 0; i < walletList.length; i++) {
  //     const walletID = walletList[i].id;
  //     const walletName = walletList[i].name;

  //     const data = await getWalletValue(walletID, userID);
  //     const element = {
  //       walletID: walletID,
  //       walletName: walletName,
  //       data: data,
  //     };

  //     array.push(element);
  //   }

  //   setOverviewData(array);
  // }

  // useEffect(() => {
  //   console.log("Overview DATA HERE", overviewData);
  // }, [overviewData]);

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
  }, []);

  return (
    <div className="Screen disable-scroll">
      <div className="dashboard">
        <div className="header">
          <div className="item1">
            Portfolio Value
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
          <LatestTransaction data={txn} />
        </div>
      </div>
    </div>
  );
}
