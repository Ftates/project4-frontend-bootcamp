import React, { createContext, useContext, useState } from 'react'
import userRegister from '../../API_Services/userRegister.js'
import { useAuth } from '../../AuthContext/AuthContext.js'

export const Register = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  // this one
  const { setAuthState } = useAuth();

  // would this be the same as the setAuthState on top
  // const testAuthState  =  Authcontext.Provider.setAuthState 
  

  const handleSubmit = (e) => {
    e.preventDefault()
    // call api

    console.log("wtf is setauthstate:",setAuthState)
    // userRegister is an axios call to backend
    userRegister(name, email, password)
    //userRegister must return an object that can be passed into setAuthState in the correct format so it can destucture properly and not die
      .then(setAuthState)
      .then(console.log("done"))
      .catch((err)=>{console.log("WORLD CLASS CATCH!",err)})
  }

  return (
    <>
        <div className='Screen'>
            <div className='errorBox'></div>

            <form onSubmit={(e)=>{handleSubmit(e)}}>
              <h2 style={{color:'whitesmoke'}}>Register:</h2>

              <label style={{color:'whitesmoke'}}>Email:</label>
              <input 
                name='email'
                required
                type={'text'}
                placeholder='Your Email'
                onChange={(e)=>{setEmail(e.target.value)}}/>
              <label style={{color:'whitesmoke'}}>Username:</label>
              <input
                name='name'
                required
                type={'text'}
                placeholder='username'
                onChange={(e)=>{setName(e.target.value)}}/>
              <label style={{color:'whitesmoke'}}>Password:</label>
              <input
                name='password'
                required
                type={'text'}
                placeholder='password'
                onChange={(e)=>{setPassword(e.target.value)}}/>
              <input type={'submit'}></input>
            </form>
        </div>
    </>
  )
}
