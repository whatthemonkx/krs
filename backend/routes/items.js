const express = require('express');
const itemController = require('../controllers/items');

const router = express.Router();

router.get('/', itemController.getCompleteItemInfo);

module.exports = router;
