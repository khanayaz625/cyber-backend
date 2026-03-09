const mongoose = require('mongoose');
const FormRequest = require('./models/FormRequest');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkForms = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        const forms = await FormRequest.find({});
        console.log(`Found ${forms.length} forms:`);
        forms.forEach(f => {
            console.log(`ID: ${f._id}, Name: ${f.fullName}, Status: ${f.status}`);
        });
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

checkForms();
