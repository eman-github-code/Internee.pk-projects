// server/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // can assign multiple interns
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin
  dueDate: Date,
  status: { type: String, enum: ['pending','in-progress','completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
