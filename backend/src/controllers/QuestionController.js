const { response } = require('express');
const user = require('../models/userData');
const question = require('../models/questionData');

module.exports = {
    async create(request, response) {
        try {
            const { professorId, question, options, answers } = request.body;

            const professor = await user.findById(professorId);
            if (!professor || professor.typeUser !== "professor") {
                return response.status(401).json({ error: 'Apenas professores podem adicionar perguntas.' });
            }

            const questionCreated = new question({
                professorId,
                question,
                options,
                answers,
            });

            const savedQuestion = await questionCreated.save();
            response.status(201).json(savedQuestion);
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
            const { alunoId, answers } = request.body;

            const aluno = await user.findById(alunoId);
            if (!aluno || aluno.typeUser !== 'aluno') {
                return response.status(401).json({ error: 'Apenas alunos podem responder perguntas.' });
            }

            const recommendations = getRecommendations(alunoId, answers);

            response.json(recommendations);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao obter recomendações.' });
        }
    },

    async getRecommendations(request, response) {
        try {
            // Lógica para calcular as recomendações com base nas respostas do aluno e respostas dos professores
            // Supondo que você tenha a lógica implementada em uma função chamada "calculateRecommendations"
            const recommendations = calculateRecommendations(request.body);
            response.json(recommendations);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao obter recomendações.' });
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            const professorId = request.headers.professorid; // Pegando o professorId do header

            const professor = await user.findById(professorId);
            if (!professor || professor.typeUser !== "professor") {
                return response.status(401).json({ error: 'Apenas professores podem remover perguntas.' });
            }

            const questionDeleted = await question.findOneAndDelete({ _id: id, professorId });
            if (questionDeleted) {
                return response.json(questionDeleted);
            }

            return response.status(404).json({ error: 'Não foi encontrado esse registro' });
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao remover a pergunta.' });
        }
    },
};
