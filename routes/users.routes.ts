export {}
const express = require('express')
const router = express.Router()

const { getUser, createUser, loginUser, logoutUser, getUserById, getMe, updateMe, updateUser, getCurrentUserProducts } = require('../controllers/user.controllers')
const { auth } = require('../middleware/auth')

// Get all users
router.get('/', getUser)

// Create a user
router.post('/', createUser)

// Login a user
router.post('/login', loginUser)

// Logout a user
router.post('/logout', auth, logoutUser)

// Get current user
router.get('/me', auth, getMe)

// Update current user
router.patch('/me', auth, updateMe)

// Get products of the current user
router.get('/me/products', auth, getCurrentUserProducts)

// Get a user by id 
router.get('/:id', getUserById)

// Update a user
router.patch('/:id', auth, updateUser)

module.exports = router