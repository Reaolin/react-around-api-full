const express = require('express');
const userRouter = express.Router();

const { getUsers, getOneUser, createUser, getCurrentUser } = require('../controllers/userController');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:_id', getOneUser);
userRouter.post('/', createUser);



module.exports = userRouter;
