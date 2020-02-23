const express = require('express');

const router = express.Router();
const authentication = require('passport').authenticate('jwt', { session: false });
const controller = require('../controllers/event');

router.get('/', controller.getAll);
router.get('/sponsors/:id', controller.getTopSponsorsById);
router.get('/:id', authentication, controller.getById);
router.post('/', authentication, controller.create);
router.patch('/:id', authentication, controller.update);
router.delete('/:id', authentication, controller.delete);

module.exports = router;