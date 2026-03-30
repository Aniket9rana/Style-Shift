import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { compressImage, fileToBase64 } from '../utils/compressImage'

const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
}
const MAX_SIZE_BYTES = 20 * 1024 * 1024 // 20MB before compression

export default function UploadZone({ uploadedImage, onUpload }) {
  const [error, setError] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    setError(null)

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File is too large. Max 20MB.')
      } else {
        setError('Invalid file type. Please upload JPG, PNG, or WEBP.')
      }
      return
    }

    if (!acceptedFiles.length) return

    const file = acceptedFiles[0]
    setIsProcessing(true)

    try {
      const compressed = await compressImage(file)
      const base64 = await fileToBase64(compressed)
      onUpload(base64)
    } catch {
      setError('Failed to process image. Please try another file.')
    } finally {
      setIsProcessing(false)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE_BYTES,
    multiple: false,
  })

  const borderColor = isDragReject
    ? 'border-red-500'
    : isDragActive
    ? 'border-[#E63946]'
    : uploadedImage
    ? 'border-[#E63946]/50'
    : 'border-white/15'

  return (
    <div>
      <div
        {...getRootProps()}
        aria-label="Upload image drop zone"
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${borderColor} ${
          isDragActive ? 'bg-[#E63946]/5 scale-[1.01]' : 'bg-white/3 hover:bg-white/5'
        } ${isDragActive ? 'animate-pulse-glow' : ''}`}
        style={isDragActive ? { boxShadow: '0 0 40px rgba(230,57,70,0.25)' } : {}}
      >
        <input {...getInputProps()} aria-label="File input" />

        <AnimatePresence mode="wait">
          {uploadedImage ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <img
                src={uploadedImage}
                alt="Uploaded image preview"
                className="w-full max-h-72 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                <span className="text-sm font-semibold text-white bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
                  Click to change image
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 px-8 text-center"
            >
              {isProcessing ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-2 border-[#E63946] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-white/50">Processing image…</p>
                </div>
              ) : (
                <>
                  <motion.div
                    animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                    className="w-14 h-14 mb-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="#E63946" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 16.7C21.2 15.9 22 14.5 22 13C22 10.8 20.2 9 18 9C17.8 9 17.5 9 17.3 9.1C16.7 6.7 14.5 5 12 5C9 5 6.5 7.5 6.5 10.5C6.5 10.7 6.5 10.8 6.5 11C4.5 11.7 3 13.7 3 16C3 18.8 5.2 21 8 21H17C18.7 21 20.1 20 20.7 18.6" stroke="#E63946" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </motion.div>

                  <p className="text-base font-semibold text-[#F0EDE8] mb-1">
                    {isDragActive ? 'Drop it here' : 'Drag & drop your photo'}
                  </p>
                  <p className="text-sm text-white/35 mb-3">or click to browse</p>
                  <p className="text-xs text-white/25">JPG, PNG, WEBP · Auto-compressed if over 4MB</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-2 text-sm text-red-400 flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 4.5V7.5M7 9.5V9.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
