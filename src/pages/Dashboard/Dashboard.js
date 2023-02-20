import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/sidebar";
import BarChart from "../../components/BarChart";

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
    getTxnData();
    getWalletData();
  }, []);

  useEffect(() => {
    console.log("Txn Data", txnData);
  }, [txnData]);

  useEffect(() => {
    console.log("Wallet data", walletData);
  }, [walletData]);

  return (
    <div className="Screen">
      <div className="sidebar">
        <Sidebar />
      </div>

      <span className="header">Dashboard</span>
      <BarChart />
    </div>
  );
}
