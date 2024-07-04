import express from "express";
import { uploadImage, uploadFirstImage, editVariation, addVariation } from "../controllers/upload.js";

const router = express.Router();

router.post('/', uploadImage);
router.post('/first', uploadFirstImage);
router.post('/noimage', editVariation);
router.post('/add', addVariation);

export default router