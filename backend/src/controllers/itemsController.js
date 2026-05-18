const itemsModel = require('../models/itemsModel'); 
const getItems = (req, res) => {
    itemsModel.getAllItemsFromDB((err, items) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(items); 
    });
};

module.exports = {
    getItems
};