// server/models/Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  intern: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  files: [String], // file paths
  comment: String,
  feedback: String,
  grade: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
