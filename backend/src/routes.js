const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const QuestionController = require ('./controllers/QuestionController');

routes.post('/user', UserController.create);
routes.get('/user', UserController.read);
routes.delete('/user/:id', UserController.delete);
routes.put('/user/:id', UserController.update); 

routes.post('/question', QuestionController.create);
routes.get('/question', QuestionController.read);
routes.delete('/question/:id', QuestionController.delete);
//routes.put('/question/:id', UserController.update); 


module.exports = routes;