// server/utils/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/db');

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  const existing = await User.findOne({ email: 'admin@company.com' });
  if (existing) return process.exit();
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('password123', salt);
  const admin = await User.create({ name: 'Admin', email: 'admin@company.com', password: hashed, role: 'admin' });
  console.log('Admin created', admin.email);
  process.exit();
};

run();
