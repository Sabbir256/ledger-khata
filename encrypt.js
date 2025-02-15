require('dotenv').config();
const Database = require('better-sqlite3-multiple-ciphers');

// Open database with SQLCipher encryption
const db = new Database('db/ledger-khata.db', {
    verbose: console.log,
    cipher: process.env.DB_CIPHER,
    password: process.env.DB_PASSWORD,
});

// Create transactions table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL,
        description TEXT,
        date TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = {
    insertTransaction(amount, description) {
        const stmt = db.prepare('INSERT INTO transactions (amount, description) VALUES (?, ?)');
        return stmt.run(amount, description);
    },
    getTransactions() {
        return db.prepare('SELECT * FROM transactions').all();
    }
};
