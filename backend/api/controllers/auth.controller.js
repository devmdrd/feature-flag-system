const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken, validateEmail } = require('../../utils/helper');
const { BCRYPT_SALT_ROUNDS, MIN_PASSWORD_LENGTH, PASSWORD_UPPERCASE_RE, PASSWORD_NUMBER_RE, PASSWORD_SPECIAL_RE } = require('../../utils/constants');

exports.superLogin = function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const emailMatch = email === process.env.SUPER_ADMIN_EMAIL;
  const passMatch = password === process.env.SUPER_ADMIN_PASSWORD;

  if (emailMatch && passMatch) {
    const token = signToken({ role: 'super_admin', email });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid credentials' });
};

exports.signup = async function (req, res) {
  try {
    const { email, password, organizationId } = req.body;

    if (!email || !password || !organizationId) {
      return res.status(400).json({ error: 'email, password and organizationId are required' });
    }

    const emailError = validateEmail(email);
    if (emailError) return res.status(400).json({ error: emailError });

    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    }
    if (!PASSWORD_UPPERCASE_RE.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one uppercase letter' });
    }
    if (!PASSWORD_NUMBER_RE.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one number' });
    }
    if (!PASSWORD_SPECIAL_RE.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one special character' });
    }

    const hashed = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const user = await User.create({ email, password: hashed, organizationId });
    const token = signToken({ role: 'org_admin', userId: user.id, organizationId: user.organizationId });

    res.status(201).json({ token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const emailError = validateEmail(email);
    if (emailError) return res.status(400).json({ error: emailError });

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken({ role: 'org_admin', userId: user.id, organizationId: user.organizationId });
    res.json({ token });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
};
