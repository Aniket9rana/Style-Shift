export const styleCategories = ['All', 'Cinema', 'Animation', 'Art', 'Era']

export const stylePrompts = {
  // Cinema
  'netflix-dark': {
    name: 'Netflix Dark',
    emoji: '🎥',
    descriptor: 'High contrast drama',
    category: 'Cinema',
    prompt: 'Netflix cinematic style, high contrast, desaturated tones, dramatic shadows, film grain, moody atmosphere',
    negativePrompt: 'cartoon, anime, bright, flat, overexposed',
  },
  'nolan-film': {
    name: 'Nolan Film',
    emoji: '🎬',
    descriptor: 'IMAX cinematic grade',
    category: 'Cinema',
    prompt: 'Christopher Nolan IMAX style, teal-orange color grade, anamorphic lens flares, grand scale, sharp details',
    negativePrompt: 'cartoon, anime, bright, flat',
  },
  'wes-anderson': {
    name: 'Wes Anderson',
    emoji: '🎨',
    descriptor: 'Pastel symmetry',
    category: 'Cinema',
    prompt: 'Wes Anderson film style, perfectly symmetrical composition, pastel palette, whimsical, vintage color grade',
    negativePrompt: 'dark, gritty, realistic, desaturated',
  },
  'tarantino': {
    name: 'Tarantino',
    emoji: '💥',
    descriptor: 'Pulp grindhouse',
    category: 'Cinema',
    prompt: 'Quentin Tarantino film style, grindhouse aesthetic, retro 70s film grain, saturated colors, dramatic lighting',
    negativePrompt: 'clean, modern, soft, anime',
  },

  // Animation
  'studio-ghibli': {
    name: 'Studio Ghibli',
    emoji: '🌿',
    descriptor: 'Dreamy watercolor anime',
    category: 'Animation',
    prompt: 'Studio Ghibli style, soft watercolor, lush greens, hand-drawn, warm gentle lighting, magical realism',
    negativePrompt: 'realistic, dark, gritty, photography',
  },
  'anime': {
    name: 'Anime',
    emoji: '⚡',
    descriptor: 'Vibrant cel shading',
    category: 'Animation',
    prompt: 'Anime art style, cel shading, vibrant colors, detailed line art, dramatic lighting, expressive',
    negativePrompt: 'realistic, photographic, muted, dull',
  },
  'pixar-3d': {
    name: 'Pixar 3D',
    emoji: '✨',
    descriptor: 'Polished CGI character',
    category: 'Animation',
    prompt: 'Pixar 3D animation style, clean render, subsurface scattering, warm studio lighting, polished details',
    negativePrompt: 'flat, 2D, sketch, rough, dark',
  },
  'disney-classic': {
    name: 'Disney Classic',
    emoji: '🏰',
    descriptor: 'Golden age hand-drawn',
    category: 'Animation',
    prompt: 'Classic Disney animation style, 1950s golden age, hand-painted watercolor backgrounds, warm storybook colors',
    negativePrompt: 'modern, 3D, digital, dark, gritty',
  },

  // Art
  'van-gogh': {
    name: 'Van Gogh',
    emoji: '🌻',
    descriptor: 'Swirling post-impressionism',
    category: 'Art',
    prompt: 'Vincent van Gogh oil painting style, swirling brushstrokes, impasto texture, vivid yellows and blues, emotional intensity',
    negativePrompt: 'photo, realistic, smooth, digital',
  },
  'monet': {
    name: 'Monet',
    emoji: '🌸',
    descriptor: 'Soft impressionist light',
    category: 'Art',
    prompt: 'Claude Monet impressionist painting, soft dappled light, loose brushwork, pastel tones, plein air quality',
    negativePrompt: 'sharp, realistic, dark, digital',
  },
  'watercolor': {
    name: 'Watercolor',
    emoji: '💧',
    descriptor: 'Flowing transparent washes',
    category: 'Art',
    prompt: 'Fine art watercolor painting, transparent washes, soft edges, paper texture, delicate color blooms, fluid',
    negativePrompt: 'digital, sharp, opaque, dark, photographic',
  },
  'cyberpunk-art': {
    name: 'Cyberpunk Art',
    emoji: '🌆',
    descriptor: 'Neon dystopian city',
    category: 'Art',
    prompt: 'Cyberpunk digital art, neon lights, rain-slicked streets, retrofuturism, pink-purple-cyan palette, dystopian urban',
    negativePrompt: 'natural, warm, soft, watercolor, vintage',
  },

  // Era
  '80s-retro': {
    name: '80s Retro',
    emoji: '📺',
    descriptor: 'Synthwave nostalgia',
    category: 'Era',
    prompt: '1980s retro aesthetic, synthwave colors, VHS grain, neon pink and teal, vintage chrome text, arcade nostalgia',
    negativePrompt: 'modern, clean, muted, realistic',
  },
  'vaporwave': {
    name: 'Vaporwave',
    emoji: '🌊',
    descriptor: 'Pastel surrealist dream',
    category: 'Era',
    prompt: 'Vaporwave aesthetic, pastel pink and purple, glitch art, Greek statues, retro computing, surreal dreamlike',
    negativePrompt: 'dark, realistic, natural, warm',
  },
  'film-noir': {
    name: 'Film Noir',
    emoji: '🕵️',
    descriptor: 'Black & white crime',
    category: 'Era',
    prompt: 'Classic film noir style, black and white, dramatic chiaroscuro lighting, deep shadows, 1940s detective aesthetic',
    negativePrompt: 'color, bright, modern, cheerful, cartoon',
  },
  'renaissance': {
    name: 'Renaissance',
    emoji: '🖼️',
    descriptor: 'Old masters oil painting',
    category: 'Era',
    prompt: 'Renaissance oil painting, old masters technique, chiaroscuro, warm candlelight, dramatic drapery, classical composition',
    negativePrompt: 'modern, flat, digital, cartoon, anime',
  },
}

export const styleList = Object.entries(stylePrompts).map(([id, data]) => ({
  id,
  ...data,
}))
