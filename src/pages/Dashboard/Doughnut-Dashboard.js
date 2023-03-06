import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartJS from "chart.js/auto";

function DoughnutChart({ chartData }) {
  const [value, setValue] = useState(null);
  const [coin, setCoin] = useState(null);

  const wallet = chartData;

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

  return (
    <div>
      {/* <div>{value && `${coin} and $${value}`}</div> */}
      <Doughnut data={data} chart={ChartJS} />
    </div>
  );
}

export default DoughnutChart;
