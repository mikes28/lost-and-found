const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemsController');

router.get('/', itemController.getItems);
router.post('/', itemController.createItem);
router.put('/:id', itemController.updateItem);

module.exports = router;