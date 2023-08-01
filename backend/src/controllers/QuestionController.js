const user = require('../models/userData');
const question = require('../models/questionData');
const defaultQuestions = require('./defaultQuestions'); // Importe as perguntas padrão de onde estão definidas

module.exports = {
    // Cria uma nova pergunta
    async create(request, response) {
        try {
            const { professorId, label, options, answers, priority } = request.body;

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
            });

            return response.status(201).json(questionCreated);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao adicionar pergunta.' });
        }
    },

    // Obtém todas as perguntas de um professor específico
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

    async delete(request, response) {
        try {
            const professorId = request.params.professorId;
            const questionId = request.params.questionId;

            // Verificar se o professor existe e é um professor
            const professor = await user.findById(professorId);
            if (!professor || professor.typeUser !== 'professor') {
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

    // Registra um professor com perguntas padrão (caso ele não tenha perguntas cadastradas)
    async registerProfessorWithDefaultQuestions(request, response) {
        try {
            const { professorId } = request.body;

            const professor = await user.findById(professorId);
            if (!professor || professor.typeUser !== 'professor') {
                return response
                    .status(401)
                    .json({ error: 'Somente professores podem ser registrados com perguntas padrão.' });
            }

            // Verifica se o professor já possui perguntas, se sim, não adiciona as padrões novamente
            const existingQuestions = await question.find({ professorId });
            if (existingQuestions.length > 0) {
                return response.status(200).json({ message: 'Professor já possui perguntas cadastradas.' });
            }

            // Adicionar perguntas padrão ao banco de dados
            const defaultQuestionsCreated = await question.create(
                defaultQuestions.map((defaultQuestion) => ({ ...defaultQuestion, professorId }))
            );

            return response.status(201).json({
                message: 'Professor registrado com perguntas padrão.',
                defaultQuestionsCreated,
            });
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao registrar professor com perguntas padrão.' });
        }
    },
};
