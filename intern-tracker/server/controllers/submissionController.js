// server/controllers/submissionController.js
const Submission = require('../models/Submission');
const Task = require('../models/Task');

exports.createSubmission = async (req, res) => {
  const { task: taskId, comment } = req.body;
  const files = (req.files || []).map(f => `/${process.env.UPLOAD_DIR || 'uploads'}/${f.filename}`);
  const sub = await Submission.create({
    task: taskId,
    intern: req.user._id,
    files,
    comment
  });

  // update task status optionally
  await Task.findByIdAndUpdate(taskId, { status: 'in-progress' });

  // Emit via socket
  const io = req.app.get('io');
  if (io) {
    io.to('admins').emit('submission:created', sub); // admins room
    io.to(String(req.user._id)).emit('submission:ack', sub); // intern's own room
  }

  res.status(201).json(sub);
};
