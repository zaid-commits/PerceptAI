'use client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Main } from './components/Section1/Hero/Main'
import Test from './components/routes/Test'
import ReactLenis from 'lenis/react'
import { Analytics } from "@vercel/analytics/react"
import Projects from './components/routes/Projects'
import Community from './components/routes/Community'
import Resources from './components/routes/Resources'
import Contact from './components/routes/Contact'
function App() {
  return (
    <ReactLenis root>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Projects" element={<Projects/>} />
        <Route path="/Resources" element={<Resources/>} />
        <Route path='/Community' element={<Community/>}/>
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </Router>
    <Analytics/>
    </ReactLenis>
  )
}

export default App
