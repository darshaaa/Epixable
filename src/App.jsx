import { useState } from 'react'
import MainRouter from './Router/MainRouter.jsx'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainRouter/>
    </>
  )
}

export default App
