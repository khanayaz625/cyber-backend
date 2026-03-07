const mongoose = require('mongoose');

const formRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  whatsapp: { type: String },
  serviceType: { type: String, required: true },
  details: { type: String },
  documents: [{ type: String }], // Array of file paths/filenames
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FormRequest', formRequestSchema);
