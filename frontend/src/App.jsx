import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AppPage from './pages/AppPage'

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F0EDE8]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </div>
  )
}
