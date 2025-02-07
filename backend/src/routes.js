const express = require('express');
const router = express.Router();

const userController = require('./controllers/UserController');
const questionController = require('./controllers/QuestionController');
const responseController = require('./controllers/ResponseController');
const motivationController = require('./controllers/MotivationController');

// Rotas para o usuário
router.get('/users', userController.read);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);
router.delete('/users', userController.deleteAllUsers);
router.post('/login', userController.login);
router.get('/users/:id', userController.getUserById);

// Rotas para as perguntas
router.get('/questions/:professorId', questionController.getQuestionsByProfessor);
router.post('/questions', questionController.create);
router.delete('/users/:professorId/questions/:questionId', questionController.delete);
router.get('/questions/byclass/:codigoTurma', questionController.getQuestionsByClassCode);

// Rotas para responder as perguntas 
router.post('/responses', responseController.saveResponse);

// Rotas para buscar a Motivação da Recomendação
router.get('/motivations/getMotivationsByAnswer/:answer', motivationController.getMotivationsByAnswer);

module.exports = router;
