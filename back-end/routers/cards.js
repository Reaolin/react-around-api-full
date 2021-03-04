const express = require('express');
const cardRouter = express.Router();
const {celebrate, Joi } = require('celebrate');

const { getCards,  createCard,
  deleteCard, likeCard, dislikeCard } = require('../controllers/cardController');


cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);
cardRouter.put('/:cardId/likes',celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), likeCard);
cardRouter.delete('/:cardId/likes',celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);




module.exports = cardRouter;
