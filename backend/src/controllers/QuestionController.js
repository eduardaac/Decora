const { response } = require('express');
const user = require('../models/userData');
const question = require('../models/questionData');

module.exports = {
    async create(request, response) {
        try {
            const { professorId, label, options, answers, priority } = request.body;

            const professor = await user.findById(professorId);
            if (!professor || professor.typeUser !== "professor") {
                return response.status(401).json({ error: 'Apenas professores podem adicionar perguntas.' });
            }

            const questionCreated = await question.create({
                professorId,
                label,
                options,
                answers,
                priority,
            });

            return response.status(201).json(questionCreated);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao adicionar pergunta.' });
        }
    },

    async getQuestionsByProfessor(request, response) {
        try {
            const professorId = request.params.professorId;

            const professor = await user.findById(professorId);
            if (!professor || professor.typeUser !== 'professor') {
                return response.status(401).json({ error: 'Apenas professores podem visualizar suas perguntas.' });
            }

            const questions = await question.find({ professorId });
            response.json(questions);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao obter perguntas.' });
        }
    },

    async answerQuestions(request, response) {
        try {
            const { codigoTurma, alunoId, answers } = request.body;
    
            // Verificar se o aluno existe e pertence à turma do professor
            const aluno = await user.findOne({ _id: alunoId, typeUser: 'aluno', codigoTurma });
            if (!aluno) {
                return response.status(401).json({ error: 'Aluno não encontrado ou não pertence à turma do professor.' });
            }
    
            // Processar as respostas e retornar recomendações
            const recommendations = getRecommendations(alunoId, answers);
    
            response.json(recommendations);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao obter recomendações.' });
        }
    },
    
    async getRecommendations(request, response) {

    },

    async delete(request, response) {
        
    },
};
