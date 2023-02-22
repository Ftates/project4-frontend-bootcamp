import React, { useEffect, useState } from 'react'
import './WalletList.css'
import AddWalletForm from './AddWalletForm'
import getAllWallet from '../../API_Services/getAllWallet'
import getWalletValue from '../../API_Services/getWalletValue'
import { useAuth } from '../../AuthContext/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const WalletList = () => {

  const { loggedUser, isAuth } = useAuth()
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(true)
  const [walletList, setWalletList] = useState([])
  const [walletValueList, setWalletValueList] = useState([])

  useEffect(() => {

    if(isAuth!==true){
      navigate("/")
    }
  
    async function retrieveWallets() {
      let arr = await getAllWallet(loggedUser.id)
      setWalletList(arr)
    }



    retrieveWallets()
  },[isAuth])

  useEffect(()=>{
    const retrieveData = async () => {
      const values = await Promise.all(walletList.map(async(e)=>{
        const res = await getWalletValue(e.id, loggedUser.id)
        return res
      }))
      setWalletValueList(values)
    }
    retrieveData()  
  },[walletList])


  
  return (
    <>
        <div className='ScreenWalletList'>
          <div className={`addWalletForm ${hidden === true ? "hidden" : "" }`}>
              <AddWalletForm onChildEvent={setHidden}/>
          </div>

          <div className='wallet-list-graphs-container'>
            Graphs here
          </div>

          <div className='currentWalletsContainer'>
            <div className='currentWalletsContainerHeader'>
              <span>Wallets</span>

              <button onClick={()=>{setHidden(!hidden)}}>add wallet +</button>
            </div>

            
            <div className='currentWalletsTable'>
              <div className='currentWalletsTableColumn'>
                <header className='wallet-data-header'>Wallet Name</header>
                {walletList.map((e)=>{
                  return(
                    <span key={e.id} className='wallet-data-point'>{e.name}</span>
                  )
                })}
              </div>
              <div className='currentWalletsTableColumn'>
                <header className='wallet-data-header'>Wallet Address</header>
                {walletList.map((e)=>{
                  return(
                    <span key={e.id} className='wallet-data-point'>{e.address}</span>
                  )
                })}
              </div>
              <div className='currentWalletsTableColumn'>
                <header className='wallet-data-header'>Wallet Type</header>
                {walletList.map((e)=>{
                  return(
                    <span key={e.id} className='wallet-data-point'>{e.type}</span>
                  )
                })}
              </div>
              <div className='currentWalletsTableColumn'>
                <header className='wallet-data-header'>Wallet Value</header>
                {walletValueList.length > 0 && walletValueList.map((e)=>{
                  return(
                    <span className='wallet-data-point'>{e}</span>
                  )
                })}

              </div>
            </div>
           
          </div>

            
        </div>
    </>
  )
}