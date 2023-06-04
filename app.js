/* eslint-disable no-console */
/* eslint-disable indent */
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
// const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
});
// app.use(helmet());
// временное решение авторизации пользователя
// app.use((req, res, next) => {
//   req.user = {
//     _id: '1f525cf06e02630312f3fed7',
//   };

//   next();
// });

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Запрос на ${PORT}`);
});
