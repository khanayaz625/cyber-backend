const mongoose = require('mongoose');
const FormRequest = require('./models/FormRequest');
require('dotenv').config();

const doctor = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('--- DATABASE DOCTOR ---');

        // 1. Check for missing customerIds
        const missingIds = await FormRequest.find({ $or: [{ customerId: { $exists: false } }, { customerId: null }, { customerId: '' }] });
        console.log(`Found ${missingIds.length} records missing customerId.`);

        for (const record of missingIds) {
            const nanoId = Math.random().toString(36).substring(2, 6).toUpperCase();
            const customerId = `JC-${nanoId}-${Date.now().toString().slice(-4)}`;
            record.customerId = customerId;
            await record.save();
            console.log(`Fixed record ${record.fullName} with ID ${customerId}`);
        }

        // 2. Check for duplicate customerIds
        const allIds = await FormRequest.find({}, 'customerId');
        const idMap = {};
        for (const r of allIds) {
            if (r.customerId) {
                if (idMap[r.customerId]) {
                    console.log(`CRITICAL: Duplicate customerId found: ${r.customerId}`);
                }
                idMap[r.customerId] = true;
            }
        }

        // 3. Check for invalid numbers in financial fields
        const invalidFinance = await FormRequest.find({
            $or: [
                { totalAmount: { $type: 'string' } },
                { paidAmount: { $type: 'string' } }
            ]
        });
        console.log(`Found ${invalidFinance.length} records with string financial fields.`);
        for (const record of invalidFinance) {
            record.totalAmount = Number(record.totalAmount) || 0;
            record.paidAmount = Number(record.paidAmount) || 0;
            await record.save();
            console.log(`Fixed financial fields for ${record.fullName}`);
        }

        console.log('Doctor report complete.');
        process.exit(0);
    } catch (err) {
        console.error('Doctor failed:', err);
        process.exit(1);
    }
};

doctor();
