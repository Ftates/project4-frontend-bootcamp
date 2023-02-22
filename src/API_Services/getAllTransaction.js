import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getAllTransactions(user_id) {
  try {
    const response = await axios({
      params: { user_id: user_id },
      method: "GET",
      url: "http://localhost:3001/transactions/getAllTransactions",
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default getAllTransactions;
