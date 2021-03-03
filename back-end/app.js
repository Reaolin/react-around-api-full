const express = require("express");
const userRouter = require("./routers/users");
const cardRouter = require("./routers/cards");
const { login, createUser } = require('./controllers/userController')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require('cors')
const auth = require('./middleware/auth');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/loggers');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(helmet());

// connect to the MongoDB server
mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: "602d28aa4efb4a5136e94558", // paste the _id of the test user created in the previous step
//   };
//   next();
// });

app.use(cors());

//request loggers
app.use(requestLogger);

//posting routes
app.post('/signin', login);
app.post('/signup', createUser);

// connecting to routes

app.use(auth)
app.use("/users", userRouter);
app.use("/cards", cardRouter);




//page not found
app.use("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});


app.use(errorLogger); // enabling the error logger

app.use(errors());

app.use((err, req, res) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and display a message based on it
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
