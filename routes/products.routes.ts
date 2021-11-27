export {}
const express = require('express')
const router = express.Router()

const {  getProducts, createProducts, getProductsById, updateProductsById } = require('../controllers/products.controller')
const  { auth }= require('../middleware/auth')

// Get all products
router.get('/', getProducts)

// Create a product
router.post('/', auth, createProducts)

// Get a product by ID 
router.get('/:id', getProductsById)

// Update a product by ID
router.patch('/:id', auth,updateProductsById)

module.exports = router