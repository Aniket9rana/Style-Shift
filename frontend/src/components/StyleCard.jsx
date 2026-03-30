import { motion } from 'framer-motion'

export default function StyleCard({ style, isSelected, onSelect, index = 0 }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ scale: 1.04 }}
      onClick={() => onSelect(style.id)}
      aria-label={`Select ${style.name} style`}
      aria-pressed={isSelected}
      className={`relative flex flex-col items-start p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left min-w-[140px] flex-shrink-0 ${
        isSelected
          ? 'border-[#E63946] bg-[#E63946]/10'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
      }`}
      style={isSelected ? { boxShadow: '0 0 20px rgba(230, 57, 70, 0.4)' } : {}}
    >
      {/* Checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#E63946] flex items-center justify-center"
        >
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      )}

      {/* Emoji */}
      <span className="text-2xl mb-2 leading-none">{style.emoji}</span>

      {/* Name */}
      <span className="text-sm font-semibold text-[#F0EDE8] leading-tight mb-1">
        {style.name}
      </span>

      {/* Descriptor */}
      <span className="text-xs text-white/45 leading-tight">
        {style.descriptor}
      </span>
    </motion.button>
  )
}
