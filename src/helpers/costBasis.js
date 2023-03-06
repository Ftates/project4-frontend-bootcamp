import React from "react";

// const data = [
//   {
//     id: 18,
//     userId: 6,
//     walletId: 8,
//     wallet: "Wallet 1",
//     date: "2023-03-02T16:00:00.000Z",
//     type: "Deposit",
//     coin: "USD",
//     quantity: "100",
//     price: "1",
//     createdAt: "2023-03-03T05:20:35.612Z",
//     updatedAt: "2023-03-03T05:20:35.612Z",
//   },
//   {
//     id: 24,
//     userId: 6,
//     walletId: 8,
//     wallet: "Wallet 1",
//     date: "2023-03-02T16:00:00.000Z",
//     type: "Buy",
//     coin: "ETH",
//     quantity: "0.35",
//     price: "1000",
//     createdAt: "2023-03-03T10:37:03.562Z",
//     updatedAt: "2023-03-03T10:37:03.562Z",
//   },
//   {
//     id: 25,
//     userId: 6,
//     walletId: 8,
//     wallet: "Wallet 1",
//     date: "2023-03-02T16:00:00.000Z",
//     type: "Buy",
//     coin: "BTC",
//     quantity: "0.01",
//     price: "15000",
//     createdAt: "2023-03-03T10:37:50.397Z",
//     updatedAt: "2023-03-03T10:37:50.397Z",
//   },
//   {
//     id: 26,
//     userId: 6,
//     walletId: 8,
//     wallet: "Wallet 1",
//     date: "2023-03-02T16:00:00.000Z",
//     type: "Buy",
//     coin: "BNB",
//     quantity: "0.5",
//     price: "300",
//     createdAt: "2023-03-03T10:38:37.494Z",
//     updatedAt: "2023-03-03T10:38:37.494Z",
//   },
//   {
//     id: 27,
//     userId: 6,
//     walletId: 8,
//     wallet: "Wallet 1",
//     date: "2023-03-02T16:00:00.000Z",
//     type: "Buy",
//     coin: "MATIC",
//     quantity: "100",
//     price: "0.5",
//     createdAt: "2023-03-03T11:03:06.955Z",
//     updatedAt: "2023-03-03T11:03:06.955Z",
//   },
//   {
//     id: 28,
//     userId: 6,
//     walletId: 9,
//     wallet: "Wallet 2",
//     date: "2023-03-04T16:00:00.000Z",
//     type: "Deposit",
//     coin: "USD",
//     quantity: "1000",
//     price: "1",
//     createdAt: "2023-03-05T10:09:12.703Z",
//     updatedAt: "2023-03-05T10:09:12.703Z",
//   },
//   {
//     id: 29,
//     userId: 6,
//     walletId: 9,
//     wallet: "Wallet 2",
//     date: "2023-03-04T16:00:00.000Z",
//     type: "Sell",
//     coin: "ETH",
//     quantity: "0.20",
//     price: "1500",
//     createdAt: "2023-03-05T10:09:33.793Z",
//     updatedAt: "2023-03-05T10:09:33.793Z",
//   },
//   {
//     id: 30,
//     userId: 6,
//     walletId: 9,
//     wallet: "Wallet 2",
//     date: "2023-03-04T16:00:00.000Z",
//     type: "Buy",
//     coin: "BNB",
//     quantity: "2.3",
//     price: "200",
//     createdAt: "2023-03-05T10:09:48.153Z",
//     updatedAt: "2023-03-05T10:09:48.153Z",
//   },
//   {
//     id: 31,
//     userId: 6,
//     walletId: 9,
//     wallet: "Wallet 2",
//     date: "2023-03-04T16:00:00.000Z",
//     type: "Sell",
//     coin: "BNB",
//     quantity: "1",
//     price: "100",
//     createdAt: "2023-03-05T10:09:48.153Z",
//     updatedAt: "2023-03-05T10:09:48.153Z",
//   },
// ];

export default function costBasis(data, holdings) {
  const array = [];

  for (const txn of data) {
    if (!(txn.coin === "USD")) {
      const coinInArray = array.some((item) => item.coin === txn.coin);
      let buy_value = 0;
      let sell_value = 0;
      let buy_amt = 0;
      let sell_amt = 0;

      if (txn.type === "Buy") {
        buy_value = parseFloat(txn.quantity) * parseFloat(txn.price);
        buy_amt = parseFloat(txn.quantity);
      } else if (txn.type === "Sell") {
        sell_value = parseFloat(txn.quantity) * parseFloat(txn.price);
        sell_amt = parseFloat(txn.quantity);
      }

      const payload = {
        coin: txn.coin,
        total_spend: buy_value,
        total_gain: sell_value,
        shares_bought: buy_amt,
        shares_sold: sell_amt,
      };

      if (!coinInArray) {
        array.push(payload);
      } else {
        const index = array.findIndex((item) => item.coin === txn.coin);
        array[index]["total_spend"] += buy_value;
        array[index]["total_gain"] += sell_value;
        array[index]["shares_bought"] += buy_amt;
        array[index]["shares_sold"] += sell_amt;
      }
    }
  }
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    const avg_cost =
      (element.total_spend - element.total_gain) /
      (element.shares_bought - element.shares_sold);

    element["avg_cost"] = avg_cost;
  }

  for (let i = 0; i < holdings.length; i++) {
    if (holdings[i]["coin"] === "USD") {
      holdings[i]["avg_cost"] = 1;
      holdings[i]["P&L"] = 0;
    } else {
      const index = array.findIndex(
        (item) => item.coin === holdings[i]["coin"]
      );
      const avg_cost = array[index]["avg_cost"];
      holdings[i]["avg_cost"] = avg_cost;
      holdings[i]["P&L"] =
        (parseFloat(holdings[i]["curr_price"]) - parseFloat(avg_cost)) *
        parseFloat(holdings[i]["amt"]);
    }
  }
  console.log("Overview ", holdings);
  return holdings;
}
