// input array of arrays of objects

// [{coin: 'USD', amt: 6500, curr_price: 1, value: '6500.00'},
// {coin: 'ETH', amt: 1, curr_price: 1631.78, value: '1631'} ]

export default function formatWalletValue(array) {
  const value = [];
  for (let i = 0; i < array.length; i++) {
    const walletData = array[i];
    let sum = 0;
    walletData.forEach((coin) => {
      sum += parseInt(coin["value"]);
    });
    console.log("Each wallet sum is ", sum);
    value.push(sum);
  }
  console.log("Wallet Values in array", value);
  return value;
}
