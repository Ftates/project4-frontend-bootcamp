import React, { useRef } from 'react'

export const Dashboard = (props) => {

    const cubeRef = useRef()

    

  return (
    <>
        <mesh
        {...props}
        ref={cubeRef}
        >

        </mesh>
    </>
  )
}
