import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartJS from "chart.js/auto";

function DoughnutChart({ chartData }) {
  const [value, setValue] = useState(null);
  const [coin, setCoin] = useState(null);

  const wallet = [
    { coin: "USD", amt: 1000, value: 1000 },
    { coin: "ETH", amt: 2.5, value: 3000 },
    { coin: "BTC", amt: 1, value: 25000 },
  ];

  const data = {
    labels: wallet.map((data) => data.coin),
    datasets: [
      {
        label: "Cold wallet",
        data: wallet.map((data) => data.value),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],

        borderColor: "#434242",
      },
    ],
  };

  const options = {
    onHover: (e, chartdata) => {
      if (chartdata.length > 0) {
        const index = chartdata[0].index;
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
    <div>
      <div>{value && `${coin} and $${value}`}</div>
      <Doughnut data={data} options={options} chart={ChartJS} />
    </div>
  );
}

export default DoughnutChart;
