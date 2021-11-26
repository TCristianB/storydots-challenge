const express = require('express')
const router = express.Router()

import {  getProducts, createProducts, getProductsById } from '../controllers/products.controller'
import  { auth } from '../middleware/auth'

// Get all products
router.get('/', getProducts)

// Create a product
router.post('/', auth, createProducts)

// Get a product by ID 
router.get('/:id', getProductsById)

module.exports = router