import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { newUserValidator } from '../validators/user.validator.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Register new user
router.post('/register', newUserValidator, userController.registerUser);

// Login user
router.post('/login', userController.login);

// Get all users (Protected Route)
router.get('', userAuth, userController.getAllUsers);

export default router;
