"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var _a = require('../controllers/user.controllers'), getUser = _a.getUser, createUser = _a.createUser, loginUser = _a.loginUser, logoutUser = _a.logoutUser, getUserById = _a.getUserById, getMe = _a.getMe, updateMe = _a.updateMe, updateUser = _a.updateUser, getCurrentUserProducts = _a.getCurrentUserProducts;
var auth = require('../middleware/auth').auth;
// Get all users
router.get('/', getUser);
// Create a user
router.post('/', createUser);
// Login a user
router.post('/login', loginUser);
// Logout a user
router.post('/logout', auth, logoutUser);
// Get current user
router.get('/me', auth, getMe);
// Update current user
router.patch('/me', auth, updateMe);
// Get products of the current user
router.get('/me/products', auth, getCurrentUserProducts);
// Get a user by id 
router.get('/:id', getUserById);
// Update a user
router.patch('/:id', auth, updateUser);
module.exports = router;
