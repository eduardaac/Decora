const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');

routes.post('/user', UserController.create);
routes.get('/user', UserController.read);
routes.delete('/user/:id', UserController.delete);

module.exports = routes;