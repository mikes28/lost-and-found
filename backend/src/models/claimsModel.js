const db = require('../config/database');

const createClaim = (data, callback) => {
    const sql = `INSERT INTO claims (item_id, user_id, message, user_name, user_osztaly) VALUES (?, ?, ?, ?, ?)`;
    const params = [data.item_id, data.user_id, data.message || null, data.user_name || null, data.user_osztaly || null];
    db.run(sql, params, function(err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, ...data });
    });
};

const getClaims = (filters, callback) => {
    let sql = `SELECT id, item_id, user_id, message, user_name, user_osztaly, created_at FROM claims`;
    const where = [];
    const params = [];

    if (filters) {
        if (filters.item_id) {
            where.push('item_id = ?');
            params.push(filters.item_id);
        }
        if (filters.user_id) {
            where.push('user_id = ?');
            params.push(filters.user_id);
        }
    }

    if (where.length) sql += ` WHERE ${where.join(' AND ')}`;

    db.all(sql, params, (err, rows) => callback(err, rows));
};

const deleteClaim = (id, callback) => {
    const sql = `DELETE FROM claims WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) return callback(err);
        if (this.changes === 0) return callback(new Error('Not found'));
        callback(null, { id: Number(id) });
    });
};

module.exports = {
    createClaim,
    getClaims,
    deleteClaim,
};
