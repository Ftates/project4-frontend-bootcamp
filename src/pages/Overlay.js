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


export const Overlay = () => {


  const [menuOpenState,setMenuOpenState] = useState(false)
  const anchorRef = useRef(null);
  const navigate = useNavigate()

  console.log(menuOpenState)

  return (
    <>
      <header className='overlayBanner'>
          <div className='overlayLogo'>
            KoinFu
          </div>
          <div className='DropdownMenuLogo'>
            <MenuIcon onClick={()=>{setMenuOpenState(!menuOpenState)}} sx={{color:"whiteSmoke", fontSize:"32px", cursor:"pointer"}}/>
           <div className={`DropdownMenu ${menuOpenState === true ? 'open' : ''}`}>
              <Paper sx={{backgroundColor:"transparent", color:"white"}}>
                  <MenuList>
                    <MenuItem onClick={()=>{navigate("/login")}}>Login</MenuItem>
                    <Divider sx={{backgroundColor:"white"}}/>
                    <MenuItem onClick={()=>{navigate("/register")}}>Register</MenuItem>
                    {/* <Divider sx={{backgroundColor:"white"}}/>
                    <MenuItem>Logout</MenuItem> */}
                  </MenuList>
              </Paper>
            </div>
            
          </div>
      </header>

      <main>
          <Outlet/>
      </main>
    </>
  )
}
