import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getUser({ headers }) {
  try {
    const { data } = await axios({
      headers,
      url: "http://localhost:3001/users/test",
    });
    if(data.success === false){
      throw(data)
    }

    return data.user;
  } catch (error) {
    console.log("Catchi!",error)
    return error
    // errorHandler(error);
  }
}

export default getUser;
