const express = require('express');
const router = express.Router();
const claimsController = require('../controllers/claimsController');

router.post('/', claimsController.createClaim);

router.get('/', claimsController.listClaims);
router.delete('/:id', claimsController.deleteClaim);

module.exports = router;
