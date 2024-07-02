import express from "express";
import { getCompleteItemInfo, getSingleItemInfo, getSpecificSizes, deleteItem } from "../controllers/items.js";

const router = express.Router();

router.get('/', getCompleteItemInfo);
router.get('/:id', getSingleItemInfo);
router.post('/sizes', getSpecificSizes);
router.post('/deleteItem', deleteItem);

export default router