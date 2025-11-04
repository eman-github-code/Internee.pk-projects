// server/server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const internRoutes = require('./routes/intern');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const server = http.createServer(app);

// Socket.io setup
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || '*' }
});

// make io available in routes/controllers
app.set('io', io);

// middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/intern', internRoutes);

// static uploads
app.use('/uploads', express.static(process.env.UPLOAD_DIR || 'uploads'));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB connection failed', err);
    process.exit(1);
  });

// socket.io events (basic)
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });
  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});
