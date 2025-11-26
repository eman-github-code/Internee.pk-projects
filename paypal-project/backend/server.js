// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.error(err));

// mount routes (will add below)
const payments = require('./routes/payments');
const users = require('./routes/users');
app.use('/api/payments', payments);
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server ${PORT}`));
