const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/pdfs', express.static(path.join(__dirname, 'generated-pdfs')));

// Generate PDF Resume
app.post('/api/resume', (req, res) => {
  const { name, email, phone, skills, education, experience } = req.body;

  const doc = new PDFDocument();
  const filePath = `generated-pdfs/${name.replace(' ', '_')}_${Date.now()}.pdf`;
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(24).text(name, { align: 'center' });
  doc.fontSize(12).text(`Email: ${email} | Phone: ${phone}`, { align: 'center' });
  doc.moveDown();

  doc.fontSize(16).text('Skills:', { underline: true });
  doc.fontSize(12).text(skills.join(', '));
  doc.moveDown();

  doc.fontSize(16).text('Education:', { underline: true });
  education.forEach(ed => {
    doc.fontSize(12).text(`${ed.degree} at ${ed.institution} (${ed.year})`);
  });
  doc.moveDown();

  doc.fontSize(16).text('Experience:', { underline: true });
  experience.forEach(exp => {
    doc.fontSize(12).text(`${exp.role} at ${exp.company} (${exp.duration})`);
    doc.fontSize(12).text(exp.description);
    doc.moveDown(0.5);
  });

  doc.end();

  doc.on('finish', () => {
    res.json({ url: `http://localhost:5000/${filePath}` });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
