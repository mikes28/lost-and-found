const db = require('../config/database');

const getFoundItems = (callback) => {
    const sql = `SELECT id, title, description, status, image_url FROM items WHERE status = 'talált'`;
    db.all(sql, [], (err, rows) => callback(err, rows));
};

const createItem = (data, callback) => {
    const sql = `INSERT INTO items (title, description, status, image_url) VALUES (?, ?, ?, ?)`;
    const params = [data.title, data.description || null, data.status || 'talált', data.image_url || null];
    db.run(sql, params, function(err) {
        if (err) return callback(err);
        // return created item id
        callback(null, { id: this.lastID, ...data });
    });
};

const updateItemStatus = (id, status, callback) => {
    const sql = `UPDATE items SET status = ? WHERE id = ?`;
    db.run(sql, [status, id], function(err) {
        if (err) return callback(err);
        if (this.changes === 0) return callback(new Error('Not found'));
        callback(null, { id: Number(id), status });
    });
};

module.exports = {
    getFoundItems,
    createItem,
    updateItemStatus
};