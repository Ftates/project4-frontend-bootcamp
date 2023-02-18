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
              <div className='formContainer'>
                <h1 className='formContainerLabel'>Register</h1>
                <div className='formInput'>
                  <h3 style={{color:'whitesmoke'}}>Email:</h3>
                  <input 
                    name='email'
                    required
                    type={'text'}
                    placeholder='Your Email'
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                  <h3 style={{color:'whitesmoke'}}>Username:</h3>
                  <input
                    name='name'
                    required
                    type={'text'}
                    placeholder='username'
                    onChange={(e)=>{setName(e.target.value)}}/>
                  <h3 style={{color:'whitesmoke'}}>Password:</h3>
                  <input
                    name='password'
                    required
                    type={'text'}
                    placeholder='password'
                    onChange={(e)=>{setPassword(e.target.value)}}/>
                  <button className='btn'>Register</button>
                </div>
              </div>
            </form>
        </div>
    </>
  )
}
