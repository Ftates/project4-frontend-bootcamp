// input array of arrays of objects

// [{coin: 'USD', amt: 6500, curr_price: 1, value: '6500.00'},
// {coin: 'ETH', amt: 1, curr_price: 1631.78, value: '1631'} ]

// output : [36837, 8131] in integers

export default function formatWalletValue(array) {
  const value = [];
  for (let i = 0; i < array.length; i++) {
    const walletData = array[i];
    let sum = 0;
    walletData.forEach((coin) => {
      sum += parseInt(coin["value"]);
    });
    value.push(sum);
  }
  return value;
}
