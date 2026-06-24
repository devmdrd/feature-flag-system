const router = require('express').Router();
const flagController = require('../controllers/flag.controller');
const authenticate = require('../middleware/auth');

router.get('/check',  flagController.check);
router.get('/public', flagController.listPublic);
router.get('/',       authenticate('org_admin'), flagController.list);
router.post('/',      authenticate('org_admin'), flagController.create);
router.patch('/:id',  authenticate('org_admin'), flagController.update);
router.delete('/:id', authenticate('org_admin'), flagController.remove);

module.exports = router;
