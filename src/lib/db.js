require('dotenv').config();
const Database = require('better-sqlite3-multiple-ciphers');
const { app } = require('electron');
const path = require('path');

const databaseUrl = path.join(app.getPath('home'), process.env.DATABASE_URL);

// Open database with SQLCipher encryption
const db = new Database(databaseUrl, {
    verbose: console.log,
    cipher: process.env.DB_CIPHER,
    password: process.env.DB_PASSWORD,
});

// Create products table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        description TEXT
    ) STRICT
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS sellers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        address TEXT
    ) STRICT
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        address TEXT
    ) STRICT
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS purchase_orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seller_id INTEGER,
        product_id INTEGER,
        purchase_date TEXT DEFAULT CURRENT_TIMESTAMP,
        quantity INTEGER,
        cost REAL,
        paid REAL,
        FOREIGN KEY (seller_id) REFERENCES sellers(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    ) STRICT
`);


db.exec(`
    CREATE TABLE IF NOT EXISTS sales_orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        product_id INTEGER,
        sold_at TEXT DEFAULT CURRENT_TIMESTAMP,
        quantity INTEGER,
        price REAL,
        payment REAL,
        FOREIGN KEY (customer_id) REFERENCES customers(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    ) STRICT
`);

function insertProduct({ name, price, description }) {
    const stmt = db.prepare('INSERT INTO products (name, price, description) VALUES (?, ?, ?)');
    return stmt.run(name, price, description);
}

function getProducts() {
    return db.prepare('SELECT * FROM products').all();
}

function insertSeller({name, contact, address}) {
    const stmt = db.prepare('INSERT INTO sellers (name, contact, address) VALUES (?, ?, ?)');
    return stmt.run(name, contact, address);
}

function getSellers() {
    return db.prepare('SELECT * FROM sellers').all();
}

function insertCustomer({name, contact, address}) {
    const stmt = db.prepare('INSERT INTO customers (name, contact, address) VALUES (?, ?, ?)');
    return stmt.run(name, contact, address);
}

function getCustomers() {
    return db.prepare('SELECT * FROM customers').all();
}

function insertPurchaseOrder({seller_id, product_id, purchase_date, quantity, cost, paid}) {
    const stmt = db.prepare('INSERT INTO purchase_orders (seller_id, product_id, purchase_date, quantity, cost, paid) VALUES (?, ?, ?, ?, ?, ?)');
    return stmt.run(seller_id, product_id, purchase_date, quantity, cost, paid);
}

function getPurchaseOrders() {
    return db.prepare('SELECT * FROM purchase_orders ORDER BY purchase_date DESC').all();
}

function insertSalesOrder({customer_id, product_id, sold_at, quantity, price, payment}) {
    const stmt = db.prepare('INSERT INTO sales_orders (customer_id, product_id, sold_at, quantity, price, payment) VALUES (?, ?, ?, ?, ?, ?)');
    return stmt.run(customer_id, product_id, sold_at, quantity, price, payment);
}

function getSalesOrders() {
    return db.prepare('SELECT * FROM sales_orders ORDER BY sold_at DESC').all();
}

module.exports = {
    insertProduct,
    getProducts,
    insertSeller,
    getSellers,
    insertPurchaseOrder,
    getPurchaseOrders,
    insertCustomer,
    getCustomers,
    insertSalesOrder,
    getSalesOrders
};
