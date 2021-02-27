const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { JWT_SECRET } = process.env;

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
        res
          .status(400)
          .send({ message: "This is not the user you are looking for" });
      } else {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
}

const createUser = (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { name, about, avatar, email, password } = req.body;
  console.log(name, about, avatar, email, password);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err });
      }
      res.status(500).send({ message: err });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err });
    });
};

function getCurrentUser(req, res) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(400).send({ message: err }));
}

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
  login,
  getCurrentUser
};
