const express = require('express');
const router = express.Router();

const userController = require('./controllers/UserController');
const questionController = require('./controllers/QuestionController');

// Rotas para o usuário
router.get('/users', userController.read);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

// Rotas para as perguntas
router.get('/questions/:professorId', questionController.getQuestionsByProfessor);
router.post('/questions', questionController.create);
router.post('/questions/answers', questionController.answerQuestions);
router.get('/questions/recommendations', questionController.getRecommendations);
router.delete('/questions/:id', questionController.delete);

module.exports = router;
