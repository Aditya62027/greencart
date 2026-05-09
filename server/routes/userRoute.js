import express from 'express';
import { logout, registerUser } from '../controllers/userController.js';
import { auth , login } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', login);
userRouter.get('/is-auth',authUser, auth)
userRouter.get('/logout', authUser, logout)


export default userRouter;