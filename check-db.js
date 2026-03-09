const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkAdmins = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        const admins = await Admin.find({});
        console.log(`Found ${admins.length} admins:`);
        admins.forEach(a => {
            console.log(`Username: ${a.username}, Password (hashed): ${a.password}`);
        });
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

checkAdmins();
