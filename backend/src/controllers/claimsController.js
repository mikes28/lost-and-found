const claimsModel = require('../models/claimsModel');

const createClaim = (req, res) => {
    const { item_id, user_id, message, user_name, user_osztaly } = req.body;
    if (!item_id || !user_id) return res.status(400).json({ error: 'item_id and user_id are required' });

    const claim = { item_id, user_id, message, user_name, user_osztaly };
    claimsModel.createClaim(claim, (err, created) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json(created);
    });
};

const listClaims = (req, res) => {
    const filters = {};
    if (req.query.item_id) filters.item_id = Number(req.query.item_id);
    if (req.query.user_id) filters.user_id = Number(req.query.user_id);

    claimsModel.getClaims(filters, (err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(rows);
    });
};

const deleteClaim = (req, res) => {
    const id = req.params.id;
    claimsModel.deleteClaim(id, (err, result) => {
        if (err) {
            if (err.message === 'Not found') return res.status(404).json({ error: 'Claim not found' });
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(result);
    });
};

module.exports = {
    createClaim
    , listClaims
    , deleteClaim
};
