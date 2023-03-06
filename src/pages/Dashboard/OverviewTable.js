import React from "react";
import "./OverviewTable.css";

export default function OverviewTable(props) {
  const overviewData = props.data;

  return (
    <table>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Amount</th>
          <th>Current Price</th>
          <th>Avg Cost</th>
          <th>Market Value</th>
          <th>P&amp;L</th>
        </tr>
      </thead>
      <tbody>
        {overviewData.map((item, index) => (
          <tr key={index}>
            <td>{item.coin}</td>
            <td>{item.amt.toFixed(2)}</td>
            <td>{item.curr_price}</td>
            <td>{item.avg_cost.toFixed(2)}</td>
            <td>{item.value.toFixed(2)}</td>
            {item.coin === "USD" ? (
              <td> - </td>
            ) : (
              <td style={{ color: item["P&L"] > 0 ? "green" : "red" }}>
                {item["P&L"].toFixed(2)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
