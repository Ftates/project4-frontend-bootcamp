import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getWalletValue(wallet_id, user_id) {
  try {
    let totalValue = 0;
    const { data } = await axios({
      params: { wallet_id: wallet_id, user_id: user_id },
      method: "GET",
      url: "http://localhost:3001/wallets/getWalletData",
    });
    // data.forEach((wallet) => {
    //   totalValue += wallet.value;
    // });
    // console.log("Total Value ", totalValue)
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default getWalletValue;
