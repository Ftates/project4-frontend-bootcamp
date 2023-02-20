// import React from "react";
// import { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";

// export default function BarChart() {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     setChartData({
//       labels: [
//         "2020-12-12",
//         "2020-12-13",
//         "2020-12-14",
//         "2020-12-16",
//         "2020-12-17", // dates
//         "2020-12-18",
//         "2020-12-27",
//         "2020-12-29",
//         "2021-01-02",
//       ],
//       datasets: [
//         {
//           label: "Weight (lbs)",
//           data: [
//             196,
//             196,
//             197,
//             198,
//             195, // weights
//             196,
//             203,
//             200,
//             201,
//           ],
//           fill: false,
//           lineTension: 0,
//           backgroundColor: "#2085d8",
//           borderColor: "#2085d8",
//           borderCapStyle: "butt",
//           borderDash: [],
//           borderDashOffset: 0.0,
//           borderJoinStyle: "miter",
//           pointBorderColor: "#2085d8",
//           pointBackgroundColor: "#FFF",
//           pointBorderWidth: 1,
//           pointHoverRadius: 5,
//           pointHoverBackgroundColor: "#2f3640",
//           pointHoverBorderColor: "#2085d8",
//           pointHoverBorderWidth: 2,
//           pointRadius: 1,
//           pointHitRadius: 10,
//         },
//       ],
//     });
//   }, []);

//   return (
//     <div className="chart">
//       <Line
//         data={chartData}
//         options={{
//           responsive: true,
//           title: { text: "DAILY WEIGHT TREND", display: true },
//           scales: {
//             yAxes: [
//               {
//                 scaleLabel: {
//                   display: true,
//                   labelString: "Weight(lbs)",
//                 },
//               },
//             ],
//             xAxes: [
//               {
//                 scaleLabel: {
//                   display: true,
//                   labelString: "Dates",
//                 },
//               },
//             ],
//           },
//         }}
//       />
//     </div>
//   );
// }
