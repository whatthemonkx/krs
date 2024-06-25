CREATE TABLE rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    maxAvailability INTEGER NOT NULL,
    price INTEGER NOT NULL,
    roomType TEXT NOT NULL
);

CREATE TABLE images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    room INTEGER NOT NULL,
    FOREIGN KEY (room) REFERENCES rooms(id) ON DELETE CASCADE
);

CREATE TABLE availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATETIME NOT NULL,
    room INTEGER NOT NULL,
    unitsBooked INTEGER NOT NULL,
    lastUpdated DATETIME NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (room) REFERENCES rooms(id) ON DELETE CASCADE
);

CREATE TABLE reservations (
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

CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('superadmin', 'admin'))
);














CREATE TABLE users (
    userid INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
)

CREATE TABLE decks (
    deckid INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    creator INTEGER NOT NULL
)

CREATE TABLE flashcards (
    cardid INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    deck INTEGER NOT NULL,
    learned BOOLEAN
)

INSERT INTO admins (username, name, password, type) VALUES ("ksawyerr", "kris sawyerr", "MongoDB", "superadmin")

INSERT INTO decks (name, creator) VALUES ("Irregular Verbs", 1)

UPDATE flashcards SET question = 'Bye' WHERE cardid = 2058

INSERT INTO flashcards (question, answer, deck) VALUES ("Hola", "Hello", 1)

DROP TABLE flashcards

SELECT * FROM flashcards where deck = 7 AND learned is NULL

