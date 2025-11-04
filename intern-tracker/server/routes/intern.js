// server/routes/intern.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const internController = require('../controllers/taskController');
const submissionController = require('../controllers/submissionController');

router.use(protect);

// tasks for logged intern
router.get('/tasks', internController.tasksForIntern);

// submission (file upload)
router.post('/submit', upload.array('files', 5), submissionController.createSubmission);

module.exports = router;
