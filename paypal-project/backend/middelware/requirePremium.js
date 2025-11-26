// middleware/requirePremium.js
module.exports = function requirePremium(req, res, next) {
  // assumes req.user is set by earlier auth middleware
  if (req.user && req.user.premium) return next();
  return res.status(403).json({ error: 'Premium access required' });
};
