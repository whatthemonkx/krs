import express from "express";
import { getCompleteItemInfo, getSingleItemInfo, getSpecificSizes } from "../controllers/items.js";

const router = express.Router();

router.get('/', getCompleteItemInfo);
router.get('/:id', getSingleItemInfo);
router.post('/sizes', getSpecificSizes);

export default router