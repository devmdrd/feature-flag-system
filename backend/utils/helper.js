const jwt = require('jsonwebtoken');
const { EMAIL_RE, DEFAULT_JWT_EXPIRES_IN } = require('./constants');

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: DEFAULT_JWT_EXPIRES_IN });
}

function validateEmail(email) {
  return EMAIL_RE.test(email) ? null : 'Invalid email format';
}

module.exports = { signToken, validateEmail };
