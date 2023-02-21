import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getWallet(user_id, address){
    try {
        const { data } = await axios({
            params: {user_id: user_id, address: address},
            url: "http://localhost:3001/wallets/getWalletId",
        })
        console.log("getWalletz",data)
    } catch (error) {
        console.log(error)
    }
}

export default getWallet