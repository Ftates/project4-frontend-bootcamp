// Packages
import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, Switch } from "react-router-dom";
import AuthProvider from "./AuthContext/AuthContext.js";

// Import Route Components
import "./index.css";
import App from "./pages/Home/App";
import { MainPageCanvas } from "./Threejs/MainPageCanvas";
import { Overlay } from "./pages/Overlay";
import { LearnMore } from "./pages/Home/LearnMore";
import { Word0 } from "./pages/Home/Word0";
import Login from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import { WalletList } from "./pages/WalletList/WalletList.js";
import Transactions from "./pages/Transaction Log/Transaction";

const root = ReactDOM.createRoot(document.getElementById("root"));

let animationMap = {};
let navigateMap = {};
let toggleDisplayFunc;

// going into the Threejs components to retrieve the functions and store them in funcMap
const retrieveAnimationEvent = (map) => {
  animationMap = map;
  // funcMap.animateMeshToScrollView = e
};

// // going into react component to grab navigate functions
const retrieveNavigateEvent = (map) => {
  navigateMap = map;
  console.log("retrieved navigate map", navigateMap);
};

const retrieveToggleDisplay = (func) => {
  toggleDisplayFunc = func;
};

// getting event from React app to call the specific funtion from
const handleAnimationEvent = (route) => {
  // console.log("alivent check")
  if (route === "toHomePageView") animationMap.animateMeshtoHomePageView();
  if (route === "toDashboardPageView")animationMap.animateMeshtoDashboardPageView();
  if (route === "toLearnMoreView") animationMap.animateMeshToLearnMoreView();
  if (route === "toLearnMoreView2") animationMap.animateMeshToLearnMoreView2();
  if (route === "word0View") animationMap.animateMeshToScrollView();
  if (route === "word1View") animationMap.animateMeshToScrollView1();
  if (route === "word2View") animationMap.animateMeshToScrollView2();
  if (route === "word3View") animationMap.animateMeshToScrollView3();
  if (route === "word4View") animationMap.animateMeshToScrollView4();
  if (route === "word5View") animationMap.animateMeshToScrollView5();
  else {
    // console.log("check handleAnimationEvent func on index.js route:", route);
  }
};

const useNavigateMap = (route) => {
  if (route === "word0") navigateMap.onWord0Click();
  if (route === "word1") navigateMap.onWord1Click();
  if (route === "word2") navigateMap.onWord2Click();
  if (route === "word3") navigateMap.onWord3Click();
  if (route === "word4") navigateMap.onWord4Click();
  if (route === "word5") navigateMap.onWord5Click();
  else {
    console.log("check useNavigateMap function in index.js route:", route);
  }
};

root.render(
  // <React.StrictMode>
  <>
    {
      <MainPageCanvas
        onChildEvent={retrieveAnimationEvent}
        onChildEvent2={retrieveToggleDisplay}
        callNavigate={(e) => {
          useNavigateMap(e);
        }}
      />
    }
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route
            exact hash="/"
            element={
              <Overlay
                onChildEvent={(e) => {
                  handleAnimationEvent(e);
                }}
              />
            }
          >
            <Route
              exact hash="/"
              element={<App onChildEvent={(e) => handleAnimationEvent(e)} />}
            />
            <Route
              exact hash="/learnMore"
              element={<LearnMore onChildEvent={retrieveNavigateEvent} />}
            >
              <Route
                exact hash="/learnMore/word0"
                element={
                  <Word0 onChildEvent={(e) => handleAnimationEvent(e)} />
                }
              />
            </Route>
            <Route
              exact hash="/login"
              element={<Login onChildEvent={(e) => handleAnimationEvent(e)} />}
            />
            <Route
              exact hash="/register"
              element={
                <Register onChildEvent={(e) => handleAnimationEvent(e)} />
              }
            />
            <Route exact hash="/dashboard" element={<Dashboard onChildEvent={(e)=> handleAnimationEvent(e)}/>} />
            <Route exact hash="/walletList" element={<WalletList onChildEvent={(e)=> handleAnimationEvent(e)}/>} />
            <Route exact hash="/transactions" element={<Transactions onChildEvent={(e)=> handleAnimationEvent(e)}/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  </>
  // </React.StrictMode>
);
