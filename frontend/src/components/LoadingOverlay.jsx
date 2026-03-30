import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  'Painting your world…',
  'Adding lens flares…',
  'Channeling Ghibli…',
  'Calibrating film grain…',
  'Mixing the palette…',
  'Consulting the masters…',
  'Rendering cinematic magic…',
  'Almost there…',
]

export default function LoadingOverlay({ isVisible, selectedStyleName }) {
  const [msgIndex, setMsgIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      setMsgIndex(0)
      return
    }

    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length)
    }, 2200)

    const progInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p
        return p + Math.random() * 8
      })
    }, 400)

    return () => {
      clearInterval(msgInterval)
      clearInterval(progInterval)
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-[#080808]/97 flex flex-col items-center justify-center backdrop-blur-sm"
          aria-live="polite"
          aria-label="Transforming your image"
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-96 h-96 rounded-full bg-[#E63946]"
              style={{ filter: 'blur(80px)' }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-8">
            {/* Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-14 h-14 rounded-full border-2 border-white/8 border-t-[#E63946] mb-8"
            />

            {/* Style name */}
            {selectedStyleName && (
              <p className="text-xs uppercase tracking-[0.25em] text-[#E63946]/80 font-semibold mb-3">
                {selectedStyleName}
              </p>
            )}

            {/* Message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={msgIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-xl font-semibold text-[#F0EDE8] text-center mb-8"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.04em', fontSize: '1.4rem' }}
              >
                {MESSAGES[msgIndex]}
              </motion.p>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="w-full h-0.5 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#E63946] rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            <p className="mt-3 text-xs text-white/25 font-medium">
              {Math.round(Math.min(progress, 99))}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
