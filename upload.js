const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer memory storage (store files in memory for Cloudinary upload)
const storage = multer.memoryStorage();

// Export multer upload instances for different media types
// Use 'file' as the field name to match Flutter frontend
const uploadCategory = multer({ storage });
const uploadProduct = multer({ storage });
const uploadBrand = multer({ storage });
const uploadBanner = multer({ storage });

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = {
  uploadCategory,
  uploadProduct,
  uploadBrand,
  uploadBanner,
  uploadToCloudinary,
  cloudinary
};



