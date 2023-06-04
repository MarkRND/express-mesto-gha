const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");

const { PORT = 3000 } = process.env;
const app = express();

// mongoose.connect("mongodb://localhost:27017/mestodb", {
mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "647ce7842a72a728b94487fe",
  };
  next();
});

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT}`);
});
