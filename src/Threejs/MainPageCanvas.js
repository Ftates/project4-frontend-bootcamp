import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import { Bitcoin } from './Meshes/Bitcoin'
import { CameraControls } from './CameraControls'

export const MainPageCanvas = (props) => {

  const [display3D, setDisplay3D] = useState('block')

  const toggleDisplay = () => {
    if(display3D === 'block'){
      setDisplay3D('none')
    }
    if(display3D === 'none'){
      setDisplay3D('block')
    }
  }

  

  return (
    <Canvas style={{width:"100vw", height:"100vh", position:"absolute", zIndex:"-1", display:`${display3D}`}}>
      

      {/* <CameraControls/> */}
      {/* <ambientLight />   */}
      <pointLight color={"grey"} intensity={5} position={[-5, 5, 5]} />
      <pointLight color={"grey"} intensity={5} position={[5, 5, -5]} />
      <pointLight color={"grey"} intensity={1} position={[0, 0, 0]} />
      <Bitcoin position={[0,0,0]} onChildEvent={props.onChildEvent} callNavigate={props.callNavigate}/>
      {/* <OrbitControls/> */}
    

    </Canvas>
  )
}
