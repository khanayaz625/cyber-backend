const mongoose = require('mongoose');

const formRequestSchema = new mongoose.Schema({
  customerId: { type: String, unique: true, sparse: true },
  fullName: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  whatsapp: { type: String },
  serviceType: { type: String, required: true },
  details: { type: String },
  documents: [{ type: String }], // Array of file paths/filenames
  status: { type: String, enum: ['Pending', 'Processing', 'Verification', 'Completed', 'Rejected'], default: 'Pending' },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FormRequest', formRequestSchema);
