const express = require("express");
const userRouter = require("./routers/users");
const cardRouter = require("./routers/cards");
const { login, createUser } = require('./controllers/userController')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
//const auth = require('./middleware/auth');

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

app.use((req, res, next) => {
  req.user = {
    _id: "602d28aa4efb4a5136e94558", // paste the _id of the test user created in the previous step
  };
  next();
});

//posting routes
app.post('/signin', login);
app.post('/signup', createUser);

// connecting to routes

//app.use(auth)
app.use("/users", userRouter);
app.use("/cards", cardRouter);



//page not found
app.use("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});
//Thank you so much as always Aygul,
//I appreciate your time and patience as you explain the errors. Also, how do you pronounce your name?



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
