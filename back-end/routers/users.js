const express = require('express');
const userRouter = express.Router();

const { getUsers, getOneUser, createUser, getCurrentUser, updateAvatar, updateUser } = require('../controllers/userController');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);
userRouter.get('/:_id', getOneUser);
userRouter.post('/', createUser);



module.exports = userRouter;
