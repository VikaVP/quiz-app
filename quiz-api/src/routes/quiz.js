const express = require('express');
const Route = express.Router();

const quiz = require('../controllers/quiz');

Route
    .get('/', quiz.getAll)
    .post('/add', quiz.addQuiz)
    .put('/update', quiz.updateQuiz)
    .delete('/:id', quiz.deleteQuiz)
    .get('/timer', quiz.getTimer)
    .put('/timer', quiz.updateTimerQuiz)
    .get('/try', quiz.getAllForUser)
    .get('/try/:id', quiz.getAnswer)

module.exports = Route;
