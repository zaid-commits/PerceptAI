import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Main } from './components/Section1/Hero/Main'
import Test from './components/Test/Test'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </Router>
  )
}

export default App
