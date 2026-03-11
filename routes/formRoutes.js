const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

const { uploadCloud } = require('../middleware/cloudinaryConfig');

router.post('/submit', uploadCloud.array('documents', 5), formController.submitForm);
router.get('/', formController.getAllForms);
router.get('/:id', formController.getFormById);
router.patch('/:id/payment', formController.updatePayment);
router.patch('/:id/status', formController.updateFormStatus);
router.patch('/:id/notes', formController.updateFormNotes);
router.get('/track/:customerId', formController.trackApplication);
router.delete('/purge', formController.purgeCompletedForms);
router.delete('/:id', formController.deleteForm);

module.exports = router;
