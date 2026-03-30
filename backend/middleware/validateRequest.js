const stylePrompts = require('../utils/stylePrompts');

module.exports = (req, res, next) => {
  const { image, style } = req.body;

  if (!image || !image.startsWith('data:image/')) {
    return res.status(400).json({
      success: false,
      error: 'INVALID_IMAGE',
      message: 'A valid base64-encoded image is required'
    });
  }

  // Check base64 size (base64 string length * 0.75 ≈ bytes)
  const base64Data = image.split(',')[1] || '';
  const sizeInBytes = Math.ceil(base64Data.length * 0.75);
  const tenMB = 10 * 1024 * 1024;
  if (sizeInBytes > tenMB) {
    return res.status(400).json({
      success: false,
      error: 'INVALID_IMAGE',
      message: 'Image must be under 10MB'
    });
  }

  if (!style || !stylePrompts[style]) {
    return res.status(400).json({
      success: false,
      error: 'UNSUPPORTED_STYLE',
      message: `Style "${style}" is not supported. Valid styles: ${Object.keys(stylePrompts).join(', ')}`
    });
  }

  next();
};
