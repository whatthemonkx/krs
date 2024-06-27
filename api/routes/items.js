import express from "express";
import { getCompleteItemInfo, getSingleItemInfo } from "../controllers/items.js";

const router = express.Router();

router.get('/', getCompleteItemInfo);
router.get('/:id', getSingleItemInfo);

export default router