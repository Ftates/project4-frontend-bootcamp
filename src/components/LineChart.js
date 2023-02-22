import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  if (chartData.length === 0) {
    // console.log("Empty");
    return (
      <Line
        data={{
          labels: ["Current Date"],
          datasets: [{ label: "Portfolio Value", data: [0] }],
        }}
      />
    );
  } else {
    // console.log("Nt empty");
    // console.log(chartData.length);
    return <Line data={chartData} />;
  }
}

export default LineChart;
