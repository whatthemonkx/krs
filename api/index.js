import express from 'express';
import itemRoutes from './routes/items.js';
import salesRoutes from './routes/sales.js';
import categoriesRoutes from './routes/categories.js';
import uploadRoutes from './routes/upload.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://konga71-landing.vercel.app', 
    'https://konga71-management.vercel.app'
  ], 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
app.use(cookieParser());
app.use(express.json());

app.use('/items', itemRoutes);
app.use('/sales', salesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/upload', uploadRoutes);
app.use("/auth", authRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, './itemImages')));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
