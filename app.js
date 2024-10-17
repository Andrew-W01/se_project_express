const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { INTERNAL_SERVER_ERROR } = require("./utils/errors");
const { errors } = require("celebrate");

// const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());

app.use(express.json());

app.use("/", mainRouter);

// app.use(routes);

app.use(errors());

// app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err);
  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "An error occurred on the server" });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
