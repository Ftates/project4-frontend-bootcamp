import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/sidebar";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import DoughnutChart from "../../components/Doughnut";

export default function Dashboard() {
  const [txnData, setTxnData] = useState([]);
  const [walletData, setWalletData] = useState([]);

  async function getTxnData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/transactions/getAllTransactions",
        { params: { user_id: 1 } }
      );
      const data = response.data.data;
      setTxnData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getWalletData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/wallets/getWalletData",
        { params: { user_id: 1, wallet_id: 1 } }
      );
      const data = response.data;
      setWalletData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // getTxnData();
    // getWalletData();
  }, []);

  useEffect(() => {
    console.log("Txn Data", txnData);
  }, [txnData]);

  useEffect(() => {
    console.log("Wallet data", walletData);
  }, [walletData]);

  const UserData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
      },
    ],
  });

  return (
    <div className="Screen">
      <span>Dashboard</span>
      <div className="dashboard">
        <div className="header">
          <div className="item1">
            <LineChart chartData={userData} />
          </div>
          <div className="item2">
            <DoughnutChart />
          </div>
        </div>
        <div className="overview">
          <LineChart chartData={userData} />
        </div>
      </div>
    </div>
  );
}
