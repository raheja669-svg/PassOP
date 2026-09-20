import { useState } from 'react'
import './App.css'
import "tailwindcss";
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className=" min-h-screen flex flex-col">
       <Navbar />
       <div className=" pb-16">
       <Manager/>
       </div>
       <Footer/>
       </div>
    </>
  )
}

export default App
