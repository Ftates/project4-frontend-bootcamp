export default function formatWalletChartData(
  name_array,
  wallet_holdings_array
) {
  const result = [];
  for (let i = 0; i < wallet_holdings_array.length; i++) {
    const name = name_array[i]["name"];
    const data = { name: name, data: wallet_holdings_array[i] };
    console.log("New", data);
    result.push(data);
  }

  return result;
}
