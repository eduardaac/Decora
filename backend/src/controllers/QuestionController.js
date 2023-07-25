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

    async delete(request, response) {
        try {
            const professorId = request.params.professorId;
            const questionId = request.params.questionId;

            // Verificar se o professor existe e é um professor
            const professor = await user.findById(professorId);
            if (!professor || professor.typeUser !== "professor") {
                return response.status(401).json({ error: 'Apenas professores podem deletar perguntas.' });
            }

            // Encontrar a pergunta a ser deletada
            const questionToDelete = await question.findById(questionId);
            if (!questionToDelete) {
                return response.status(404).json({ error: 'Pergunta não encontrada.' });
            }

            // Verificar se a pergunta pertence ao professor atual
            if (questionToDelete.professorId.toString() !== professorId) {
                return response.status(403).json({ error: 'Você não tem permissão para deletar esta pergunta.' });
            }

            // Deletar a pergunta usando o método deleteOne()
            await question.deleteOne({ _id: questionId });
            return response.status(200).json({ message: 'Pergunta deletada com sucesso.' });
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao deletar pergunta.' });
        }
    },
};
