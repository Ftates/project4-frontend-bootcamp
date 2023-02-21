import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getAllWallet(user_id){
    try {
        const { data } = await axios({
            params: {user_id: user_id},
            method: "GET",
            url: "http://localhost:3001/wallets/getAllWallets",
        })
        
        return data.wallets
        
    } catch (error) {
        console.log(error)
    }
}

export default getAllWallet