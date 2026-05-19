const express = require('express');
const router = express.Router();
const claimsController = require('../controllers/claimsController');

router.post('/', claimsController.createClaim);

module.exports = router;
