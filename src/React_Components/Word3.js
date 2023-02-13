import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Word3 = (props) => {

    const navigate = useNavigate()

    function handleWheel(event) {
        if (event.deltaY > 0) {
        //   console.log("Scrolling down");
          navigate("/learnMore/word4")
          props.onChildEvent("word4View")
        } else {
        //   console.log("Scrolling up");
          navigate("/learnMore/word2")
          props.onChildEvent("word2View")
        }
      }

  return (
    <div className='WordScreen'>
        <div className='WordContainer' onWheel={(e)=>{handleWheel(e)}}>
        <button onClick={()=>{props.onChildEvent("toLearnMoreView2"); navigate("/learnMore")}}>Back</button>
        <header>Test Text word 3</header>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    </div>
  )
}
