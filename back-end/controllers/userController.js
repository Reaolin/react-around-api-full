const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../middleware/errors/NotFoundError");
const BadRequestError = require("../middleware/errors/BadRequestError");
const UnauthorizedError = require('../middleware/errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

function getUsers(req, res, next) {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
}

function getOneUser(req, res, next) {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("This is not the user you are looking for");
      }
      res.status(200).send(user);
    })
    .catch(() =>{
      if (res.status(400)){
        throw new BadRequestError('Invalid User');
      }

    })
    .catch(next);
}

const createUser = (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { name, about, avatar, email, password } = req.body;
  console.log(name, about, avatar, email, password);
  if (!password || !email) {
    throw new BadRequestError("Please enter a valid email or password");
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      if (!user) {
        throw new BadRequestError("Invalid data");
      }
      res.status(200).send({name: user.name, about: user.about, avatar: user.avatar, email: user.email});
    })

    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).send({message: 'Duplicate User'});
      }
    })

};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("This is not the user you are looking for!!");
      }
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'development', {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      if(res.status(401))

      throw new UnauthorizedError('Incorrect email or password');
    })

    .catch(next);
};

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.send({ data: user });
    })
    .catch(next);
}

const updateAvatar = (req, res, next) => {
  console.log(req.body);
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((userAvatar) => {
      res.send({ data: userAvatar });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User Not Found");
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  login,
  getCurrentUser,
  updateAvatar,
  updateUser,
};
