const express = require('express');
const router = express.Router();
const { confirmPurchase, cancelPurchase, createPurchase } = require('../controllers/completePurchaseController');

// Ruta para completar una compra
router.post('/', createPurchase);

// Ruta para aceptar una compra
router.put('/accept/:id', confirmPurchase);

// Ruta para rechazar una compra
router.delete('/reject/:id', cancelPurchase);

module.exports = router;
