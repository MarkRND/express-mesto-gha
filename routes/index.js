const router = require('express').Router();
const usersRoute = require('./users');
// const usersCards = require('./cards');

router.use('/users', usersRoute);
// router.use('/cards', usersCards);

module.exports = router;
