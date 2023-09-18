const express = require('express');
const Route = express.Router();

const users = require('../controllers/users');

Route
    .get('/', users.getAll)
    .post('/add', users.addUsers)
    .put('/update', users.updateUsers)
    .delete('/:id', users.deleteUsers)

module.exports = Route;
