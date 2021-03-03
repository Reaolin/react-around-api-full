const Card = require("../models/card");
const BadRequestError = require('../middleware/errors/BadRequestError');
const NotFoundError = require("../middleware/errors/NotFoundError");

function getCards(req, res) {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: err });
      }
      res.status(500).send({ message: err });
    });
}

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card){
        throw new BadRequestError('invalid data for creating card');
      }
      res.status(200).send(card)
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("This is not the card you are looking for");
      }
      res.status(200).send({ data: card });
    })
   .catch(next);

};

const likeCard = (req, res, next) =>{ Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
  { new: true },

)
.then((card) => {
  if (card) {
    return res.status(200).send(card);
  }
  throw new BadRequestError('This card is already liked' );
})
.catch(next);
};

const dislikeCard = (req, res, next) => {Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
.then((card) => {
  if (card) {
    return res.status(200).send(card);
  }
  throw new BadRequestError('This card is already liked' );
})
.catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard
};
