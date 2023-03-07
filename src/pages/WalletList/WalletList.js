import React, { useEffect, useState } from "react";
import "./WalletList.css";
import AddWalletForm from "./AddWalletForm";
import getAllWallet from "../../API_Services/getAllWallet";
import getWalletValue from "../../API_Services/getWalletValue";
import getAllWalletData from "../../API_Services/getAllWalletData";
import { useAuth } from "../../AuthContext/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoughnutChart from "../../components/Doughnut.js";

import formatWalletValue from "../../helpers/formatWalletValue";
import formatWalletChartData from "../../helpers/formatWalletChartData";

export const WalletList = (props) => {
  const { loggedUser, isAuth } = useAuth();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const [walletList, setWalletList] = useState([]);
  const [walletValueList, setWalletValueList] = useState([]);
  const [walletListHoldings, setWalletListHoldings] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [test, setTest] = useState([]);

  async function retrieveAllWalletInfo() {
    const result = await getAllWalletData(loggedUser.id);
    console.log("result: ", result.data);
    setTest(result.data);
  }

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/");
    }

    retrieveAllWalletInfo();
  }, [isAuth]);

  useEffect(() => {
    setTimeout(() => {
      props.onChildEvent("toDashboardPageView");
    }, 100);
  });

  useEffect(() => {
    function setData(array) {
      const wl = [];
      const wlh = [];
      for (let i = 0; i < array.length; i++) {
        wl.push(array[i]["wallet"]);
        wlh.push(array[i]["formatTxn"]);
      }
      console.log("WL", wl);
      console.log("WLH", wlh);
      setWalletList(wl);
      setWalletListHoldings(wlh);
    }

    setData(test);
  }, [test]);

  useEffect(() => {
    const totalValue = formatWalletValue(walletListHoldings);
    setWalletValueList(totalValue);
    const data = formatWalletChartData(walletList, walletListHoldings);
    setChartData(data);
  }, [walletListHoldings]);

  useEffect(() => {}, [walletValueList]);

  return (
    <>
      <div className="ScreenWalletList">
        <div className={`addWalletForm ${hidden === true ? "hidden" : ""}`}>
          <AddWalletForm
            onChildEvent={setHidden}
            refreshWallet={retrieveAllWalletInfo}
          />
        </div>

        <div className="wallet-list-graphs-container">
          {chartData.map((walletData) => (
            <DoughnutChart
              key={chartData.indexOf(walletData)}
              chartData={walletData}
            />
          ))}
        </div>

        <div className="currentWalletsContainer">
          <div className="currentWalletsContainerHeader">
            <span>Wallets</span>

            <p
              onClick={() => {
                setHidden(!hidden);
              }}
            >
              add wallet +
            </p>
          </div>

          <div className="currentWalletsTable">
            <div className="currentWalletsTableColumn">
              <header className="wallet-data-header">Wallet Name</header>
              {walletList.map((e) => {
                return (
                  <span key={e.id} className="wallet-data-point">
                    {e.name}
                  </span>
                );
              })}
            </div>
            <div className="currentWalletsTableColumn">
              <header className="wallet-data-header">Wallet Address</header>
              {walletList.map((e) => {
                return (
                  <span key={e.id} className="wallet-data-point">
                    {e.address}
                  </span>
                );
              })}
            </div>
            <div className="currentWalletsTableColumn">
              <header className="wallet-data-header">Wallet Type</header>
              {walletList.map((e) => {
                return (
                  <span key={e.id} className="wallet-data-point">
                    {e.type}
                  </span>
                );
              })}
            </div>
            <div className="currentWalletsTableColumn">
              <header className="wallet-data-header">Wallet Value</header>
              {walletValueList.length > 0 &&
                walletValueList.map((e) => {
                  return (
                    <span key={e} className="wallet-data-point">
                      {e} USD
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
