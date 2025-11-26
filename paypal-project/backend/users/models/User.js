const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  provider: String, // 'paypal' or 'stripe'
  transactionId: String,
  amount: Number,
  currency: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  premium: { type: Boolean, default: false },
  payments: [paymentSchema]
});

module.exports = mongoose.model('User', userSchema);
