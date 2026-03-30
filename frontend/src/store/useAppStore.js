import { create } from 'zustand'

const useAppStore = create((set) => ({
  uploadedImage: null,      // base64 string
  selectedStyle: null,      // style ID e.g. 'studio-ghibli'
  transformedImage: null,   // URL returned from API
  isLoading: false,         // loading state
  step: 1,                  // 1 | 2 | 3
  error: null,

  setUploadedImage: (image) => set({ uploadedImage: image, step: image ? 2 : 1 }),
  setSelectedStyle: (style) => set({ selectedStyle: style }),
  setTransformedImage: (url) => set({ transformedImage: url, step: 3 }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({
    uploadedImage: null,
    selectedStyle: null,
    transformedImage: null,
    isLoading: false,
    step: 1,
    error: null,
  }),
}))

export default useAppStore
