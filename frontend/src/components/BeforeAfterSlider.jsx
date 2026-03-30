import { useState, useRef, useCallback } from 'react'

export default function BeforeAfterSlider({ beforeSrc, afterSrc, label, className = '' }) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const updateSlider = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSliderPos((x / rect.width) * 100)
  }, [])

  const onMouseDown = (e) => {
    isDragging.current = true
    updateSlider(e.clientX)

    const onMove = (e) => {
      if (isDragging.current) updateSlider(e.clientX)
    }
    const onUp = () => {
      isDragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const onTouchStart = (e) => {
    isDragging.current = true
    updateSlider(e.touches[0].clientX)

    const onMove = (e) => {
      if (isDragging.current) updateSlider(e.touches[0].clientX)
    }
    const onEnd = () => {
      isDragging.current = false
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onEnd)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl select-none cursor-col-resize ${className}`}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      aria-label="Before and after comparison slider"
    >
      {/* After image (full) */}
      <img
        src={afterSrc}
        alt="After transformation"
        className="w-full h-full object-cover block"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeSrc}
          alt="Before transformation"
          className="absolute inset-0 w-full h-full object-cover block"
          style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg z-10">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M4 7L1 4M4 7L1 10M10 7L13 4M10 7L13 10" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 z-10 px-2 py-1 bg-black/60 rounded text-xs font-medium tracking-wide text-white/70 backdrop-blur-sm">
        Original
      </div>
      <div className="absolute bottom-3 right-3 z-10 px-2 py-1 bg-[#E63946]/80 rounded text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
        {label}
      </div>
    </div>
  )
}
