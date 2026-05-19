const db = require('../config/database');

const createClaim = (data, callback) => {
    const sql = `INSERT INTO claims (item_id, user_id, message) VALUES (?, ?, ?)`;
    const params = [data.item_id, data.user_id, data.message || null];
    db.run(sql, params, function(err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, ...data });
    });
};

module.exports = {
    createClaim
};
