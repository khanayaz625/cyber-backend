const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`[AUTH] Login attempt for: ${username}`);
    
    // Check if any admin exists, if not create one from env
    let adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('[AUTH] No admin found in DB. Creating default admin...');
      const defaultUser = process.env.ADMIN_USERNAME || 'admin';
      const defaultPass = process.env.ADMIN_PASSWORD || 'admin123';
      const initialAdmin = new Admin({ username: defaultUser, password: defaultPass });
      await initialAdmin.save();
      console.log(`[AUTH] Default admin created: ${defaultUser}`);
    }

    // Now find the specific admin by username provided
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log(`[AUTH] Admin not found for username: ${username}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      console.log(`[AUTH] Login successful for: ${username}`);
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      console.log(`[AUTH] Password mismatch for: ${username}`);
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('[AUTH] ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.updateCredentials = async (req, res) => {
  try {
    const { newUsername, newPassword } = req.body;

    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    if (newUsername) admin.username = newUsername;
    if (newPassword) admin.password = newPassword;

    await admin.save();
    res.json({ message: 'Credentials updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
