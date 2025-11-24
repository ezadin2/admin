const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Image = require('../models/image');
const {
  uploadCategory,
  uploadProduct,
  uploadBrand,
  uploadBanner,
  uploadToCloudinary,
  cloudinary
} = require('../upload');

// Helper to create Image document
const createImageDocument = async (result, folder, mediaCategory) => {
  const image = new Image({
    url: result.secure_url,
    folder,
    fileName: result.original_filename || result.public_id,
    sizeBytes: result.bytes,
    fullPath: result.public_id,
    contentType: result.format,
    mediaCategory
  });
  await image.save();
  return image;
};

// ----- UPLOAD ROUTES -----
router.post('/categories', uploadCategory.single('file'), asyncHandler(async (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: 'No file uploaded' });

  const result = await uploadToCloudinary(req.file.buffer, 'categories');
  const image = await createImageDocument(result, 'categories', 'categories');

  res.json({ success: true, message: 'Category image uploaded', data: image });
}));

router.post('/products', uploadProduct.single('file'), asyncHandler(async (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: 'No file uploaded' });

  const result = await uploadToCloudinary(req.file.buffer, 'products');
  const image = await createImageDocument(result, 'products', 'products');

  res.json({ success: true, message: 'Product image uploaded', data: image });
}));
// ----- USERS UPLOAD -----
router.post('/users', uploadCategory.single('file'), asyncHandler(async (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: 'No file uploaded' });

  const result = await uploadToCloudinary(req.file.buffer, 'users');
  const image = await createImageDocument(result, 'users', 'users');

  res.json({ success: true, message: 'User image uploaded', data: image });
}));

router.post('/brands', uploadBrand.single('file'), asyncHandler(async (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: 'No file uploaded' });

  const result = await uploadToCloudinary(req.file.buffer, 'brands');
  const image = await createImageDocument(result, 'brands', 'brands');

  res.json({ success: true, message: 'Brand image uploaded', data: image });
}));

router.post('/banners', uploadBanner.single('file'), asyncHandler(async (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: 'No file uploaded' });

  const result = await uploadToCloudinary(req.file.buffer, 'banners');
  const image = await createImageDocument(result, 'banners', 'banners');

  res.json({ success: true, message: 'Banner image uploaded', data: image });
}));

// ----- GET ALL IMAGES -----
router.get('/', asyncHandler(async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.json({ success: true, message: 'Images retrieved successfully', data: images });
}));

// GET BY MEDIA CATEGORY
router.get('/by-category/:mediaCategory', asyncHandler(async (req, res) => {
  const { mediaCategory } = req.params;
  const images = await Image.find({ mediaCategory }).sort({ createdAt: -1 });
  res.json({ success: true, message: 'Images retrieved successfully', data: images });
}));

// ----- GET BY ID -----
router.get('/:id', asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (!image) return res.status(404).json({ success: false, message: 'Image not found' });
  res.json({ success: true, message: 'Image retrieved successfully', data: image });
}));

// ----- UPDATE -----
router.put('/:id', asyncHandler(async (req, res) => {
  const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedImage) return res.status(404).json({ success: false, message: 'Image not found' });
  res.json({ success: true, message: 'Image updated successfully', data: updatedImage });
}));

// ----- DELETE -----
router.delete('/:id', asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (!image) return res.status(404).json({ success: false, message: 'Image not found' });

  await cloudinary.uploader.destroy(image.fullPath);
  await Image.findByIdAndDelete(req.params.id);

  res.json({ success: true, message: 'Image deleted successfully', data: image });
}));

module.exports = router;
