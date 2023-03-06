import React from "react";

export default function formatAllHoldings(array) {
  const arr = [];

  for (const elements of array) {
    const coinExist = arr.some((item) => item.coin === elements.coin);
    const coin = elements.coin;
    if (!coinExist) {
      arr.push(elements);
    } else {
      const indexInArr = arr.findIndex((item) => item.coin === elements.coin);

      arr[indexInArr]["amt"] += elements["amt"];

      arr[indexInArr]["value"] += elements["value"];
    }
  }
  console.log("Formatted All Holdings", arr);
  return arr;
}
