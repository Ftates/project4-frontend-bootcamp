import React, { useState } from "react";
import "./Login.css";
import userLogin from "../../API_Services/userLogin";
import { useAuth } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const { setAuthState, headers, isAuth, loggedUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // api call to login
    userLogin(email, password)
      .then((res) => {
        console.log("res", res);
        if (res === undefined) {
          throw "";
        } else {
          return res;
        }
      })
      .then(setAuthState)
      .then(() => {
        setErrorMessage("");
        navigate("/dashboard");
        props.onChildEvent("toDashboardPageView");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Invalid login information");
      });
  };

  return (
    <>
      <div className="Screen">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="formContainer">
            <h1 className="formContainerLabel">Login</h1>
            <div className="formInput">
              <h3 style={{ color: "whitesmoke" }}>Email:</h3>
              <input
                name="email"
                required
                type={"text"}
                placeholder="Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <h3 style={{ color: "whitesmoke" }}>Password:</h3>
              <input
                name="password"
                required
                type={"text"}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                minLength="8"
              />
              <button className="btn">Login</button>
            </div>
            {errorMessage === "" ? (
              <span></span>
            ) : (
              <span className="error-message">{`${errorMessage}`}</span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
