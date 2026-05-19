const itemsModel = require('../models/itemsModel');

const getItems = (req, res) => {
    itemsModel.getFoundItems((err, items) => {
        if (err) {
            console.error('getItems DB error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(items);
    });
};

const createItem = (req, res) => {
    const { title, description, status, image_url } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });

    const newItem = { title, description, status, image_url };
    itemsModel.createItem(newItem, (err, created) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json(created);
    });
};

const updateItem = (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'status is required' });

    itemsModel.updateItemStatus(id, status, (err, result) => {
        if (err) {
            if (err.message === 'Not found') return res.status(404).json({ error: 'Item not found' });
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(result);
    });
};

module.exports = {
    getItems,
    createItem,
    updateItem
};