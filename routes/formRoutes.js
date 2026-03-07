const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/submit', upload.array('documents', 5), formController.submitForm);
router.get('/', formController.getAllForms);
router.get('/:id', formController.getFormById);
router.patch('/:id/status', formController.updateFormStatus);
router.delete('/:id', formController.deleteForm);

module.exports = router;
