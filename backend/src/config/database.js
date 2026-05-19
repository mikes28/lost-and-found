const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Ensure we always open the SQLite file that lives in the backend folder,
// regardless of the process CWD when the server is started.
const dbFile = path.join(__dirname, '..', '..', 'lost_and_found.sqlite');

const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        db.run(`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL DEFAULT 'talált',
            image_url TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS claims (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(item_id) REFERENCES items(id)
        )`);

        // Ensure we have columns for storing user name and class with claims.
        // SQLite doesn't support IF NOT EXISTS for ADD COLUMN, so run and ignore errors.
        db.run(`ALTER TABLE claims ADD COLUMN user_name TEXT`, (err) => {});
        db.run(`ALTER TABLE claims ADD COLUMN user_osztaly TEXT`, (err) => {});

        // No demo/example seeding by default.
    }
});

module.exports = db;