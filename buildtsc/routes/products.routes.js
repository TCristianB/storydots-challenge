"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var _a = require('../controllers/products.controller'), getProducts = _a.getProducts, createProducts = _a.createProducts, getProductsById = _a.getProductsById, updateProductsById = _a.updateProductsById, deleteProduct = _a.deleteProduct;
var auth = require('../middleware/auth').auth;
// Get all products
router.get('/', getProducts);
// Create a product
router.post('/', auth, createProducts);
// Get a product by ID 
router.get('/:id', getProductsById);
// Update a product by ID
router.patch('/:id', auth, updateProductsById);
// Delete a product
router.delete('/:id', auth, deleteProduct);
module.exports = router;
