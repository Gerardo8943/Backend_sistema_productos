const express = require('express');
const router = express.Router();
const { getPendingPurchases } = require('../controllers/dashboardController');

router.get('/pending-purchases', getPendingPurchases);

module.exports = router;
