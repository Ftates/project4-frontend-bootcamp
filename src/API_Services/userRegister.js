import axios from "axios";
import errorHandler from "../helpers/errorHandler";

const userRegister = async ( name, email, password ) => {

    try {
        const {data} = await axios({
            data: {  name: name, email: email, password: password  },
            method: "POST",
            url: "http://localhost:3001/users/signup",
        })

        // console.log("axios call data:",data)
        // console.log("more data",data.success)
        if(data.success === false){
            // check for duplicate emails
            throw (data.error)
        }

        const { newuser } = data
        // supposed to only have auth token, isAuth, loggedUser, username
        console.log("data",data)

        const headers = { Authorization: `Token ${newuser.token}` };
        const loggedIn = { headers, isAuth: true, loggedUser: newuser };
        console.log("userregister loggedin:", loggedIn)
        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
        return loggedIn
    } catch (error) {
        console.log("Catch!",error)
        return error
        // errorHandler(error)
    }
}


export default userRegister