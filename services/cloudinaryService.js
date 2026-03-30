const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImage(imageSource) {
  const result = await cloudinary.uploader.upload(imageSource, {
    folder: 'styleshift'
  });
  return result.secure_url;
}

async function uploadBoth(originalBase64, transformedUrl) {
  const [originalUrl, transformedSecureUrl] = await Promise.all([
    uploadImage(originalBase64),
    uploadImage(transformedUrl)
  ]);
  return { originalUrl, transformedUrl: transformedSecureUrl };
}

module.exports = { uploadImage, uploadBoth };
