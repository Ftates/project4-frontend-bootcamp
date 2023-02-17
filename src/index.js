// Packages
import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthContext/AuthContext.js";

// Import Route Components
import "./index.css";
import App from "./pages/Home/App";
import { MainPageCanvas } from "./Threejs/MainPageCanvas";
import { Overlay } from "./pages/Overlay";
import { LearnMore } from "./pages/Home/LearnMore";
import { Word0 } from "./pages/Home/Word0";
import { Word1 } from "./pages/Home/Word1";
import { Word2 } from "./pages/Home/Word2";
import { Word3 } from "./pages/Home/Word3";
import { Word4 } from "./pages/Home/Word4";
import { Word5 } from "./pages/Home/Word5";
import Login from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";

// console.log("authprovider",AuthProvider)


const root = ReactDOM.createRoot(document.getElementById("root"));

let animationMap = {}
let navigateMap = {}
let toggleDisplayFunc 


// going into the Threejs components to retrieve the functions and store them in funcMap
const retrieveAnimationEvent = (map) => {
  animationMap = map
  // funcMap.animateMeshToScrollView = e
}

// going into react component to grab navigate functions 
const retrieveNavigateEvent = (map) => {
  navigateMap = map
  console.log("retrieved navigate map",navigateMap)
}

const retrieveToggleDisplay = (func) => {
  toggleDisplayFunc = func
}

// getting event from React app to call the specific funtion from 
const handleAnimationEvent = (route) => {
  // console.log("alivent check")
  if(route === "toLearnMoreView")animationMap.animateMeshToLearnMoreView()
  if(route === "toLearnMoreView2")animationMap.animateMeshToLearnMoreView2()
  if(route === "word0View")animationMap.animateMeshToScrollView()
  if(route === "word1View")animationMap.animateMeshToScrollView1()
  if(route === "word2View")animationMap.animateMeshToScrollView2()
  if(route === "word3View")animationMap.animateMeshToScrollView3()
  if(route === "word4View")animationMap.animateMeshToScrollView4()
  if(route === "word5View")animationMap.animateMeshToScrollView5()
  else{
    console.log("check handleAnimationEvent func on index.js route:",route)
  }
}

const useNavigateMap = (route) => {
  if(route === "word0")navigateMap.onWord0Click()
  if(route === "word1")navigateMap.onWord1Click()
  if(route === "word2")navigateMap.onWord2Click()
  if(route === "word3")navigateMap.onWord3Click()
  if(route === "word4")navigateMap.onWord4Click()
  if(route === "word5")navigateMap.onWord5Click()
  else{
    console.log("check useNavigateMap function in index.js route:",route)
  }
}



root.render(
  // <React.StrictMode>
  <>
    <MainPageCanvas 
      onChildEvent={retrieveAnimationEvent}
      onChildEvent2={retrieveToggleDisplay}
      callNavigate={(e)=>{useNavigateMap(e)}}
      />
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Overlay/>}>
            <Route path="/" element={<App onChildEvent={(e)=>handleAnimationEvent(e)}/>} />
            <Route path="/learnMore" element={<LearnMore onChildEvent={retrieveNavigateEvent}/>}>
              <Route path="/learnMore/word0" element={<Word0 onChildEvent={(e)=>handleAnimationEvent(e)}/>}/>
              <Route path="/learnMore/word1" element={<Word1 onChildEvent={(e)=>handleAnimationEvent(e)}/>}/>
              <Route path="/learnMore/word2" element={<Word2 onChildEvent={(e)=>handleAnimationEvent(e)}/>}/>
              <Route path="/learnMore/word3" element={<Word3 onChildEvent={(e)=>handleAnimationEvent(e)}/>}/>
              <Route path="/learnMore/word4" element={<Word4 onChildEvent={(e)=>handleAnimationEvent(e)}/>}/>
              <Route path="/learnMore/word5" element={<Word5 onChildEvent={(e)=>handleAnimationEvent(e)}/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  </>
  // </React.StrictMode>
);
