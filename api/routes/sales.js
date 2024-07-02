import express from "express";
import { inputSale, getSoldItems, getTransactions, getSoldOutSizes, getCompleteSaleInfo, changeTranactionStatus } from "../controllers/sales.js";

const router = express.Router();

router.post('/', inputSale);
router.get('/items', getSoldItems);
router.get('/transactions', getTransactions);
router.get('/soldout', getSoldOutSizes);
router.get('/transactionsanditems', getCompleteSaleInfo);
router.post('/fulfillOrder', changeTranactionStatus);

export default router