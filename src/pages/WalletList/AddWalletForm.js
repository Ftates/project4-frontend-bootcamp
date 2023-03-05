import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import addWallet from "../../API_Services/addWallet.js";
import { useAuth } from "../../AuthContext/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { WalletList } from "./WalletList.js";

const AddWalletForm = (props) => {
  //   console.log("Props: ", props);
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  const [walletName, setWalletName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState("exchange-wallet");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", walletName, walletAddress, walletType);
    addWallet(walletName, walletAddress, walletType, loggedUser.id).then(() => {
      props.onChildEvent(true);
      //   console.log("reach here?");

      //   console.log("reach here 2nd?");
      //   console.log(props.walletList);
    });
  };

  return (
    <>
      <div className="formContainerBackground"></div>
      <div className="formContainer">
        <span
          className="formClose"
          onClick={() => {
            props.onChildEvent(true);
          }}
        >
          <CloseIcon />
        </span>
        <form
          className="formInput"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3>Wallet Name:</h3>
          <input
            name="name"
            type={"text"}
            required
            placeholder="Wallet Name"
            onChange={(e) => {
              setWalletName(e.target.value);
            }}
          />
          <h3>Address:</h3>
          <input
            name="address"
            type={"text"}
            required
            placeholder="Wallet Address"
            onChange={(e) => {
              setWalletAddress(e.target.value);
            }}
          />
          <h3>Type:</h3>
          <select
            name="type"
            defaultValue={"exchange-wallet"}
            onChange={(e) => {
              setWalletType(e.target.value);
            }}
          >
            <option value={"exchange-wallet"}>Exchange wallet</option>
            <option value={"hot-wallet"}>Self-custodial hot wallet</option>
            <option value={"cold-wallet"}>Ledger</option>
          </select>

          <button className="btn">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddWalletForm;
