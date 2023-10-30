const user = require('../models/userData');
const question = require('../models/questionData');
const defaultQuestions = require('./defaultQuestions'); 

module.exports = {
    async create(request, response) {
        try {
            const { professorId, label, options, answers, priority, category } = request.body;

            const professor = await user.findById(professorId);
            if (!professor || professor.typeUser !== 'professor') {
                return response.status(401).json({ error: 'Apenas professores podem adicionar perguntas.' });
            }

            const questionCreated = await question.create({
                professorId,
                label,
                options,
                answers,
                priority,
                category,
            });

            return response.status(201).json(questionCreated);
        } catch (error) {
            console.log("ERRO", error);
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
            return response.json(questions);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao obter perguntas.' });
        }
    },

    async getQuestionsByClassCode(request, response) {
        try {
            const { codigoTurma } = request.params;

            const professor = await user.findOne({ codigoTurma });

            if (!professor || professor.typeUser !== 'professor') {
                return response.status(404).json({ error: 'Professor não encontrado para este código de turma.' });
            }

            const questions = await question.find({ professorId: professor._id });
            return response.json(questions);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao obter perguntas.' });
        }
    },

    async delete(request, response) {
        try {
            const professorId = request.params.professorId;
            const questionId = request.params.questionId;

            const professor = await user.findById(professorId);
            if (!professor || professor.typeUser !== 'professor') {
                return response.status(401).json({ error: 'Apenas professores podem deletar perguntas.' });
            }

            const questionToDelete = await question.findById(questionId);
            if (!questionToDelete) {
                return response.status(404).json({ error: 'Pergunta não encontrada.' });
            }

            if (questionToDelete.professorId.toString() !== professorId) {
                return response.status(403).json({ error: 'Você não tem permissão para deletar esta pergunta.' });
            }

            await question.deleteOne({ _id: questionId });
            return response.status(200).json({ message: 'Pergunta deletada com sucesso.' });
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao deletar pergunta.' });
        }
    },

    async registerProfessorWithDefaultQuestions(professorId) {
        try {
            const professor = await user.findById(professorId);
            if (!professor || professor.typeUser !== 'professor') {
                return { error: 'Somente professores podem ser registrados com perguntas padrão.' };
            }

            const existingQuestions = await question.find({ professorId });
            if (existingQuestions.length > 0) {
                return { message: 'Professor já possui perguntas cadastradas.' };
            }

            const defaultQuestionsToCreate = defaultQuestions.map((defaultQuestion) => ({
                ...defaultQuestion,
                professorId,
            }));

            const defaultQuestionsCreated = await question.create(defaultQuestionsToCreate);

            return {
                message: 'Professor registrado com perguntas padrão.',
                defaultQuestionsCreated,
            };
        } catch (error) {
            return { error: 'Erro ao registrar professor com perguntas padrão.' };
        }
    },

};
