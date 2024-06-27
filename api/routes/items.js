import express from "express";
import { getCompleteItemInfo } from "../controllers/items.js";

const router = express.Router();

router.get('/', getCompleteItemInfo);

export default router