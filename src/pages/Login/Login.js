import React from "react";
import './Login.css'

export default function Login() {

  
  return (
    <>
    <div className="Screen">
      <form className="form" onSubmit={()=>{}}>
        <h2>Login</h2>

        <label>
          <span>Enter email:</span>
          <input
            // name="email"
            // required
            // type="email"
            // placeholder="Email"
            // value={email}
            // onChange={handleInput}
            // autoFocus
          />
        </label>

        <label>
          <span>Enter password:</span>
          <input
            // name="password"
            // required
            // type="password"
            // placeholder="Password"
            // value={password}
            // onChange={handleInput}
            // minLength="8"
          />
        </label>
        <button className="btn">Login</button>
      </form>
    </div>
      
    </>
  )
  
}
