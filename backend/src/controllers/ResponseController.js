const { response } = require('express');
const user = require('../models/userData');
const question = require('../models/questionData');
const Response = require('../models/responseData');

module.exports = {
    async viewQuestionsForStudent(request, response) {
        try {
            const classCode = request.params.codigoTurma;
            const professor = await user.findOne({ codigoTurma: classCode, typeUser: 'professor' });
            if (!professor) {
                return response.status(404).json({ error: 'Código de turma inválido ou professor não encontrado.' });
            }
            const questions = await question.find({ professorId: professor._id }).populate('options.answers');

            response.json({ questions });
        } catch (error) {
            response.status(500).json({ error: 'Erro ao recuperar as perguntas.' });
        }
    },
    async saveResponse(request, response) {
        try {
            const { classCode, questionId, selectedOption } = request.body;
            const student = await user.findOne({ codigoTurma: classCode, typeUser: 'aluno' });

            if (!student) {
                return response.status(404).json({ error: 'Código de turma inválido ou aluno não encontrado.' });
            }

            // Verifique se a pergunta existe
            const questionData = await question.findById(questionId);
            if (!questionData) {
                return response.status(404).json({ error: 'Pergunta não encontrada.' });
            }

            // Verificar se já existe uma resposta para essa pergunta pelo mesmo aluno
            const existingResponse = await Response.findOne({ studentId: student._id, questionId });

            if (existingResponse) {
                // Se a resposta já existir, atualize-a
                existingResponse.selectedOption = selectedOption;
                await existingResponse.save();
                response.json({ message: 'Resposta atualizada com sucesso.' });
            } else {
                // Se a resposta ainda não existir, crie uma nova
                const responses = new Response({ studentId: student._id, questionId, selectedOption });
                await responses.save();
                response.json({ message: 'Resposta salva com sucesso.' });
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: 'Erro ao salvar a resposta.' });
        }
    },

};
