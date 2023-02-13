import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
// import {THREE} from 'three'

export const CameraControls = () => {

    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const { camera, gl, scene } = useThree()
    // const raycaster = useRef(new THREE.Raycaster())
    // console.log("usethree",test)

    useEffect(() => {
        function onMouseMove(event) {
          setMouse({ x: event.clientX, y: event.clientY })
        }
    
        window.addEventListener('mousemove', onMouseMove)
    
        return () => {
          window.removeEventListener('mousemove', onMouseMove)
        }
      }, [])

        // center point: {x: 0, y: 2.755455298081545e-16, z: 4.5}

        // top left : {x: -2.794854924097088, y: 2.0716089624840848, z: 2.8543339432879686}

        // bot left : {x: -2.6066528491510286 y: -1.90845882996942 z: 3.132594103666249}

        // top right : {x: 2.0599678040228686 y: 3.77985570107277 z: 1.3111916432989272}

        // bot right : {x: 3.9806874717907896 y: 0.5143325175436909 z: 2.034598071690093}

    useFrame(({ mouse }) => {
        // mouse (-1 to 1 max (x,y) coords)
        // console.log("mouse",mouse)

        // take max coords you want the camera to move, then multiply by mouse coords, ensuring the camera does not move outside of those coords?
        
        


    // raycaster.current.setFromCamera(mouse, camera)
    // const intersections = raycaster.current.intersectObjects(scene.children)
    // if (intersections.length > 0) {
    //     camera.position.x += (intersections[0].point.x - camera.position.x) * 0.05
    //     camera.position.y += (-intersections[0].point.y - camera.position.y) * 0.05
    // }
    })

  return (
    null
  )
}
