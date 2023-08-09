const { response } = require('express');
const user = require('../models/userData');
const question = require('../models/questionData');
const Response = require('../models/responseData');

// Função para processar as respostas e gerar recomendações
function generateRecommendations(answers) {
    const recommendations = {
        styles: [],
        decisions: [],
        technologies: [],
    };

    // Percorre as respostas e identifica as recomendações correspondentes
    answers.forEach((answer) => {
        const question = defaultQuestions.find((q) => q.label === answer.question);
        if (question) {
            question.options.forEach((option) => {
                if (option.type === answer.answer) {
                    const category = question.category;
                    if (option.answers) {
                        recommendations[category].push(...option.answers[0].answer);
                    }
                }
            });
        }
    });

    return recommendations;
}

module.exports = {
    async saveResponse(request, response) {
        try {
            const { classCode, questionId, selectedOption } = request.body;

            // Verifique se o usuário (aluno ou professor) existe e faz parte da turma
            const user = await user.findOne({ codigoTurma: classCode });
            if (!user) {
                return response.status(404).json({ error: 'Código de turma inválido ou usuário não encontrado na turma.' });
            }

            // Verifique se a pergunta existe
            const questionData = await question.findById(questionId);
            if (!questionData) {
                return response.status(404).json({ error: 'Pergunta não encontrada.' });
            }

            // Verificar se já existe uma resposta para essa pergunta pelo mesmo usuário
            const existingResponse = await Response.findOne({ userId: user._id, questionId });

            if (existingResponse) {
                // Se a resposta já existir, atualize-a
                existingResponse.selectedOption = selectedOption;
                await existingResponse.save();
                response.json({ message: 'Resposta atualizada com sucesso.' });
            } else {
                // Se a resposta ainda não existir, crie uma nova
                const newResponse = new Response({ userId: user._id, questionId, selectedOption });
                await newResponse.save();

                // Processar recomendações
                const userRecommendations = generateRecommendations(userAnswers);

                response.json({ 
                    message: 'Resposta salva com sucesso.', 
                    recommendations: userRecommendations 
                });
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: 'Erro ao salvar a resposta.' });
        }
    },
};
