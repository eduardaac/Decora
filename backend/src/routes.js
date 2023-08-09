const express = require('express');
const router = express.Router();

const userController = require('./controllers/UserController');
const questionController = require('./controllers/QuestionController');
const responseController = require('./controllers/ResponseController');

// Rotas para o usuário
router.get('/users', userController.read);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

// Rotas para as perguntas
router.get('/questions/:professorId', questionController.getQuestionsByProfessor);
router.post('/questions', questionController.create);
router.delete('/users/:professorId/questions/:questionId', questionController.delete);
router.post('/professors/register-with-default-questions', questionController.registerProfessorWithDefaultQuestions);

// Rotas para responder as perguntas 
router.post('/responses', responseController.saveResponse);

module.exports = router;
