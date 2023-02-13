import React from 'react'
import { Outlet } from 'react-router-dom'

export const Overlay = () => {


  

  return (
    <>
      <header style={{position:"absolute"}}>
          Overlay
      </header>

      <main>
          <Outlet/>
      </main>
    </>
  )
}
