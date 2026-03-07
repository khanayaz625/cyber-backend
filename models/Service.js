const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, default: 'FileText' },
  price: { type: Number, default: 0 }
});

module.exports = mongoose.model('Service', serviceSchema);
