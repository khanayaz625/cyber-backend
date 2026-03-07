const FormRequest = require('../models/FormRequest');

exports.submitForm = async (req, res) => {
  try {
    const { fullName, email, phone, whatsapp, serviceType, details } = req.body;
    const documents = req.files.map(file => file.path);
    const newFormRequest = new FormRequest({
      fullName, email, phone, whatsapp, serviceType, details, documents
    });
    const savedRequest = await newFormRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const forms = await FormRequest.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const form = await FormRequest.findById(req.params.id);
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFormStatus = async (req, res) => {
  try {
    const updatedForm = await FormRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updatedForm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const deletedForm = await FormRequest.findByIdAndDelete(req.params.id);
    if (!deletedForm) return res.status(404).json({ message: 'Form not found' });
    res.json({ message: 'Form deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
