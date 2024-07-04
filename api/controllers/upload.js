import { db } from "../db.js";
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

const upload = multer({ storage: multer.memoryStorage() });

export const uploadImage = [
  upload.single('image'),
  async (req, res) => {
    console.log('File received:', req.file);

    const { name, item, status, oldImageName, variant } = req.body;

    if (!req.file || !name || !item || !status || !oldImageName || !variant) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Prepare the image data for Imgbb
      const formData = new FormData();
      formData.append('image', req.file.buffer.toString('base64'));
      formData.append('key', process.env.IMGBB_API_KEY);

      // Upload the image to Imgbb
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: formData.getHeaders(),
      });

      const newImageUrl = response.data.data.url;

      // Update the variation in the database
      const updateQuery = 'UPDATE `variations` SET `name` = ?, `item` = ?, `status` = ? WHERE `id` = ?';
      db.query(updateQuery, [name, item, status, variant], (err) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ error: 'Database query error' });
        }
      });

      // Insert the new image record into the database
      const insertQuery = 'INSERT INTO `images` (`name`, `variation`, `url`) VALUES (?, ?, ?)';
      db.query(insertQuery, [req.file.originalname, variant, newImageUrl], (err) => {
        if (err) {
          console.error('Database insert error:', err);
          return res.status(500).json({ error: 'Database insert error' });
        }
      });

      // Optionally, delete the old image (if required)
      if (oldImageName) {
        // Imgbb does not support direct deletion of images through API.
        // Consider a different approach or omit this step.
      }

      res.status(200).json({ data: 'success', file: { filename: req.file.originalname, url: newImageUrl } });
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
      // Prepare the image data for Imgbb
      const formData = new FormData();
      formData.append('image', req.file.buffer.toString('base64'));
      formData.append('key', process.env.IMGBB_API_KEY);

      // Upload the image to Imgbb
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: formData.getHeaders(),
      });

      const newImageUrl = response.data.data.url;

      // Update the variation in the database
      const updateQuery = 'UPDATE `variations` SET `name` = ?, `item` = ?, `status` = ? WHERE `id` = ?';
      db.query(updateQuery, [name, item, status, variant], (err) => {
        if (err) {
          console.error('Database update error:', err);
          return res.status(500).json({ error: 'Database update error' });
        }
      });

      // Insert the new image record into the database
      const insertQuery = 'INSERT INTO `images` (`name`, `variation`, `url`) VALUES (?, ?, ?)';
      db.query(insertQuery, [req.file.originalname, variant, newImageUrl], (err) => {
        if (err) {
          console.error('Database insert error:', err);
          return res.status(500).json({ error: 'Database insert error' });
        }
      });

      res.status(200).json({ data: 'success', file: { filename: req.file.originalname, url: newImageUrl } });
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
