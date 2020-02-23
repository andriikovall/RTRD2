const express = require('express');

const router = express.Router();
const authentication = require('passport').authenticate('jwt', { session: false });
const controller = require('../controllers/user');

router.get('/', authentication, controller.getAll);
router.get('/:id', authentication, controller.getById);
router.get('/sponsors', controller.getTopSponsors);
router.patch('/:id', authentication, controller.update);
router.delete('/:id', authentication, controller.delete);

module.exports = router;
