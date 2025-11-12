import { useState } from 'react'
import MainRouter from './Routes/MainRouter.jsx'
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
