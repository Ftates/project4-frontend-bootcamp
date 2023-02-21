import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { BoxGeometry, MeshBasicMaterial, MeshPhongMaterial, Object3D } from 'three'
import bitcoinglb from '../Resources/Bitcoin.glb'
import coinwordsglb from '../Resources/Coinwords.glb'
import dashboardglb from '../Resources/CoinDashboard.glb'


export const Bitcoin = (props) => {

    // mouse position tracker for parallax effect
    const [mouse, setMouse] = useState([0, 0])
    const [cameraScene, setCameraScene] = useState("welcomeScene")
    const [onHover, setOnHover] = useState(false)

    const [word0Hover, setWord0Hover] = useState(false)
    const [word1Hover, setWord1Hover] = useState(false)
    const [word2Hover, setWord2Hover] = useState(false)
    const [word3Hover, setWord3Hover] = useState(false)
    const [word4Hover, setWord4Hover] = useState(false)
    const [word5Hover, setWord5Hover] = useState(false)

    //declare refs here
    const {camera,gl} = useThree()
    const cameraRef = useRef()
    const meshRef = useRef()
    const wordsRef = useRef()
    const backgroundRef = useRef()

    const word0Ref = useRef()
    const word1Ref = useRef()
    const word2Ref = useRef()
    const word3Ref = useRef()
    const word4Ref = useRef()
    const word5Ref = useRef()
    cameraRef.current = camera

    const material = new MeshPhongMaterial({
      color: 0x22A39F, // set the color of the material
      transparent: false, // make the material opaque
      lightMapIntensity: 0,
      reflectivity: 0,
      refractionRatio: 0,
    });

    //debouncing to prevent multiple animations being called 
    // let lastScrollTime = 0;
    const [lastScrollTime, setLastScrollTime] = useState(0)

    // console.log("camera",cameraRef.current)

    useEffect(()=>{
      cameraRef.current.position.z = 4.5
    },[])

    useEffect(() => {
        const glbLoader = new GLTFLoader()
        glbLoader.load(
          // Path to resource
          bitcoinglb,
          // Function called once loading is complete
          (obj) => {
            const mesh = new Object3D()
            mesh.add(obj.scene)
            // console.log("meshref",meshRef)
            meshRef.current.add(mesh)
          },
          // called while loading is progressing
          (xhr) => {
          },
          // called on error
          (error) => {
            console.log("an error has occured:", error)
          }
        )

        glbLoader.load(
          coinwordsglb,
          (obj) => {
            console.log("load obj words,",obj)

            //testing
            // const mesh = new Object3D()
            // mesh.add(obj.scene)
            // after this line any lines below it dont run?
            // and if this line doesnt run the obj only has 3 children????
            // console.log("wordsref", wordsRef)
            // wordsRef.current.add(mesh)
            // console.log("balls")

            // console.log("loading 2 obj", obj)
            const mesh0 = new Object3D()
            const mesh1 = new Object3D()
            const mesh2 = new Object3D()
            const mesh3 = new Object3D()
            const mesh4 = new Object3D()
            const mesh5 = new Object3D()

            // they are all 0 cause apparently .add removes from the original obj.scene.children array
            mesh0.add(obj.scene.children[0])
            mesh1.add(obj.scene.children[0])
            mesh2.add(obj.scene.children[0])
            mesh3.add(obj.scene.children[0])
            mesh4.add(obj.scene.children[0])
            mesh5.add(obj.scene.children[0])

            console.log("0",word0Ref)
            console.log("1",word1Ref)
            console.log("2",word2Ref)
            console.log("3",word3Ref)
            console.log("4",word4Ref)
            console.log("5",word5Ref)

            word0Ref.current.add(mesh0)
            word1Ref.current.add(mesh1)
            word2Ref.current.add(mesh2)
            word3Ref.current.add(mesh3)
            word4Ref.current.add(mesh4)
            word5Ref.current.add(mesh5)

            console.log("balls")
          },
          (xhr) => {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          },
          // called on error
          (error) => {
            console.log("an error has occured:", error)
          }
        )

        glbLoader.load(
          dashboardglb,
          (obj) => {
            const mesh = new Object3D()
            mesh.add(obj.scene)
            backgroundRef.current.add(mesh)
          },
          (xhr) => {

          },
          (error) => {
            console.log(error)
          }
        )

        
    },[])

    const animateMeshToScrollView = () => {
      const now = new Date().getTime();
      const timeSinceLastScroll = now - lastScrollTime;
      if (timeSinceLastScroll > 1000) {
        console.log("animating...")
        setCameraScene("scrollScene")
        // console.log(camera,gl,meshRef)
        // console.log("ref",cameraRef)
        // console.log("quaternion", cameraRef.current.quaternion)
        // console.log("position", cameraRef.current.position)
        // console.log("rotation", cameraRef.current.rotation)
  
        const timeline = gsap.timeline()
        timeline
          .add('start')
          .to(cameraRef.current.position, {
            duration: 1,
            x: 0.9550328590896507,
            y: 0.605423909633123,
            z: 0.099693824441519,
            // onComplete: ()=>{
            //   cameraRef.current.updateMatrix()
            // }
          },'start')
          // euler's angle
          // .to(cameraRef.current.rotation, {
          //   duration: 2,
          //   x:-1.534160293852791,
          //   y:1.0489746617392068,
          //   z:1.5285422203554844,
          // },'start')
          // quaternions
          .to(cameraRef.current.quaternion, {
            duration: 1,
            w:0.6903654950637428,
            x:-0.18418291110660803,
            y:0.6759792125033134,
            z:0.180344788516577,
          },'start')
          setLastScrollTime(now)
        }
      }

      const animateMeshToScrollView1 = () => {
        const now = new Date().getTime();
        const timeSinceLastScroll = now - lastScrollTime;
        if (timeSinceLastScroll > 1000) {
          console.log("animating...")
          setCameraScene("scrollScene")

          const timeline = gsap.timeline()
          timeline
            .add('start')
            .to(cameraRef.current.position, {
              duration: 1,
              x: 1.1080830959744983,
              y: 0.1477029659568294,
              z: 0.07526258574842828,
            },'start')
            .to(cameraRef.current.quaternion, {
              duration: 1,
              w:0.7038118042296084,
              x:-0.04156319863245632,
              y:0.7079361831720004,
              z:0.04180676144312243,
            },'start')
            setLastScrollTime(now)
        }
      }

      const animateMeshToScrollView2 = () => {
        const now = new Date().getTime();
        const timeSinceLastScroll = now - lastScrollTime;
        if (timeSinceLastScroll > 1000) {
          console.log("animating...")
          setCameraScene("scrollScene")

          const timeline = gsap.timeline()
          timeline
            .add('start')
            .to(cameraRef.current.position, {
              duration: 1,
              x: 1.0631727166659983,
              y: -0.3861901856289226,
              z: 0.09675058717801176,
            },'start')
            .to(cameraRef.current.quaternion, {
              duration: 1,
              w:0.6958206550344738,
              x:0.14355926990562098,
              y:0.6892061039740096,
              z:-0.1421945789983833,
            },'start')
            setLastScrollTime(now)
        }
      }

      const animateMeshToScrollView5 = () => {
        const now = new Date().getTime();
        const timeSinceLastScroll = now - lastScrollTime;
        if (timeSinceLastScroll > 1000) {
          console.log("animating...")
          setCameraScene("scrollScene")

          const timeline = gsap.timeline()
          timeline
            .add('start')
            .to(cameraRef.current.position, {
              duration: 1,
              x: -0.9664162888004877,
              y: 0.550278690416551,
              z: -0.17696863394040857,
            },'start')
            .to(cameraRef.current.quaternion, {
              duration: 1,
              w:0.6700598339067778,
              x:-0.1718217360928268,
              y:-0.6995153609652341,
              z:-0.17937494185238492,
            },'start')
            setLastScrollTime(now)
        }
      }

      const animateMeshToScrollView4 = () => {
        const now = new Date().getTime();
        const timeSinceLastScroll = now - lastScrollTime;
        if (timeSinceLastScroll > 1000) {
          console.log("animating...")
          setCameraScene("scrollScene")

          const timeline = gsap.timeline()
          timeline
            .add('start')
            .to(cameraRef.current.position, {
              duration: 1,
              x: -1.1095245345172353,
              y: 0.08680003730357905,
              z: -0.1824764383927543,
            },'start')
            .to(cameraRef.current.quaternion, {
              duration: 1,
              w:0.6888704081664222,
              x:-0.024397930252045005,
              y:-0.7240198526896616,
              z:-0.025642828691155976,
            },'start')
            setLastScrollTime(now)
        }
      }

      const animateMeshToScrollView3 = () => {
        const now = new Date().getTime();
        const timeSinceLastScroll = now - lastScrollTime;
        if (timeSinceLastScroll > 1000) {
          console.log("animating...")
          setCameraScene("scrollScene")
          const timeline = gsap.timeline()
          timeline
            .add('start')
            .to(cameraRef.current.position, {
              duration: 1,
              x: -0.9879402984275973,
              y: -0.5224404720306913,
              z: -0.194520693544385,
            },'start')
            .to(cameraRef.current.quaternion, {
              duration: 1,
              w:0.6567780230555558,
              x:0.18078685306075581,
              y:-0.7058395576792638,
              z:0.19429169052423656,
            },'start')
            setLastScrollTime(now)
        }
      }
      

      const animateMeshView1 = () => {
        console.log("changing to view 1...")
        const timeline = new gsap.timeline()
        timeline
            .add('start')
            // .to()
      }
    

      const animateMeshToLearnMoreView = () => {
        const now = new Date().getTime();
        const timeSinceLastScroll = now - lastScrollTime;
        if (timeSinceLastScroll > 1000) {
          console.log("changing to start view...")
          setCameraScene("learnMoreScene")
          const timeline = new gsap.timeline()
          timeline
              .add('start')
              .to(cameraRef.current.position, {
                duration: 1,
                x: -0.14008239257964344,
                y: -0.37301634680916906,
                z: 1.479752837735031,
              }, 'start')
              .to(cameraRef.current.quaternion, {
                duration: 1,
                w: 0.9766088138071856,
                x: 0.09219955892151643,
                y: -0.19339368071350138,
                z: 0.01825788566302432,
                // onComplete: ()=>{setCameraScene("learnMoreScene")}

              }, 'start')
              setLastScrollTime(now)
          }
      }

      const animateMeshToLearnMoreView2 = () => {
        //debouncing to prevent multiple scrolls from people who just want to see the world burn
        const now = new Date().getTime();
        const timeSinceLastScroll = now - lastScrollTime;
        if (timeSinceLastScroll > 1000) {
          console.log("changing to start view2...")
          setCameraScene("learnMoreScene2")
          const timeline = new gsap.timeline({smoothChildTiming:true})
          timeline
              // .add('start')
              // .add('secondposition',)
              .add('endposition',)
              // animations are not smooth, removed for now cause it looks better without it
              // .to(cameraRef.current.position, {
              //   duration: 1,
              //   x: 1.7177533232652777,
              //   y: 0.6030475959133379,
              //   z: 0.510861201557612,
              // }, 'start')
              // .to(cameraRef.current.quaternion, {
              //   duration: 1,
              //   w: 0.8139703818842957,
              //   x: -0.22340206115010208,
              //   y: 0.5171082348744372,
              //   z: 0.14192536740859166,
              // }, 'start')
              // .to(cameraRef.current.position, {
              //   duration: 1,
              //   x: 1.2764257996893764,
              //   y: 0.39814719524571446,
              //   z: -0.974748688533769,
              // }, 'secondposition')
              // .to(cameraRef.current.quaternion, {
              //   duration: 1,
              //   w: 0.44005833457048005,
              //   x: -0.053732977713798646,
              //   y: 0.8897517904258531,
              //   z: 0.1086424443532672,
              // }, 'secondposition')
              .to(cameraRef.current.position, {
                duration: 1,
                x: 0.14737095320057114,
                y: -0.1994738581061015,
                z: -1.6359735450259043,
              }, 'endposition')
              .to(cameraRef.current.quaternion, {
                duration: 1,
                w: 0.21117211035158662,
                x: 0.01174496152409791,
                y: 0.9758701357911753,
                z: -0.05427590404007838,
                // onComplete: ()=>{setCameraScene("learnMoreScene2")}
              }, 'endposition')
            setLastScrollTime(now)
          }
      }

      const animateMeshtoHomePageView = () => {
        setCameraScene("welcomeScene")
        const timeline = new gsap.timeline()
        timeline
            .add('start')
            .to(cameraRef.current.position, {
              duration: 0.75,
              x: 0,
              y: 0,
              z: 4.5,
            }, 'start')
            .to(cameraRef.current.quaternion, {
              duration: 0.75,
              w: 1,
              x: 0,
              y: 0,
              z: 0,
            }, 'start')
      }

      const animateMeshtoDashboardPageView = () => {
        setCameraScene("dashboardScene")
        const timeline = new gsap.timeline()
        timeline
          .add('start')
          .to(cameraRef.current.position, {
            duration: 0.75,
            x: 0,
            y: 0,
            z: 5.2,
          }, 'start')
          .to(cameraRef.current.quaternion, {
            duration: 0.75,
            w:1,
            x:0,
            y:0,
            z:0,
          }, 'start')
      }



      useEffect(() => {
        function handleMove(event) {
          setMouse([event.clientX, event.clientY])
        }
    
        window.addEventListener('mousemove', handleMove)
    
        return () => {
          window.removeEventListener('mousemove', handleMove)
        }
      }, [])

      useFrame((state, delta) => {
        // below is code for handling parallax effect through moving the camera based on mouse position
        // cameraRef.current.position.z = position[2] + (mouse[1] - window.innerHeight / 2) * speed
        if(cameraScene === "welcomeScene"){
          cameraRef.current.position.x = 0 + (mouse[0] - window.innerWidth / 2) * 0.0004/2
          cameraRef.current.position.y = 0 + (mouse[1] - window.innerHeight / 2) * 0.0004
        }

        if(cameraScene === "dashboardScene"){
          cameraRef.current.rotation.x = 0 + (mouse[1] - window.innerWidth / 2) * 0.0005
          cameraRef.current.rotation.y = 0 + (mouse[0] - window.innerHeight / 2) * 0.0005/2
        }
        

        // broken code, camera does not like it when two things try to control it at the same time (will fix if have time)
        // if(cameraScene === "learnMoreScene"){
        //   cameraRef.current.position.x = 0 + (mouse[0] - window.innerWidth / 2) * 0.0005
        //   // cameraRef.current.position.y = 0 + (mouse[1] - window.innerWidth / 2) * 0.0005

        //   // cameraRef.current.rotation.x = 0.20322180270420165 - (mouse[1] - window.innerWidth / 2) * 0.0005
        //   cameraRef.current.rotation.y = -0.3837214443049575 + (mouse[0] - window.innerWidth / 2) * 0.0001
        // }

        // if(cameraScene === "learnMoreScene2"){
        //   cameraRef.current.position.x = 0 + (mouse[0] - window.innerWidth / 2) * 0.0005
        //   // cameraRef.current.position.y = 0 + (mouse[1] - window.innerWidth / 2) * 0.0005

        //   // cameraRef.current.rotation.x = 0.20322180270420165 - (mouse[1] - window.innerWidth / 2) * 0.0005
        //   cameraRef.current.rotation.y = -0.3837214443049575 + (mouse[0] - window.innerWidth / 2) * 0.0001
        // }
        
      })


      //state hooks passed in for event listeners/handlers
      const funcMap = {
        animateMeshToScrollView: animateMeshToScrollView, 
        animateMeshView1: animateMeshView1,
        animateMeshToLearnMoreView: animateMeshToLearnMoreView,
        animateMeshToLearnMoreView2: animateMeshToLearnMoreView2,
        animateMeshToScrollView:animateMeshToScrollView,
        animateMeshToScrollView1:animateMeshToScrollView1,
        animateMeshToScrollView2:animateMeshToScrollView2,
        animateMeshToScrollView3:animateMeshToScrollView3,
        animateMeshToScrollView4:animateMeshToScrollView4,
        animateMeshToScrollView5:animateMeshToScrollView5,
        animateMeshtoHomePageView:animateMeshtoHomePageView,
        animateMeshtoDashboardPageView:animateMeshtoDashboardPageView,
      }

      // exporting all animation function to top level to be called by other components
      if(props.onChildEvent){
        props.onChildEvent(funcMap)
      }


      // console.log(word2Ref)

  return (
    <>
    
    <mesh 
    {...props}
    // rotateX={1.5}
    ref={meshRef}
    onWheel={()=>{cameraScene === "learnMoreScene" ? animateMeshToLearnMoreView2() : animateMeshToLearnMoreView()}}
    // onClick={()=>{props.onChildEvent(animateMeshToScrollView)}}
    >
        {/* <OrbitControls/> */}
    </mesh>

    <mesh
    {...props}
    ref={word0Ref}
    onPointerEnter={()=>setWord0Hover(true)}
    onPointerOut={()=>setWord0Hover(false)}
    scale={word0Hover===true? 1.01 : 1}
    onClick={()=>{console.log("word0 Clicked"); animateMeshToScrollView(); props.callNavigate("word0")}}
    >
    </mesh>

    <mesh
    {...props}
    ref={word1Ref}
    onPointerEnter={()=>setWord1Hover(true)}
    onPointerOut={()=>setWord1Hover(false)}
    scale={word1Hover===true? 1.01 : 1}
    onClick={()=>{console.log("word1 Clicked"); animateMeshToScrollView1(); props.callNavigate("word1")}}

    >
    </mesh>

    <mesh
    {...props}
    ref={word2Ref}
    onPointerEnter={()=>setWord2Hover(true)}
    onPointerOut={()=>setWord2Hover(false)}
    scale={word2Hover===true? 1.01 : 1}
    onClick={()=>{console.log("word2 Clicked"); animateMeshToScrollView2(); props.callNavigate("word2")}}

    >
    </mesh>

    <mesh
    {...props}
    ref={word3Ref}
    onPointerEnter={()=>setWord3Hover(true)}
    onPointerOut={()=>setWord3Hover(false)}
    scale={word3Hover===true? 1.01 : 1}
    onClick={()=>{console.log("word3 Clicked"); animateMeshToScrollView3(); props.callNavigate("word3")}}

    >
    </mesh>

    <mesh
    {...props}
    ref={word4Ref}
    onPointerEnter={()=>setWord4Hover(true)}
    onPointerOut={()=>setWord4Hover(false)}
    scale={word4Hover===true? 1.01 : 1}
    onClick={()=>{console.log("word4 Clicked"); animateMeshToScrollView4(); props.callNavigate("word4")}}

    >
    </mesh>

    <mesh
    {...props}
    ref={word5Ref}
    onPointerEnter={()=>setWord5Hover(true)}
    onPointerOut={()=>setWord5Hover(false)}
    scale={word5Hover===true? 1.01 : 1}
    onClick={()=>{console.log("word5 Clicked"); animateMeshToScrollView5(); props.callNavigate("word5")}}

    >
      
    </mesh>

    <mesh
    {...props}
    ref={backgroundRef}
    material={material}
    >

    </mesh>

    {/* <OrbitControls/> */}
    </>
  )
}
