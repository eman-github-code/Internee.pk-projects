// server/controllers/taskController.js
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;
  const task = await Task.create({ title, description, assignedTo, dueDate, createdBy: req.user._id });
  // notify assigned interns via socket
  const io = req.app.get('io');
  if (task.assignedTo && IoAvailable(io)) {
    task.assignedTo.forEach(id => io.to(String(id)).emit('task:assigned', task));
  }
  return res.status(201).json(task);
};

exports.listTasks = async (req, res) => {
  const tasks = await Task.find().populate('assignedTo','name email').populate('createdBy','name email');
  res.json(tasks);
};

exports.tasksForIntern = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id }).populate('createdBy','name email');
  res.json(tasks);
};

function IoAvailable(io) {
  return io && typeof io.to === 'function';
}
