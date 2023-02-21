import axios from "axios";
import errorHandler from "../helpers/errorHandler";


async function addWallet(name, address, type, user_id) {
    try {
        const {data} = await axios({
            data: {name, address, type, user_id},
            method: "POST",
            url: "http://localhost:3001/wallets/addWallet"
        })
        console.log("addWallet return data:", data)
    } catch (error) {
        console.log(error)
    }
}

export default addWallet