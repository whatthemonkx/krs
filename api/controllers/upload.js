import { db } from "../db.js";
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../itemImages');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadImage = [
  upload.single('image'),
  async (req, res) => {
    console.log('File received:', req.file);

    const { name, item, status, oldImageName, variant } = req.body;

    if (!req.file || !name || !item || !status || !oldImageName || !variant) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const newImageName = req.file.filename;

      const updateQuery = 'UPDATE `variations` SET `name` = ?, `item` = ?, `status` = ? WHERE `id` = ?';
      db.query(updateQuery, [name, item, status, variant], (err) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ error: 'Database query error' });
        }
      });

      const insertQuery = 'INSERT INTO `images` (`name`, `variation`) VALUES (?, ?)';
      db.query(insertQuery, [newImageName, variant], (err) => {
        if (err) {
          console.error('Database insert error:', err);
          return res.status(500).json({ error: 'Database insert error' });
        }
      });

      const oldImagePath = path.join(__dirname, '../itemImages', oldImageName);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      res.status(200).json({ data: 'success', file: req.file });
    } catch (error) {
      console.error('Error handling the file upload:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

export const uploadFirstImage = [
  upload.single('image'),
  async (req, res) => {
    console.log('File received:', req.file);

    const { name, item, status, variant } = req.body;

    if (!req.file || !name || !item || !status || !variant) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const newImageName = req.file.filename;

      if (typeof variant === 'undefined') {
        throw new Error('Variant is required');
      }

      const updateQuery = 'UPDATE `variations` SET `name` = ?, `item` = ?, `status` = ? WHERE `id` = ?';
      db.query(updateQuery, [name, item, status, variant], (err) => {
        if (err) {
          console.error('Database update error:', err);
          return res.status(500).json({ error: 'Database update error' });
        }
      });

      const insertQuery = 'INSERT INTO `images` (`name`, `variation`) VALUES (?, ?)';
      db.query(insertQuery, [newImageName, variant], (err) => {
        if (err) {
          console.error('Database insert error:', err);
          return res.status(500).json({ error: 'Database insert error' });
        }
      });

      res.status(200).json({ data: 'success', file: req.file });
    } catch (error) {
      console.error('Error handling the file upload:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

export const editVariation = (req, res) => {
  const q = 'UPDATE `variations` SET `name` = ?, `item` = ?, `status` = ? WHERE `id` = ?';

  db.query(q, [req.body.name, req.body.item, req.body.status, req.body.variant], (err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    return res.status(200).json(data);
  });
};

export const addVariation = (req, res) => {
  const q = 'INSERT INTO `variations` (`name`, `item`, `status`) VALUES (?, ?, ?);';

  db.query(q, [req.body.name, req.body.item, req.body.status], (err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    return res.status(200).json(data);
  });
};
