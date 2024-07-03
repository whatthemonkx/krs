import express from "express";
import { getCompleteItemInfo, getSingleItemInfo, getSpecificSizes, deleteItem, deleteVariation, addItem, editItem } from "../controllers/items.js";

const router = express.Router();

router.get('/', getCompleteItemInfo);
router.get('/:id', getSingleItemInfo);
router.post('/sizes', getSpecificSizes);
router.post('/deleteItem', deleteItem);
router.post('/deleteVariation', deleteVariation);
router.post('/addItem', addItem);
router.post('/editItem', editItem);

export default router