const express = require('express');
const router = express.Router(); 
const itemController = require('../controllers/itemsController'); 

router.get('/', itemController.getItems);

module.exports = router;