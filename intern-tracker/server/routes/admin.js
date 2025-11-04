// server/routes/admin.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/role');

const adminController = require('../controllers/internController');
const taskController = require('../controllers/taskController');

router.use(protect, isAdmin);

// interns
router.post('/interns', adminController.createIntern);
router.get('/interns', adminController.listInterns);

// tasks
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.listTasks);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
