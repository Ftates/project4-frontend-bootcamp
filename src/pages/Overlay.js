import React, { useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import './Overlay.css'
import { useAuth } from '../AuthContext/AuthContext';


export const Overlay = (props) => {

  const {header, isAuth, loggedUser, setAuthState} = useAuth()
  
  const [menuOpenState,setMenuOpenState] = useState(false)
  const navigate = useNavigate()

  console.log("AVENGERS ASSEMBLE", header, isAuth, loggedUser)

  const handleLogout = () => {
    localStorage.removeItem("loggedUser")
    setAuthState({
      email: "",
      username: "",
      profileImg: null,
      biography: null,
      token: "",
      })
    navigate("/")
    props.onChildEvent("toDashboardPageView")
  }

  return (
    <>
      <header className='overlayBanner'>
          <div className='overlayLogo' onClick={()=>{navigate("/"); props.onChildEvent("toHomePageView")}}>
            <span>KoinFu</span>
          </div>
          <div className='DropdownMenuLogo'>
            <MenuIcon onClick={()=>{setMenuOpenState(!menuOpenState)}} sx={{color:"whiteSmoke", fontSize:"32px", cursor:"pointer"}}/>
           <div className={`DropdownMenu ${menuOpenState === true ? 'open' : ''}`}>
              {isAuth ? 
                <Paper sx={{backgroundColor:"transparent", color:"white"}}>
                  <MenuList>
                    <MenuItem onClick={()=>{navigate("/dashboard") ;props.onChildEvent("toDashboardPageView")}}>Dashboard</MenuItem>
                    <Divider sx={{backgroundColor:"white"}}/>
                    <MenuItem onClick={()=>{navigate("/walletList") ;props.onChildEvent("toDashboardPageView")}}>Wallet List</MenuItem>
                    <Divider sx={{backgroundColor:"white"}}/>
                    <MenuItem onClick={()=>{props.onChildEvent("toDashboardPageView")}}>Watch List</MenuItem>
                    <Divider sx={{backgroundColor:"white"}}/>
                    <MenuItem onClick={()=>{props.onChildEvent("toDashboardPageView")}}>Transaction Log</MenuItem>
                    <Divider sx={{backgroundColor:"white"}}/>
                    <MenuItem onClick={()=>{handleLogout()}}>Logout</MenuItem>
                  </MenuList>
                </Paper>
              :
                <Paper sx={{backgroundColor:"transparent", color:"white"}}>
                  <MenuList>
                    <MenuItem onClick={()=>{navigate("/login"); props.onChildEvent("toHomePageView")}}>Login</MenuItem>
                    <Divider sx={{backgroundColor:"white"}}/>
                    <MenuItem onClick={()=>{navigate("/register"); props.onChildEvent("toHomePageView")}}>Register</MenuItem>
                    {/* <Divider sx={{backgroundColor:"white"}}/>
                    <MenuItem>Logout</MenuItem> */}
                  </MenuList>
                </Paper>
              }
            </div>
            
          </div>
      </header>

      <main>
          <Outlet/>
      </main>
    </>
  )
}
