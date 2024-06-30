import express from "express";
import { inputSale } from "../controllers/sales.js";

const router = express.Router();

router.post('/', inputSale);

export default router