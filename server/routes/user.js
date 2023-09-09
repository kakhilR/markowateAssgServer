import express from 'express';
import { deleteUser, getUsers, getUsersById, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { userAuth } from '../middlewares/index.js';

const routes = express.Router();

routes.post('/register', registerUser);
routes.post('/login', loginUser)

routes.get('/users',userAuth, getUsers)
routes.get('/user/:id',userAuth, getUsersById);

routes.put('/update/user/:id',userAuth,updateUser);
routes.delete('/delete/user/:id',userAuth,deleteUser);

export const userRoutes = routes;