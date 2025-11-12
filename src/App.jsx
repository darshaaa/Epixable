import { useState } from 'react'
import './App.css'
import Mainrouter from './Router/mainrouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Mainrouter />
    </>
  )
}

export default App
