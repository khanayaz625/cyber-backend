const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        
        // Clear all admins just in case
        await Admin.deleteMany({});
        console.log('Cleared existing admins');

        const defaultUser = process.env.ADMIN_USERNAME || 'admin';
        const defaultPass = process.env.ADMIN_PASSWORD || 'admin123';
        
        const newAdmin = new Admin({
            username: defaultUser,
            password: defaultPass
        });
        
        await newAdmin.save();
        console.log(`[SUCCESS] Admin created manually: ${defaultUser} / ${defaultPass}`);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

createAdmin();
