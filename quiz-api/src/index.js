const express = require('express');
const Route = express.Router();

const auth = require('./routes/auth');
const users = require('./routes/users');
const quiz = require('./routes/quiz');

Route
    .use('/auth', auth)
    .use('/users', users)
    .use('/quiz', quiz)

module.exports = Route;