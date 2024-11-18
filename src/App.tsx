'use client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Main } from './components/Section1/Hero/Main'
import Test from './components/pages/Test'
import Section2 from './components/Section2/Section2'
import Section5 from './components/Section5/Section5'
import Section8 from './components/Section8/ResourceLibrary'
import ReactLenis from 'lenis/react'
import { Analytics } from "@vercel/analytics/react"
import CommunityForum from './components/Section9/CommunityForum'

function App() {
  return (
    <ReactLenis root>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Projects" element={<Section2 />} />
        <Route path="/Resources" element={<Section8 />} />
        <Route path='/Community' element={<CommunityForum/>}/>
        <Route path="/Contact" element={<Section5 />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </Router>
    <Analytics/>
    </ReactLenis>
  )
}

export default App
