const db = require('../config/database');

const getAllItemsFromDB = (callback) => {
    const sql = 'SELECT * FROM items';
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
};
module.exports = {
    getAllItemsFromDB
};