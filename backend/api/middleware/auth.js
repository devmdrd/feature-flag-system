const jwt = require('jsonwebtoken');

const authenticate = (role) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    const isAuthorized = req.user.role === role || req.user.role === 'super_admin';
    if (!isAuthorized) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
