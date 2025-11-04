// server/middlewares/errorHandler.js
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
};
