const FeatureFlag = require('../models/FeatureFlag');
const { KEY_RE, MAX_KEY_LENGTH } = require('../../utils/constants');

function findOwnedFlag(id, organizationId) {
  return FeatureFlag.findOne({ where: { id, organizationId } });
}

exports.listPublic = async function (req, res) {
  try {
    const orgId = parseInt(req.query.orgId, 10);

    if (!orgId || isNaN(orgId)) {
      return res.status(400).json({ error: 'orgId is required' });
    }

    const flags = await FeatureFlag.findAll({ where: { organizationId: orgId } });
    res.json(flags);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.check = async function (req, res) {
  try {
    const orgId = parseInt(req.query.orgId, 10);
    const { key } = req.query;

    if (!orgId || isNaN(orgId) || !key) {
      return res.status(400).json({ error: 'orgId and key are required' });
    }

    const flag = await FeatureFlag.findOne({ where: { key, organizationId: orgId } });
    if (!flag) {
      return res.status(404).json({ error: 'Feature flag not found' });
    }

    res.json({ key: flag.key, enabled: flag.enabled });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.list = async function (req, res) {
  try {
    const flags = await FeatureFlag.findAll({ where: { organizationId: req.user.organizationId } });
    res.json(flags);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.create = async function (req, res) {
  try {
    const key = (req.body.key || '').trim();
    const { enabled = false } = req.body;

    if (!key) {
      return res.status(400).json({ error: 'key is required' });
    }
    if (!KEY_RE.test(key)) {
      return res.status(400).json({ error: 'key must contain only letters, numbers, underscores and hyphens' });
    }
    if (key.length > MAX_KEY_LENGTH) {
      return res.status(400).json({ error: `key must be ${MAX_KEY_LENGTH} characters or fewer` });
    }
    if (typeof enabled !== 'boolean') {
      return res.status(400).json({ error: 'enabled must be a boolean' });
    }

    const flag = await FeatureFlag.create({ key, enabled, organizationId: req.user.organizationId });
    res.status(201).json(flag);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Flag key already exists for this organization' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.update = async function (req, res) {
  try {
    const flag = await findOwnedFlag(req.params.id, req.user.organizationId);

    if (!flag) {
      return res.status(404).json({ error: 'Flag not found' });
    }

    if (req.body.key !== undefined) {
      if (typeof req.body.key !== 'string') {
        return res.status(400).json({ error: 'key must be a string' });
      }
      const key = req.body.key.trim();
      if (!key) {
        return res.status(400).json({ error: 'key is required' });
      }
      if (!KEY_RE.test(key)) {
        return res.status(400).json({ error: 'key must contain only letters, numbers, underscores and hyphens' });
      }
      if (key.length > MAX_KEY_LENGTH) {
        return res.status(400).json({ error: `key must be ${MAX_KEY_LENGTH} characters or fewer` });
      }
      flag.key = key;
    }

    if (req.body.enabled !== undefined) {
      if (typeof req.body.enabled !== 'boolean') {
        return res.status(400).json({ error: 'enabled must be a boolean' });
      }
      flag.enabled = req.body.enabled;
    }

    await flag.save();
    res.json(flag);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Flag key already exists for this organization' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.remove = async function (req, res) {
  try {
    const flag = await findOwnedFlag(req.params.id, req.user.organizationId);

    if (!flag) {
      return res.status(404).json({ error: 'Flag not found' });
    }

    await flag.destroy();
    res.json(flag);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
};
