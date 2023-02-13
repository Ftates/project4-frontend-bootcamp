import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const LearnMore = (props) => {

  const navigate = useNavigate()  
  
  let funcMapNavigate = {}

  const onWord0Click = () => {
    navigate("/learnMore/word0")
  }
  const onWord1Click = () => {
    navigate("/learnMore/word1")
  }
  const onWord2Click = () => {
    navigate("/learnMore/word2")
  }
  const onWord3Click = () => {
    navigate("/learnMore/word3")
  }
  const onWord4Click = () => {
    navigate("/learnMore/word4")
  }
  const onWord5Click = () => {
    navigate("/learnMore/word5")
  }

  funcMapNavigate = {
    onWord0Click: onWord0Click,
    onWord1Click: onWord1Click,
    onWord2Click: onWord2Click,
    onWord3Click: onWord3Click,
    onWord4Click: onWord4Click,
    onWord5Click: onWord5Click,
  }
  
  if(props.onChildEvent){
    props.onChildEvent(funcMapNavigate)
  }

  return (
    <>
      <Outlet/>
    </>
  )
}
