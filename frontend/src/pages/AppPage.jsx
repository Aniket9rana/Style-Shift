import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '../store/useAppStore'
import UploadZone from '../components/UploadZone'
import StyleGrid from '../components/StyleGrid'
import LoadingOverlay from '../components/LoadingOverlay'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import { stylePrompts } from '../utils/stylePrompts'

const STEP_LABELS = ['Upload', 'Pick Style', 'Transform']

async function runTransform(image, styleId) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transform`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image, style: styleId }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Server error: ${res.status}`)
  }

  const data = await res.json()
  return data.transformedUrl
}

export default function AppPage() {
  const {
    uploadedImage, selectedStyle, transformedImage,
    isLoading, step, error,
    setUploadedImage, setSelectedStyle, setTransformedImage,
    setIsLoading, setError, reset,
  } = useAppStore()

  const canTransform = !!uploadedImage && !!selectedStyle && !isLoading
  const selectedStyleData = selectedStyle ? stylePrompts[selectedStyle] : null

  async function handleTransform() {
    if (!canTransform) return
    setError(null)
    setIsLoading(true)

    try {
      const url = await runTransform(uploadedImage, selectedStyle)
      setTransformedImage(url)
    } catch (err) {
      setError(err.message || 'Transformation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleDownload() {
    const a = document.createElement('a')
    a.href = transformedImage
    a.download = `styleshift-${selectedStyle}.jpg`
    a.click()
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'StyleShift',
        text: `Check out my photo transformed in ${selectedStyleData?.name} style!`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!')
      })
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8 max-w-3xl mx-auto">
      <LoadingOverlay isVisible={isLoading} selectedStyleName={selectedStyleData?.name} />

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] text-[#F0EDE8] mb-2"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          Transform your photo
        </h1>
        <p className="text-sm text-white/35">Upload · Pick a style · Download your masterpiece</p>
      </motion.div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-10" role="progressbar" aria-label="Steps" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
        {STEP_LABELS.map((label, i) => {
          const num = i + 1
          const isActive = step >= num
          const isCurrent = step === num
          return (
            <div key={label} className="flex items-center">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                isCurrent ? 'bg-[#E63946]/15 text-[#E63946] border border-[#E63946]/40' :
                isActive ? 'text-white/60' :
                'text-white/20'
              }`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  isActive ? 'bg-[#E63946] text-white' : 'bg-white/8 text-white/30'
                }`}>{num}</span>
                <span className="hidden sm:block">{label}</span>
              </div>
              {i < 2 && <div className={`w-8 h-px mx-1 transition-all ${step > num ? 'bg-[#E63946]/50' : 'bg-white/10'}`} />}
            </div>
          )
        })}
      </div>

      {/* Result View */}
      <AnimatePresence>
        {transformedImage && (
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#F0EDE8] tracking-wide" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.3rem' }}>
                Your result
              </h2>
              <span className="text-xs text-[#E63946] font-semibold tracking-wider px-3 py-1 border border-[#E63946]/30 rounded-full bg-[#E63946]/8">
                {selectedStyleData?.emoji} {selectedStyleData?.name}
              </span>
            </div>

            <BeforeAfterSlider
              beforeSrc={uploadedImage}
              afterSrc={transformedImage}
              label={selectedStyleData?.name || 'Styled'}
              className="w-full aspect-video mb-5"
            />

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleDownload}
                className="flex-1 min-w-[140px] py-3 bg-[#E63946] text-white font-bold text-sm tracking-widest rounded hover:bg-[#cc2f3c] transition-colors"
                aria-label="Download transformed image"
              >
                DOWNLOAD
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => useAppStore.setState({ transformedImage: null, selectedStyle: null, step: 2 })}
                className="flex-1 min-w-[140px] py-3 border border-white/15 text-white/60 font-semibold text-sm tracking-wider rounded hover:border-white/30 hover:text-white/80 transition-all"
                aria-label="Try another style"
              >
                Try Another Style
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                className="px-5 py-3 border border-white/15 text-white/40 rounded hover:border-white/25 hover:text-white/60 transition-all"
                aria-label="Share this transformation"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="4" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="12" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <line x1="5.3" y1="7.3" x2="10.7" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="5.3" y1="8.7" x2="10.7" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </div>

            <button
              onClick={reset}
              className="mt-4 w-full py-2.5 text-xs text-white/25 hover:text-white/45 transition-colors tracking-widest"
              aria-label="Start over with a new image"
            >
              START OVER
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Steps (hidden when result showing) */}
      {!transformedImage && (
        <div className="space-y-8">
          {/* Step 1 — Upload */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            aria-label="Step 1: Upload your photo"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#E63946] flex items-center justify-center text-xs font-bold text-white">1</span>
              <h2 className="font-bold text-[#F0EDE8] tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem' }}>
                Upload your photo
              </h2>
            </div>
            <UploadZone
              uploadedImage={uploadedImage}
              onUpload={setUploadedImage}
            />
          </motion.section>

          {/* Step 2 — Style */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: uploadedImage ? 1 : 0.35, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-label="Step 2: Choose a style"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-colors ${uploadedImage ? 'bg-[#E63946]' : 'bg-white/15'}`}>2</span>
              <h2 className="font-bold text-[#F0EDE8] tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem' }}>
                Pick a style
              </h2>
              {selectedStyle && (
                <span className="ml-auto text-xs text-[#E63946] font-semibold">
                  {stylePrompts[selectedStyle]?.emoji} {stylePrompts[selectedStyle]?.name}
                </span>
              )}
            </div>
            <div className={!uploadedImage ? 'pointer-events-none' : ''}>
              <StyleGrid selectedStyle={selectedStyle} onSelect={setSelectedStyle} />
            </div>
          </motion.section>

          {/* Step 3 — Transform */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            aria-label="Step 3: Transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-colors ${canTransform ? 'bg-[#E63946]' : 'bg-white/15'}`}>3</span>
              <h2 className="font-bold text-[#F0EDE8] tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem' }}>
                Transform
              </h2>
            </div>

            <motion.button
              onClick={handleTransform}
              disabled={!canTransform}
              whileTap={canTransform ? { scale: 0.98 } : {}}
              aria-label="Transform your image"
              aria-disabled={!canTransform}
              className={`w-full py-5 text-base font-bold tracking-[0.2em] rounded transition-all duration-300 ${
                canTransform
                  ? 'bg-[#E63946] text-white hover:bg-[#cc2f3c] cursor-pointer'
                  : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/8'
              }`}
              style={canTransform ? { boxShadow: '0 0 40px rgba(230,57,70,0.3)' } : {}}
            >
              {!uploadedImage
                ? 'UPLOAD A PHOTO FIRST'
                : !selectedStyle
                ? 'SELECT A STYLE FIRST'
                : 'TRANSFORM MY PHOTO'}
            </motion.button>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400"
                >
                  <span className="font-semibold">Error: </span>{error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </div>
      )}
    </div>
  )
}
