import React, { useEffect, useState } from 'react'
import './WalletList.css'
import AddWalletForm from './AddWalletForm'
import getAllWallet from '../../API_Services/getAllWallet'
import { useAuth } from '../../AuthContext/AuthContext'
import axios from 'axios'

export const WalletList = () => {

  const { loggedUser, isAuth } = useAuth()
  const [hidden, setHidden] = useState(true)
  let walletList = ""

  useEffect(() => {
  
  async function retrieveWallets() {
    walletList = await getAllWallet(loggedUser.id)
    console.log("WALL-E ARRAY",walletList)
  }

  retrieveWallets()
  },[])


  return (
    <>
        <div className='Screen'>
          <div className={`addWalletForm ${hidden === true ? "hidden" : "" }`}>
            <AddWalletForm onChildEvent={setHidden}/>
          </div>

          <div className='currentWalletsContainer'>
            <div className='currentWalletsContainerHeader'>
              <span>Wallets</span>

              <button onClick={()=>{setHidden(!hidden)}}>add wallet +</button>
            </div>

            
            <div className='currentWalletsTable'>
              <div className='currentWalletsTableHeaders'>
                <span>Wallet Address</span>
                <span>Wallet Name</span>
                <span>Wallet Type</span>
                <span>Wallet Value</span>
              </div>
              {walletList !== "" ? 
                walletList.map((e) => {
                  console.log("alive ehck?",e)
                  return(
                    <>
                      <div style={{color:"white"}}>test {`${e.name}`}</div>
                    </>
                  )
                  
                })
              : ""}
            </div>
          </div>

            
        </div>
    </>
  )
}
