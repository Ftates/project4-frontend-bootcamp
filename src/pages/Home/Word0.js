import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Word.css'

export const Word0 = (props) => {

    const navigate = useNavigate()

    const location = useLocation();
    console.log("location",location.search)
    const queryParams = new URLSearchParams(location.search);
    console.log("queryparams",queryParams.get('page'))
    const selectedPage = queryParams.get('page')

    const [lastScrollTime, setLastScrollTime] = useState(0)

    const [page0hidden, setPage0hidden] = useState(selectedPage === 'page0' ? false : true)
    const [page1hidden, setPage1hidden] = useState(selectedPage === 'page1' ? false : true)
    const [page2hidden, setPage2hidden] = useState(selectedPage === 'page2' ? false : true)
    const [page3hidden, setPage3hidden] = useState(selectedPage === 'page3' ? false : true)
    const [page4hidden, setPage4hidden] = useState(selectedPage === 'page4' ? false : true)
    const [page5hidden, setPage5hidden] = useState(selectedPage === 'page5' ? false : true)

    

    function handleWheelPage0(event) {
      const now = new Date().getTime();
      const timeSinceLastScroll = now - lastScrollTime;
      if (timeSinceLastScroll > 1000) {
        if (event.deltaY > 0) {
          console.log("Scrolling down");
          setPage0hidden(true)
          setPage1hidden(false)
          props.onChildEvent("word1View")

        } else {
          console.log("Scrolling up");
          setPage0hidden(true)
          setPage5hidden(false)
          props.onChildEvent("word5View")
        }
        setLastScrollTime(now)
      }
    }
    
    function handleWheelPage1(event) {
      const now = new Date().getTime();
      const timeSinceLastScroll = now - lastScrollTime;
      if (timeSinceLastScroll > 1000) {
        if (event.deltaY > 0) {
        //   console.log("Scrolling down");
          setPage1hidden(true)
          setPage2hidden(false)
          props.onChildEvent("word2View")

        } else {
        //   console.log("Scrolling up");
          setPage1hidden(true)
          setPage0hidden(false)
          props.onChildEvent("word0View")
        }
        setLastScrollTime(now)
      }
    }

    function handleWheelPage2(event) {
      const now = new Date().getTime();
      const timeSinceLastScroll = now - lastScrollTime;
      if (timeSinceLastScroll > 1000) {
        if (event.deltaY > 0) {
        //   console.log("Scrolling down");
          setPage2hidden(true)
          setPage3hidden(false)
          props.onChildEvent("word3View")

        } else {
        //   console.log("Scrolling up");
          setPage2hidden(true)
          setPage1hidden(false)
          props.onChildEvent("word1View")
        }
        setLastScrollTime(now)
      }
    }

    function handleWheelPage3(event) {
      const now = new Date().getTime();
      const timeSinceLastScroll = now - lastScrollTime;
      if (timeSinceLastScroll > 1000) {
        if (event.deltaY > 0) {
        //   console.log("Scrolling down");
          setPage3hidden(true)
          setPage2hidden(false)
          props.onChildEvent("word2View")

        } else {
        //   console.log("Scrolling up");
          setPage3hidden(true)
          setPage4hidden(false)
          props.onChildEvent("word4View")
        }
        setLastScrollTime(now)
      }
    }

    function handleWheelPage4(event) {
      const now = new Date().getTime();
      const timeSinceLastScroll = now - lastScrollTime;
      if (timeSinceLastScroll > 1000) {
        if (event.deltaY > 0) {
        //   console.log("Scrolling down");
          setPage4hidden(true)
          setPage3hidden(false)
          props.onChildEvent("word3View")

        } else {
        //   console.log("Scrolling up");
          setPage4hidden(true)
          setPage5hidden(false)
          props.onChildEvent("word5View")
        }
        setLastScrollTime(now)
      }
    }

    function handleWheelPage5(event) {
      const now = new Date().getTime();
      const timeSinceLastScroll = now - lastScrollTime;
      if (timeSinceLastScroll > 1000) {
        if (event.deltaY > 0) {
        //   console.log("Scrolling down");
          setPage5hidden(true)
          setPage4hidden(false)
          props.onChildEvent("word4View")

        } else {
        //   console.log("Scrolling up");
          setPage5hidden(true)
          setPage0hidden(false)
          props.onChildEvent("word0View")
        }
        setLastScrollTime(now)
      }
    }
      
    function handleWheels(e) {
      if(page0hidden === false)handleWheelPage0(e)
      if(page1hidden === false)handleWheelPage1(e)
      if(page2hidden === false)handleWheelPage2(e)
      if(page3hidden === false)handleWheelPage3(e)
      if(page4hidden === false)handleWheelPage4(e)
      if(page5hidden === false)handleWheelPage5(e)
    }


  return (
    <div className='WordScreen'>
        <div className='WordContainer'>
          {/* each div is a seperate page on the coin */}
          <div key={"page0"} className={`PageContainer ${page0hidden ? "hidden" : ""}`}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView"); navigate("/learnMore")}}>{`<<Back`}</button>
            <div className='page-box'>
              <header>Motivation</header>
              <ul>
                <li>Try out new technologies and create what we tried to but couldn't in project 1</li>
                <li>Common interest in crypto</li>
              </ul>
              <div>
                <h3>The Problem:</h3>
                <span>Crypto portfolio management is tedious as it requires monitoring multiple wallets and coins and recording different transactions which can be time-consuming and difficult to manage.</span>
                <h3>The Solution:</h3>
                <span>KoinFu is a portfolio tracker for cryptocurrencies that allow users to log their trades and track their portfolio across multiple wallets</span>
              </div>
            </div>
          </div>

          <div key={"page1"} className={`PageContainer ${page1hidden ? "hidden" : ""}`}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView"); navigate("/learnMore")}}>Back</button>
            <div className='page-box'>
              <header>Tech Stack</header>
              <div className='page-text'>
                <h3>Frontend</h3>
                <div className='img-container'>
                  <img style={{height:"100px"}} src='https://miro.medium.com/max/724/1*K45MRnjomx-khaJy2lORsg.png'></img>
                  <img style={{position:"relative", left:"100px", height:"150px"}} src='https://miro.medium.com/max/724/1*KW0vhD3esJFO7AYcf7Z_pQ.png'></img>
                </div>
                <h3>Backend</h3>
                <div className='img-container'>
                  <img style={{height:"80px"}} src='https://www.zdnet.com/a/img/2018/04/19/092cbf81-acac-4f3a-91a1-5a26abc1721f/postgresql-logo.png'></img>
                  <img style={{position:"relative", left:"10px", height:"80px", backgroundColor:"white"}} src='https://miro.medium.com/max/811/1*fygqfizATFjt6ALek2W1jg.png'></img>
                  <img style={{height:"100px"}} src='https://cdn-images-1.medium.com/fit/t/1600/480/1*XkmnsJ6Joa6EDFVGUw0tfA.png'></img>
                  <img style={{height:"130px", position:"relative", left:"180px"}} src='https://miro.medium.com/max/1400/1*XP-mZOrIqX7OsFInN2ngRQ.png'></img>
                </div>
                <h3>API</h3>
                <div className='img-container'>
                  <img style={{height:"200px", backgroundColor:"white"}} src='https://static.coingecko.com/s/thumbnail-d5a7c1de76b4bc1332e48227dc1d1582c2c92721b5552aae76664eecb68345c9.png'></img>
                  
                </div>
              </div>
            </div>

          </div>

          <div key={"page2"} className={`PageContainer ${page2hidden ? "hidden" : ""}`}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView"); navigate("/learnMore")}}>Back</button>
            <div className='page-box'>
              <header>Key Features</header>
              <div>
                <ul>
                  <li>Record transaction history</li>
                  <li>Track multiple wallets and their current value</li>
                  <li>View your assets distribution in different wallets</li>
                  <li>Monitor your portfolio growth over time</li>
                </ul>
              </div>
            </div>
          </div>

          <div key={"page3"} className={`PageContainer ${page3hidden ? "hidden" : ""}`}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView2"); navigate("/learnMore")}}>Back</button>
            <div className='page-box'>
              <header>Additional Features</header>
              <div>
                <ul>
                  <li>Looks cool</li>
                  <li>Able to turn your computer into a space heater</li>
                </ul>
              </div>
            </div>
            
          </div>

          <div key={"page4"} className={`PageContainer ${page4hidden ? "hidden" : ""}`}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView2"); navigate("/learnMore")}}>Back</button>
            <div className='page-box'>
              <header>Possible Improvements</header>
              <div>
                <ul>
                  <li>Lack of validation and error handling</li>
                  <li>Aesthetics/Animations</li>
                  <li>Efficiency in API calls</li>
                </ul>
              </div>
            </div>
          </div>

          <div key={"page5"} className={`PageContainer ${page5hidden ? "hidden" : ""}`}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView2"); navigate("/learnMore")}}>Back</button>
            <div className='page-box'>
              <header>Challenges Faced</header>
              <div>
                <ul>
                  <li>Working with 3rd party API - limited calls</li>
                  <li>Some API calls are dependent on each other, making debugging difficult</li>
                  <li>Managing states and chartJS interactivity</li>
                  <li>Hard to come up with a wireframe/design for website</li>
                  <li>Threejs light rendering does not obey the laws of physics</li>
                  <li>Camera angles during animations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='big-ass-scrollcoin' onWheel={(e)=>{handleWheels(e)}}>
          {/* leave me empty */}
        </div>
    </div>
  )
}
