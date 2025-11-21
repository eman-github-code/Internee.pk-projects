const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../models/Project');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Create a project
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const project = new Project({
      title,
      description,
      tags: tags ? tags.split(',') : [],
      imageUrl: req.file ? req.file.filename : ''
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
