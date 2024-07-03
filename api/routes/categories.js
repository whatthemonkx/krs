import express from "express";
import { getCategories, addCategories } from "../controllers/categories.js";

const router = express.Router();

router.get('/', getCategories);
router.post('/add', addCategories);

export default router