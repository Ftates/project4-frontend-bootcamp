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
  // selectedWallet's graph will be displayed
  const [selectedWallet, setSelectedWallet] = useState()

  useEffect(() => {
    if(isAuth!==true){
      navigate("/")
    }
  
    async function retrieveWallets() {
      console.log("loggeduserid",loggedUser.id)
      let arr = await getAllWallet(loggedUser.id)
      console.log("setwalletlist",arr)
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

  const handleHighlight = (e) => {
    console.log("selected text: ",e.target.innerText)
    // if innerText is = walletlist obj name thing, they match, so display that chart for that obj?
    console.log("walle-e list",walletList)
    walletList.forEach((obj)=>{
      if(e.target.innerText === obj.name){
        setSelectedWallet(obj)
      }
    })

    // highlighting, but i dunno how to unhighlight so im not putting it in yet
    // e.target.className = "wallet-data-point selected"
  }

  console.log("walle-e list",walletList)
  
  return (
    <>
        <div className='ScreenWalletList'>
          <div className={`addWalletForm ${hidden === true ? "hidden" : "" }`}>
              <AddWalletForm onChildEvent={setHidden} onFormSubmit={setWalletList} walletList={walletList}/>
          </div>

          <div className='wallet-list-graphs-container'>
            Graphs here {selectedWallet ? selectedWallet.name : ""}
          </div>

          <div className='currentWalletsContainer'>
            <div className='currentWalletsContainerHeader'>
              <span>Wallets</span>

              <button className='add-wallet-button' onClick={()=>{setHidden(!hidden)}}>add wallet +</button>
            </div>

            
            <div className='currentWalletsTable'>
              <div className='currentWalletsTableColumn'>
                <header className='wallet-data-header'>Wallet Name</header>
                {walletList.map((obj)=>{
                  return(
                    <span onClick={(e)=>{handleHighlight(e)}} key={obj.id} className='wallet-data-point'>{obj.name}</span>
                  )
                })}
              </div>
              <div className='currentWalletsTableColumn'>
                <header className='wallet-data-header'>Wallet Address</header>
                {walletList.map((obj)=>{
                  return(
                    <span key={obj.id} className='wallet-data-point'>{obj.address}</span>
                  )
                })}
              </div>
              <div className='currentWalletsTableColumn'>
                <header className='wallet-data-header'>Wallet Type</header>
                {walletList.map((obj)=>{
                  return(
                    <span key={obj.id} className='wallet-data-point'>{obj.type}</span>
                  )
                })}
              </div>
              <div className='currentWalletsTableColumn'>
                <header className='wallet-data-header'>Wallet Value</header>
                {walletValueList.length > 0 && walletValueList.map((walletvalue)=>{
                  return(
                    <span  className='wallet-data-point'>{walletvalue}</span>
                  )
                })}

              </div>
            </div>
           
          </div>

            
        </div>
    </>
  )
}
