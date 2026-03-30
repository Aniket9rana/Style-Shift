const express = require('express');
const router = express.Router();

const rateLimiter = require('../middleware/rateLimiter');
const validateRequest = require('../middleware/validateRequest');
const { transformImage } = require('../services/geminiService');
const { uploadBoth } = require('../services/cloudinaryService');
const stylePrompts = require('../utils/stylePrompts');

router.post('/transform', validateRequest, rateLimiter, async (req, res) => {
  const startTime = Date.now();
  const { image, style } = req.body;
  const { prompt, negativePrompt } = stylePrompts[style];

  // Generate styled image with Gemini
  let transformedBase64;
  try {
    transformedBase64 = await transformImage(image, prompt, negativePrompt);
  } catch (err) {
    console.error('Gemini error:', err.message);
    if (err.message === 'QUOTA_EXCEEDED') {
      return res.status(402).json({
        success: false,
        error: 'QUOTA_EXCEEDED',
        message: 'API credits required. Please enable billing on Google AI Studio to use image generation.'
      });
    }
    return res.status(502).json({
      success: false,
      error: 'API_ERROR',
      message: 'Image transformation failed. Please try again.'
    });
  }

  // Upload both to Cloudinary
  let urls;
  try {
    urls = await uploadBoth(image, transformedBase64);
  } catch (err) {
    console.error('Cloudinary error:', err.message);
    return res.status(502).json({
      success: false,
      error: 'STORAGE_ERROR',
      message: 'Failed to store images. Please try again.'
    });
  }

  res.json({
    success: true,
    originalUrl: urls.originalUrl,
    transformedUrl: urls.transformedUrl,
    style,
    processingTime: Date.now() - startTime
  });
});

module.exports = router;
