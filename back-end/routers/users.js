const express = require('express');
const userRouter = express.Router();
const {celebrate, Joi } = require('celebrate');

const { getUsers, getOneUser, createUser, getCurrentUser, updateAvatar, updateUser } = require('../controllers/userController');

userRouter.get('/', getUsers);
userRouter.get('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
}), getCurrentUser);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
  }),
}), updateAvatar);
userRouter.get('/:_id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).required(),
  }),
}),  getOneUser);
userRouter.post('/', createUser);



module.exports = userRouter;
