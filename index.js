const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/user');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Static folders
app.use('/image/products', express.static('public/products'));
app.use('/image/category', express.static('public/category'));
app.use('/image/brand', express.static('public/brand'));
app.use('/image/banner', express.static('public/banner'));

// ------------------------------------
async function createDefaultAdmin() {
  try {
    const adminEmail = "admin@gmail.com";
    const existingAdmin = await User.findOne({ Email: adminEmail });

    if (!existingAdmin) {
      const admin = new User({
        FirstName: "Admin",
        LastName: "Super",
        UserName: "admin",
        Email: adminEmail,
        Password: "12345678",
        Role: "admin"
      });

      await admin.save();
      console.log("Default admin created.");
    } else {
      console.log("Default admin already exists.");
    }
  } catch (err) {
    console.error("Error creating default admin:", err);
  }
}
// ------------------------------------

// Database connection
const URL = process.env.MONGO_URL;
mongoose.connect(URL);

const db = mongoose.connection;

db.on('error', (error) => console.error(error));

db.once('open', async () => {
  console.log('Connected to Database');
  await createDefaultAdmin();
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/forget-Password', require('./routes/auth'));
app.use('/reset-Password', require('./routes/auth'));
app.use('/logout', require('./routes/auth'));

app.use('/dashboard', require('./routes/dashboard'));
app.use('/media', require('./routes/media'));

app.use('/banners', require('./routes/banner'));
app.use('/createBanner', require('./routes/banner'));
app.use('/editBanner', require('./routes/banner'));

app.use('/products', require('./routes/product'));
app.use('/createProducts', require('./routes/product'));
app.use('/editProducts', require('./routes/product'));

app.use('/categories', require('./routes/category'));
app.use('/createCategory', require('./routes/category'));
app.use('/editCategory', require('./routes/category'));

app.use('/brands', require('./routes/brand'));
app.use('/createBrand', require('./routes/brand'));
app.use('/editBrand', require('./routes/brand'));

app.use('/brandCategories', require('./routes/brandCategories'));

app.use('/orders', require('./routes/order'));
app.use('/orderDetails', require('./routes/order'));

app.use('/settings', require('./routes/settings'));
app.use('/profile', require('./routes/user'));

app.get('/', asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'API working successfully', data: null });
}));

app.use('/users', require('./routes/user'));

// Global error handler
app.use((error, req, res, next) => {
  res.status(500).json({ success: false, message: error.message, data: null });
});

// Corrected Render-friendly server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
