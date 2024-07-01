import express from "express";
import { inputSale, getSoldItems, getTransactions, getSoldOutSizes } from "../controllers/sales.js";

const router = express.Router();

router.post('/', inputSale);
router.get('/items', getSoldItems);
router.get('/transactions', getTransactions);
router.get('/soldout', getSoldOutSizes);

export default router