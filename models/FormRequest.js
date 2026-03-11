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
  paidAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ['Cash', 'Online', 'Pending'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook to ensure customerId is always generated if missing
formRequestSchema.pre('save', async function() {
  if (!this.customerId) {
    const nanoId = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.customerId = `JC-${nanoId}-${Date.now().toString().slice(-4)}`;
  } else if (typeof this.customerId === 'string') {
    this.customerId = this.customerId.toUpperCase();
  }
});

module.exports = mongoose.model('FormRequest', formRequestSchema);
