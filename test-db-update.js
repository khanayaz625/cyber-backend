const mongoose = require('mongoose');
const FormRequest = require('./models/FormRequest');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const testUpdate = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        const id = '69b017052e9a65675ad0ac10';
        const updated = await FormRequest.findByIdAndUpdate(
            id,
            { totalAmount: 111, paidAmount: 111, paymentMethod: 'Online' },
            { new: true }
        );
        console.log('Updated:', updated);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

testUpdate();
