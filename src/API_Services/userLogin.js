import axios from "axios";
import errorHandler from "../helpers/errorHandler";

const userLogin = async (email, password) => {

    try {
        const { data } = await axios ({
            data: {email: email, password: password},
            method: "POST",
            url: "http://localhost:3001/users/login"
        })

        if(data.success === false){
            // check for duplicate emails
            throw (data.error)
        }

        const { user } = data;
        const headers = { Authorization: `Token ${user.token}` };
    

        delete user.password
        const loggedIn = { headers, isAuth: true, loggedUser: user , username: user.username};
    
        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

        return loggedIn
    } catch (error) {
        errorHandler(error)
    }
}

export default userLogin