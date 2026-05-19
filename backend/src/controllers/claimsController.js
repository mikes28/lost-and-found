const claimsModel = require('../models/claimsModel');

const createClaim = (req, res) => {
    const { item_id, user_id, message } = req.body;
    if (!item_id || !user_id) return res.status(400).json({ error: 'item_id and user_id are required' });

    const claim = { item_id, user_id, message };
    claimsModel.createClaim(claim, (err, created) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json(created);
    });
};

module.exports = {
    createClaim
};
