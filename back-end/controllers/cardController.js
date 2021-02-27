const Card = require("../models/card");

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

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: "This is not the card you are looking for" });
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "No such card to delete" });
      }
      res.status(500).send({ message: err });
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
};
