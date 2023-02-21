import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext/AuthContext'
import './Dashboard.css'

export const Dashboard = () => {

  const navigate = useNavigate()
  const { isAuth } = useAuth()



  useEffect(()=>{
    if(isAuth!==true){
      navigate("/")
    }
  },[isAuth])

  return (
    <>
      <div className='Screen'>
        Dashboard page
        <div>
          
        </div>
      </div>
    </>
  )
}
