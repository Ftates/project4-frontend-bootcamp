import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Bitcoin } from './Meshes/Bitcoin'
import { CameraControls } from './CameraControls'

export const MainPageCanvas = (props) => {


  return (
    <Canvas style={{width:"100vw", height:"100vh", position:"absolute", zIndex:"-1"}}>
      

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
