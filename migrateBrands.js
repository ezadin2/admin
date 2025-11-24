const mongoose = require('mongoose');
const Brand = require('./models/brand'); // adjust path if needed

mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(async () => {
        console.log('Connected to MongoDB');

        const brands = await Brand.find();

        for (const brand of brands) {
            // Clean brandCategories safely
            brand.brandCategories = brand.brandCategories
                .map(cat => {
                    const { buffer, ...rest } = cat.toObject();
                    // Only keep subdocuments that have a name
                    if (!rest.name) {
                        console.log(`Skipping invalid category in brand ${brand._id}`);
                        return null;
                    }
                    return rest;
                })
                .filter(Boolean); // remove null entries

            await brand.save();
            console.log(`Updated brand: ${brand._id}`);
        }

        console.log('Migration completed');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
