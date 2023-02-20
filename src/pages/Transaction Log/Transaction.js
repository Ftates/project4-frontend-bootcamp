import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Transaction.css";

import TransactionTable from "../../components/TransactionTable";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function Transactions() {
  const [newTxn, setNewTxn] = useState({});

  const [userWallets, setUserWallets] = useState([]);

  async function getUserWallet() {
    const response = await axios.get(
      "http://localhost:3001/wallets/getAllWallets",
      { params: { user_id: 1 } }
    );
    const data = response.data.wallets;
    setUserWallets(data);
  }

  useEffect(() => {
    getUserWallet();
  }, []);

  // useEffect(() => {
  //   console.log(userWallets);
  // }, [userWallets]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="Screen">
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          + New Transaction
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogContent>
            <form>
              <label>Date</label>

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Age
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native",
                    }}
                  >
                    {userWallets.map((data) => {
                      <option value={data.name}>${data.name}</option>;
                    })}
                  </NativeSelect>
                </FormControl>
              </Box>
              <label>Type</label>
              <label>Coin</label>
              <label>Quantity</label>
              <label>Price</label>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="table">
        <TransactionTable />
      </div>
    </div>
  );
}
