import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5 backdrop-blur-md bg-[#080808]/80"
    >
      <Link to="/" className="flex items-center gap-2 group" aria-label="StyleShift home">
        <span className="text-[#E63946] text-xl font-bold tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem' }}>
          STYLE<span className="text-[#F0EDE8]">SHIFT</span>
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
            location.pathname === '/' ? 'text-[#F0EDE8]' : 'text-white/40 hover:text-white/70'
          }`}
        >
          Home
        </Link>
        <Link
          to="/app"
          className={`px-4 py-2 text-sm font-semibold tracking-wider rounded border transition-all duration-200 ${
            location.pathname === '/app'
              ? 'bg-[#E63946] border-[#E63946] text-white'
              : 'border-[#E63946]/60 text-[#E63946] hover:bg-[#E63946] hover:text-white'
          }`}
          aria-label="Open StyleShift app"
        >
          Try It
        </Link>
      </div>
    </motion.nav>
  )
}
