import express from 'express';
import itemRoutes from './routes/items.js';
import salesRoutes from './routes/sales.js';
import categoriesRoutes from './routes/categories.js';
import uploadRoutes from './routes/upload.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/items', itemRoutes);
app.use('/sales', salesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/upload', uploadRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '../itemImages')));

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
