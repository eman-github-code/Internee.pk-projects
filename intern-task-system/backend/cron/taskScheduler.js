const cron = require("node-cron");
const Task = require("../models/Task");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

cron.schedule("0 9 * * *", async () => {
  console.log("Running daily task reminder job...");

  const tasks = await Task.find({ status: "Pending" });

  tasks.forEach(task => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: task.assignedTo,
      subject: `Reminder: Task "${task.title}" is still pending`,
      text: `You have a pending task:\n\n${task.description}\n\nDue Date: ${task.dueDate}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log("Reminder sent:", info.response);
    });
  });
});

module.exports = {};
