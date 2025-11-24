const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User'); // adjust path if needed

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open', async () => {
    console.log('Connected to Database');

    try {
        const adminExists = await User.findOne({ email: 'admin@example.com' });
        if (adminExists) {
            console.log('Admin already exists:', adminExists);
        } else {
            const admin = new User({
                firstName: 'Admin',
                lastName: 'User',
                username: 'admin',
                email: 'admin@example.com',
                password: 'Admin@123', // saved as plain text for now
                phoneNumber: '1234567890',
                role: 'admin',
                profilePicture: ''
            });
            await admin.save();
            console.log('Default admin created:', admin);
        }
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.connection.close();
    }
});
