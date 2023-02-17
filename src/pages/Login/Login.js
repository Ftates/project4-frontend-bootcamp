import React, { useState } from "react";
import './Login.css'
import userLogin from "../../API_Services/userLogin";
import { useAuth } from "../../AuthContext/AuthContext";

export default function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState("")

  const {setAuthState} = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    // api call to login
    userLogin(email,password)
      .then(setAuthState)
  }

  
  return (
    <>
      <div className="Screen">
        {errorMessage === "" ? <span></span> : <span>{`${errorMessage}`}</span>}
        <form className="form" onSubmit={(e)=>{handleSubmit(e)}}>
          <h2 style={{color:'whitesmoke'}}>Login</h2>

          <label>
            <span style={{color:'whitesmoke'}}>Enter email:</span>
            <input
                name='email'
                required
                type={'text'}
                placeholder='Your Email'
                onChange={(e)=>{setEmail(e.target.value)}}
            />
          </label>

          <label>
            <span style={{color:'whitesmoke'}}>Enter password:</span>
            <input
                name='password'
                required
                type={'text'}
                placeholder='password'
                onChange={(e)=>{setPassword(e.target.value)}}
                minLength="8" 
            />
          </label>
          <button className="btn">Login</button>
        </form>
      </div>
      
    </>
  )
  
}