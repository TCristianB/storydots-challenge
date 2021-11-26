export {}
const express = require('express')
const router = express.Router()

const { getUser, createUser, loginUser, logoutUser, getUserById, updateUser } = require('../controllers/user.controllers')
const { auth } = require('../middleware/auth')

// Get all users
router.get('/', getUser)

// Create a user
router.post('/', createUser)

// Login a user
router.post('/login', loginUser)

// Logout a user
router.post('/logout', auth, logoutUser)

// Get a user by id 
router.get('/:id', getUserById)

// Update a user
router.patch('/:id', auth, updateUser)

module.exports = router