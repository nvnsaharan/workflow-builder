import { useState } from 'react'
import './App.css'
import FlowBuilder from './components/FlowBuilder'
import TopBar from './components/TopBar/TopBar'

function App() {
  return (
    <>
      <TopBar />
      <FlowBuilder />
    </>
  )
}

export default App
