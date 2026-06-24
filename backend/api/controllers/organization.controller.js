const Organization = require('../models/Organization');
const { MAX_NAME_LENGTH } = require('../../utils/constants');

exports.list = async function (req, res) {
  try {
    const orgs = await Organization.findAll({ order: [['name', 'ASC']] });
    res.json(orgs);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.create = async function (req, res) {
  try {
    const name = (req.body.name || '').trim();

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }
    if (name.length > MAX_NAME_LENGTH) {
      return res.status(400).json({ error: `name must be ${MAX_NAME_LENGTH} characters or fewer` });
    }

    const org = await Organization.create({ name });
    res.status(201).json(org);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Organization name already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
