const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');

router.get('/', getProducts); // La ruta está vacía para que sea /api/products

module.exports = router;
