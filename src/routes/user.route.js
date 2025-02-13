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
router.get('/getusers', userAuth, userController.getAllUsers);
router.post('/forget' , userController.forgetPass);
router.put('/reset',userController.resetPass);
export default router;
