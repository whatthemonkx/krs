import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import itemRoutes from './routes/items.js';
import salesRoutes from './routes/sales.js';
import categoriesRoutes from './routes/categories.js';
import uploadRoutes from './routes/upload.js';
import authRoutes from './routes/auth.js';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://konga71-landing.vercel.app',
  'https://konga71-management.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
}));

app.use(cookieParser());
app.use(express.json());

app.use('/items', itemRoutes);
app.use('/sales', salesRoutes);
app.use('/categories', categoriesRoutes);

app.use('/upload', cors({
  origin: allowedOrigins,
  methods: 'POST',
  allowedHeaders: 'Content-Type,Authorization',
}), uploadRoutes);

app.use('/auth', authRoutes);

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
