import { useState } from 'react'
import { motion } from 'framer-motion'
import StyleCard from './StyleCard'
import { styleList, styleCategories } from '../utils/stylePrompts'

export default function StyleGrid({ selectedStyle, onSelect }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? styleList
    : styleList.filter((s) => s.category === activeCategory)

  return (
    <div>
      {/* Category Pills */}
      <div className="flex gap-2 mb-4 flex-wrap" role="group" aria-label="Style categories">
        {styleCategories.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-[#E63946] text-white'
                : 'bg-white/8 text-white/50 border border-white/10 hover:border-white/25 hover:text-white/80'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Cards horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide" role="list" aria-label="Style options">
        {filtered.map((style, i) => (
          <div key={style.id} role="listitem">
            <StyleCard
              style={style}
              isSelected={selectedStyle === style.id}
              onSelect={onSelect}
              index={i}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
