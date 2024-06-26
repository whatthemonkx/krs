CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    itemType TEXT NOT NULL
);

CREATE TABLE variations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    item INTEGER NOT NULL,
    FOREIGN KEY (item) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE sizes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    variation INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (variation) REFERENCES variations(id) ON DELETE CASCADE
);

CREATE TABLE images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    variation INTEGER NOT NULL,
    FOREIGN KEY (variation) REFERENCES variations(id) ON DELETE CASCADE
);


INSERT INTO items (name, description, price, itemType) VALUES ("Vintage Tee","Side Seamed. Retail Fit. Tight-knit. Double-needle topstitched. Shoulder taping.", 20, "Tee");
INSERT INTO items (name, description, price, itemType) VALUES ("Vintage Hoodie","100% Ring-spun cotton, 26 singles, 8.25 oz fleece.", 40, "Hoodie");
INSERT INTO items (name, description, price, itemType) VALUES ("Vintage Joggers","100% ringspun combed cotton for prime printability. Side-seamed. Dyed to match drawcords. Back pocket and jersey-lined front pocket. Laundered for superior hand-feel. Mineral washed.", 40, "Pants");
INSERT INTO items (name, description, price, itemType) VALUES ("Vintage Shorts","100% Cotton face for prime printability. Dyed to match drawcords. Back pocket and jersey-lined front pocket. Tapered at the knee.", 30, "Shorts")

INSERT INTO variations (name, item) VALUES ("Black", 1);
INSERT INTO variations (name, item) VALUES ("Blue", 1);
INSERT INTO variations (name, item) VALUES ("Grey", 1);
INSERT INTO variations (name, item) VALUES ("Green", 1);
INSERT INTO variations (name, item) VALUES ("Black", 2);
INSERT INTO variations (name, item) VALUES ("Blue", 2);
INSERT INTO variations (name, item) VALUES ("Grey", 2);
INSERT INTO variations (name, item) VALUES ("Green", 2);
INSERT INTO variations (name, item) VALUES ("Black", 3);
INSERT INTO variations (name, item) VALUES ("Blue", 3);
INSERT INTO variations (name, item) VALUES ("Grey", 3);
INSERT INTO variations (name, item) VALUES ("Green", 3);
INSERT INTO variations (name, item) VALUES ("Black", 4);
INSERT INTO variations (name, item) VALUES ("Blue", 4);
INSERT INTO variations (name, item) VALUES ("Grey", 4);
INSERT INTO variations (name, item) VALUES ("Green", 4);

INSERT INTO sizes (name, variation, quantity) VALUES ("S", 1, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 1, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 1, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 2, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 2, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 2, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 3, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 3, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 3, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 4, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 4, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 4, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 5, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 5, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 5, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 6, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 6, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 6, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 7, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 7, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 7, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 8, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 8, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 8, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 9, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 9, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 9, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 10, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 10, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 10, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 11, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 11, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 11, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 12, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 12, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 12, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 13, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 13, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 13, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 14, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 14, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 14, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 15, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 15, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 15, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("S", 16, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("M", 16, 10);
INSERT INTO sizes (name, variation, quantity) VALUES ("L", 16, 10);

INSERT INTO images (name, variation) VALUES ("TeeBlack.png", 1);
INSERT INTO images (name, variation) VALUES ("TeeBlue.png", 2);
INSERT INTO images (name, variation) VALUES ("TeeGrey.png", 3);
INSERT INTO images (name, variation) VALUES ("TeeGreen.png", 4);
INSERT INTO images (name, variation) VALUES ("HoodieBlack.png", 5);
INSERT INTO images (name, variation) VALUES ("HoodieBlue.png", 6);
INSERT INTO images (name, variation) VALUES ("HoodieGrey.png", 7);
INSERT INTO images (name, variation) VALUES ("HoodieGreen.png", 8);
INSERT INTO images (name, variation) VALUES ("PantsBlack.png", 9);
INSERT INTO images (name, variation) VALUES ("PantsBlue.png", 10);
INSERT INTO images (name, variation) VALUES ("PantsGrey.png", 11);
INSERT INTO images (name, variation) VALUES ("PantsGreen.png", 12);
INSERT INTO images (name, variation) VALUES ("ShortsBlack.png", 13);
INSERT INTO images (name, variation) VALUES ("ShortsBlue.png", 14);
INSERT INTO images (name, variation) VALUES ("ShortsGrey.png", 15);
INSERT INTO images (name, variation) VALUES ("ShortsGreen.png", 16);