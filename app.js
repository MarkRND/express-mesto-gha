const express = require("express");
const mongoose = require("mongoose");
// const { errors } = require('celebrate');

const router = require("./routes");
const GlobalError = require("./middlwares/GlobalError");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(router);
// app.use(errors());
app.use(GlobalError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на ${PORT}`);
});
