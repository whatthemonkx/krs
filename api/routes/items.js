import express from "express";
import { getCompleteItemInfo, getSingleItemInfo, getSpecificSizes, deleteItem, deleteVariation } from "../controllers/items.js";

const router = express.Router();

router.get('/', getCompleteItemInfo);
router.get('/:id', getSingleItemInfo);
router.post('/sizes', getSpecificSizes);
router.post('/deleteItem', deleteItem);
router.post('/deleteVariation', deleteVariation);

export default router