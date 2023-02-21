import React, { createContext, useContext, useEffect, useState } from 'react'
import getUser from '../API_Services/getUser';


  const loggedIn = JSON.parse(localStorage.getItem("loggedUser"));
  const authState = {
      headers: null,
      isAuth: false,
      loggedUser: {
      email: "",
      username: "",
      profileImg: null,
      biography: null,
      token: "",
      }
  }

const AuthContext = createContext()


export function useAuth() {
    return useContext(AuthContext);
  }

const AuthProvider = ({children}) => {
    // console.log("sassy lost child",children)
    console.log("loggedIn",loggedIn)
    const [ { headers, isAuth, loggedUser } , setAuthState] = useState(loggedIn === null ? authState : loggedIn)

    useEffect(() => {

        if (!headers) return;
        
        getUser({ headers })
          .then((res)=>{
            if(res.success === false){
              if(res.error.name === "TokenExpiredError"){
                setAuthState(authState)
                // send a pop up error (alert?) saying that token has expired
                alert("Token has expired! Please login again.")
                
              } 
              throw res
            } else return(res)
          })
          .then((loggedUser) => setAuthState((prevState)=> ({...prevState, loggedUser})))
          .catch((err)=>{console.log("smack catch!",err)});
      }, [headers, setAuthState])
    
    return (
        <AuthContext.Provider value={{headers, isAuth, loggedUser, setAuthState}}>
            {/* children is all the other BrowserRouter Routes */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

// export default function AuthProvider({children}) {
//     console.log("children",children)

//     const [user, setUser] = useState()

//     return (
//         <AuthContext.Provider value={{user, setUser}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA