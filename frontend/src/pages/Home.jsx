import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import BeforeAfterSlider from '../components/BeforeAfterSlider'

const SHOWCASES = [
  {
    before: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80',
    label: 'Studio Ghibli',
  },
  {
    before: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',
    label: 'Nolan Film',
  },
  {
    before: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80',
    label: 'Van Gogh',
  },
]

const STEPS = [
  { icon: '📤', step: '01', title: 'Upload', desc: 'Drag & drop or browse any JPG, PNG, or WEBP photo.' },
  { icon: '🎨', step: '02', title: 'Pick Style', desc: 'Choose from 16 cinematic, animated, and artistic styles.' },
  { icon: '⬇️', step: '03', title: 'Download', desc: 'Your transformed image, ready to share instantly.' },
]

function ShowcaseCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <BeforeAfterSlider
        beforeSrc={item.before}
        afterSrc={item.after}
        label={item.label}
        className="w-full aspect-[4/3]"
      />
    </motion.div>
  )
}

export default function Home() {
  return (
    <main className="noise-bg gradient-mesh">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.3em] text-[#E63946] font-semibold mb-6"
          >
            AI Photo Style Transformer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[clamp(3rem,10vw,8rem)] leading-[0.92] tracking-wide text-[#F0EDE8] mb-8"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Your photo.<br />
            <span className="text-[#E63946]">Any world.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-white/45 max-w-lg mx-auto mb-10 leading-relaxed font-light"
          >
            Transform any photo into cinematic film stills, anime masterpieces, oil paintings, and more — in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Link
              to="/app"
              className="inline-block px-10 py-4 bg-[#E63946] text-white font-bold text-base tracking-widest rounded hover:bg-[#cc2f3c] transition-colors duration-200"
              style={{ boxShadow: '0 0 40px rgba(230,57,70,0.35)' }}
              aria-label="Start transforming your photos"
            >
              START TRANSFORMING
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-xs text-white/20 tracking-wide"
          >
            16 styles · No account needed · Free to try
          </motion.p>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/20 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-white/20 to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* Before/After showcase */}
      <section className="py-24 px-6 max-w-6xl mx-auto" aria-label="Style transformation examples">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2rem,5vw,3.5rem)] text-[#F0EDE8] mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            See the transformation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/35 text-sm tracking-wide"
          >
            Drag the slider to compare original and styled
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHOWCASES.map((item, i) => (
            <ShowcaseCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5" aria-label="How StyleShift works">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[clamp(2rem,4vw,3rem)] text-[#F0EDE8] mb-16"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          How it works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl leading-none">{s.icon}</span>
                <span className="text-xs font-bold text-[#E63946] tracking-[0.2em]">{s.step}</span>
              </div>
              <h3 className="text-xl font-bold text-[#F0EDE8] mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.06em' }}>
                {s.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-24 px-6 text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] text-[#F0EDE8] mb-6"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Ready to transform?
          </h2>
          <Link
            to="/app"
            className="inline-block px-10 py-4 bg-transparent border border-[#E63946] text-[#E63946] font-bold text-sm tracking-widest rounded hover:bg-[#E63946] hover:text-white transition-all duration-200"
            aria-label="Open the app to start"
          >
            OPEN THE APP
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
        <span className="font-bold tracking-widest text-[#F0EDE8]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          STYLE<span className="text-[#E63946]">SHIFT</span>
        </span>
        <p className="text-xs text-white/25 tracking-wide">Your photo. Any world.</p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/25 hover:text-white/50 transition-colors tracking-wide"
          aria-label="View source on GitHub"
        >
          GitHub →
        </a>
      </footer>
    </main>
  )
}
