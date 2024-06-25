const Database = require('better-sqlite3');
const db = new Database('storage.db');

const createTables = () => {
    const createRoomsTable = `
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            maxAvailability INTEGER NOT NULL,
            price INTEGER NOT NULL,
            roomType TEXT NOT NULL
        );
    `

    const createImagesTable = `
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            room INTEGER NOT NULL,
            FOREIGN KEY (room) REFERENCES rooms(id) ON DELETE CASCADE
        );
    `

    const createAvailabilityTable = `
        CREATE TABLE IF NOT EXISTS availability (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATETIME NOT NULL,
            room INTEGER NOT NULL,
            unitsBooked INTEGER NOT NULL,
            lastUpdated DATETIME NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (room) REFERENCES rooms(id) ON DELETE CASCADE
        );
    `

    const createReservationsTable = `
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            startDate DATETIME NOT NULL,
            endDate DATETIME NOT NULL,
            room INTEGER NOT NULL,
            cost INTEGER NOT NULL,
            status TEXT NOT NULL CHECK (status IN ('upcoming', 'checkedIn', 'checkedOut', 'cancelled')),
            timeBooked DATETIME NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (room) REFERENCES rooms(id) ON DELETE CASCADE
        );
    `

    const createAdminsTable = `
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            type TEXT NOT NULL CHECK (type IN ('superadmin', 'admin'))
        );
    `

    db.prepare(createRoomsTable).run();
    db.prepare(createImagesTable).run();
    db.prepare(createAvailabilityTable).run();
    db.prepare(createReservationsTable).run();
    db.prepare(createAdminsTable).run();
};

module.exports = { db, createTables };
