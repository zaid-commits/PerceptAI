'use client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Main } from './components/Section1/Hero/Main'
import Test from './components/Test/Test'
import ReactLenis from 'lenis/react'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <ReactLenis root>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </Router>
    </ReactLenis>
  )
}

export default App
