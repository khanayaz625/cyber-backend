const FormRequest = require('../models/FormRequest');

exports.submitForm = async (req, res) => {
  try {
    console.log('--- Form Submission Start ---');
    let { fullName, email, phone, whatsapp, serviceType, details } = req.body;

    // transform name to uppercase as per user request
    if (fullName) {
      fullName = fullName.toUpperCase();
    }

    console.log('Form Body:', { fullName, phone, serviceType });

    let documents = [];
    if (req.files && Array.isArray(req.files)) {
      documents = req.files.map(file => file.path);
      console.log('Files received:', documents.length);
    } else {
      console.log('No files received or req.files is not an array');
    }

    if (!fullName || !phone || !serviceType) {
      console.log('Validation Failed: Missing required fields');
      return res.status(400).json({ message: 'Full Name, Phone, and Service Type are required.' });
    }

    const newFormRequest = new FormRequest({
      fullName, email, phone, whatsapp, serviceType, details, documents
    });

    const savedRequest = await newFormRequest.save();
    console.log('Form saved successfully to DB:', savedRequest._id);
    console.log('--- Form Submission Success ---');
    res.status(201).json(savedRequest);
  } catch (err) {
    console.error('CRITICAL ERROR in submitForm:', err);

    res.status(500).json({
      message: 'Server error processing your request: ' + err.message,
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
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
    const { id } = req.params;
    const { status } = req.body;
    console.log(`[STATUS] Attempting update for ID: ${id} to ${status}`);

    const updatedForm = await FormRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedForm) {
      console.log(`[STATUS] Record not found for ID: ${id}`);
      return res.status(404).json({ message: 'Application record not found' });
    }

    console.log(`[STATUS] Successfully updated ID: ${id} to ${status}`);
    res.json(updatedForm);
  } catch (err) {
    console.error(`[STATUS] ERROR updating ID: ${req.params.id}:`, err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.updateFormNotes = async (req, res) => {
  try {
    const updatedForm = await FormRequest.findByIdAndUpdate(
      req.params.id,
      { notes: req.body.notes },
      { new: true }
    );
    res.json(updatedForm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { paidAmount, totalAmount, paymentMethod } = req.body;

    const form = await FormRequest.findById(id);
    if (!form) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (paidAmount !== undefined) form.paidAmount = Number(paidAmount);
    if (totalAmount !== undefined) form.totalAmount = Number(totalAmount);
    if (paymentMethod !== undefined) form.paymentMethod = paymentMethod;

    const updated = await form.save();
    res.json(updated);
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

exports.purgeCompletedForms = async (req, res) => {
  try {
    const result = await FormRequest.deleteMany({ status: 'Completed' });
    res.json({ message: `Successfully deleted ${result.deletedCount} completed records`, count: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.trackApplication = async (req, res) => {
  try {
    const { customerId } = req.params;
    const application = await FormRequest.findOne({ customerId: customerId.toUpperCase() })
      .select('fullName serviceType status createdAt customerId notes paidAmount totalAmount phone paymentMethod');

    if (!application) {
      return res.status(404).json({ message: 'No application found with this tracking ID' });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
