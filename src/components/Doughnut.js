import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import "./Doughnut.css";

function DoughnutChart({ chartData }) {
  const [value, setValue] = useState(null);
  const [coin, setCoin] = useState(null);

  const input = chartData;
  const name = input["name"];
  const wallet = input["data"];

  // const wallet = [
  //   { coin: "USD", amt: 1000, value: 1000 },
  //   { coin: "ETH", amt: 2.5, value: 3000 },
  //   { coin: "BTC", amt: 1, value: 25000 },
  // ];
  // console.log("Wallet Data ", wallet);

  let defaultColors = [
    "#3366CC",
    "#DC3912",
    "#FF9900",
    "#109618",
    "#990099",
    "#3B3EAC",
    "#0099C6",
    "#DD4477",
    "#66AA00",
    "#B82E2E",
    "#316395",
    "#994499",
    "#22AA99",
    "#AAAA11",
    "#6633CC",
    "#E67300",
    "#8B0707",
    "#329262",
    "#5574A6",
    "#651067",
  ];
  const data = {
    labels: wallet.map((data) => data.coin),
    datasets: [
      {
        label: "Cold wallet",
        data: wallet.map((data) => data.value),
        backgroundColor: defaultColors,

        borderColor: "#434242",
      },
    ],
  };

  const options = {
    onHover: (e, wallet) => {
      if (wallet.length > 0) {
        const index = wallet[0].index;
        const amount = data.datasets[0].data[index];
        setValue(amount);
        setCoin(data.labels[index]);
      } else {
        setValue(null);
        setCoin(null);
      }
    },
  };

  return (
    <div className="circle">
      <Doughnut data={data} options={options} chart={ChartJS} />
      <span className="WalletName">{name}</span>
    </div>
  );
}

export default DoughnutChart;
