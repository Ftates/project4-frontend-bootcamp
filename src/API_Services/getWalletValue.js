import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getWalletValue(wallet_id, user_id){

    console.log("ids,",wallet_id,user_id)
    try {
        const { data } = await axios({
            params: {wallet_id: wallet_id, user_id: user_id},
            method: "GET",
            url: "http://localhost:3001/wallets/getWalletData",
        })
        console.log("RETURN", data)
        return data[0].amt
    } catch (error) {
        console.log(error)
    }
}

export default getWalletValue