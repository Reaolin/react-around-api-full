const User = require("../models/user");

function getUsers(req, res) {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: err });
      } else {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
}

function getOneUser(req, res) {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: "This is not the user you are looking for" });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({message: "This is not the user you are looking for"} );
      } else {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err });
      }
      res.status(500).send({ message: err });
    });
};

/*const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params._id, {
    name: req.params.name,
    about: req.params.about,
    avatar: req.params.avatar
  })
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: "This is not the user you are looking for" });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send(err);
      }
      res.status(500).send(err);
    });
};
*/
module.exports = {
  getUsers,
  getOneUser,
  createUser,
};
