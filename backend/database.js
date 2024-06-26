const Database = require('better-sqlite3');
const db = new Database('db.db');

const createTables = () => {
    const createItemsTable = `
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price INTEGER NOT NULL,
            itemType TEXT NOT NULL
        );
    `

    const createVariationsTable = `
        CREATE TABLE IF NOT EXISTS variations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            item INTEGER NOT NULL,
            FOREIGN KEY (item) REFERENCES items(id) ON DELETE CASCADE
        );
    `

    const createSizesTable = `
        CREATE TABLE IF NOT EXISTS sizes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            variation INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (variation) REFERENCES variations(id) ON DELETE CASCADE
        );
    `

    const createImagesTable = `
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            variation INTEGER NOT NULL,
            FOREIGN KEY (variation) REFERENCES variations(id) ON DELETE CASCADE
        );
    `

    db.prepare(createItemsTable).run();
    db.prepare(createVariationsTable).run();
    db.prepare(createSizesTable).run();
    db.prepare(createImagesTable).run();
};

module.exports = { db, createTables };
