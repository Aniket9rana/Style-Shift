import imageCompression from 'browser-image-compression'

const MAX_SIZE_MB = 4
const MAX_WIDTH_PX = 1920

export async function compressImage(file) {
  if (file.size / 1024 / 1024 <= MAX_SIZE_MB) {
    return file
  }

  const options = {
    maxSizeMB: MAX_SIZE_MB,
    maxWidthOrHeight: MAX_WIDTH_PX,
    useWebWorker: true,
    fileType: file.type,
  }

  const compressed = await imageCompression(file, options)
  return compressed
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
