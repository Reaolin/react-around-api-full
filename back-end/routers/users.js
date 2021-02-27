const express = require('express');
const userRouter = express.Router();

const { getUsers, getOneUser, createUser, getCurrentUser } = require('../controllers/userController');

userRouter.get('/', getUsers);
userRouter.get('/:_id', getOneUser);
userRouter.post('/', createUser);
userRouter.get('/me', getCurrentUser);


module.exports = userRouter;
