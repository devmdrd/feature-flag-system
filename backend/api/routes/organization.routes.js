const router = require('express').Router();
const orgController = require('../controllers/organization.controller');
const authenticate = require('../middleware/auth');

router.get('/',       authenticate('super_admin'), orgController.list);
router.get('/public', orgController.list);
router.post('/',      authenticate('super_admin'), orgController.create);

module.exports = router;
