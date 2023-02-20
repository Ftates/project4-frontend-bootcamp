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
        //   console.log("Scrolling down");
          setPage0hidden(true)
          setPage1hidden(false)
          props.onChildEvent("word1View")

        } else {
        //   console.log("Scrolling up");
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
      


  return (
    <div className='WordScreen'>
        <div className='WordContainer'>
          {/* each div is a seperate page on the coin */}
          <div key={"page0"} className={`PageContainer ${page0hidden ? "hidden" : ""}`} onWheel={(e)=>{handleWheelPage0(e)}}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView"); navigate("/learnMore")}}>{`<<Back`}</button>
            <div>
              <header>Test Text word 0</header>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
                     </div>

          <div key={"page1"} className={`PageContainer ${page1hidden ? "hidden" : ""}`} onWheel={(e)=>{handleWheelPage1(e)}}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView"); navigate("/learnMore")}}>Back</button>

            <header>Test Text word 1</header>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>

          <div key={"page2"} className={`PageContainer ${page2hidden ? "hidden" : ""}`} onWheel={(e)=>{handleWheelPage2(e)}}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView"); navigate("/learnMore")}}>Back</button>

            <header>Test Text word 2</header>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>

          <div key={"page3"} className={`PageContainer ${page3hidden ? "hidden" : ""}`} onWheel={(e)=>{handleWheelPage3(e)}}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView2"); navigate("/learnMore")}}>Back</button>

            <header>Test Text word 3</header>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>

          <div key={"page4"} className={`PageContainer ${page4hidden ? "hidden" : ""}`} onWheel={(e)=>{handleWheelPage4(e)}}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView2"); navigate("/learnMore")}}>Back</button>

            <header>Test Text word 4</header>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>

          <div key={"page5"} className={`PageContainer ${page5hidden ? "hidden" : ""}`} onWheel={(e)=>{handleWheelPage5(e)}}>
            <button onClick={()=>{props.onChildEvent("toLearnMoreView2"); navigate("/learnMore")}}>Back</button>

            <header>Test Text word 5</header>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
        </div>
    </div>
  )
}
