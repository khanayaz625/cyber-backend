const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    lastDate: { type: String, required: true },
    applyLink: { type: String, required: true },
    documentRequired: { type: String, required: true },
    fee: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);
