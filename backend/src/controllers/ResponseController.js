const { response } = require('express');
const user = require('../models/userData');
const question = require('../models/questionData');
const Response = require('../models/responseData');

// Função para processar as respostas e gerar recomendações
async function generateRecommendations(userId) {
    const recommendations = {
        styles: [],
        decisions: [],
        technologies: [],
    };

    try {
        // Encontre todas as respostas do usuário
        const userResponses = await Response.find({ userId });

        // Objeto para contabilizar as respostas por categoria
        const categoryCounts = {
            styles: {},
            decisions: {},
            technologies: {},
        };

        // Loop assíncrono para processar as respostas
        await Promise.all(userResponses.map(async (response) => {
            const questionData = await question.findById(response.questionId);
            if (questionData) {
                const selectedOption = questionData.options[response.selectedOption];
                // Iterar pelas respostas de cada opção
                selectedOption.answers.forEach((answerObj) => {
                    answerObj.answer.forEach((answer) => {
                        const category = questionData.category;
                        if (!categoryCounts[category][answer]) {
                            categoryCounts[category][answer] = questionData.priority;
                        } else {
                            categoryCounts[category][answer] += questionData.priority;
                        }
                    });
                });
            }
        }));

        // Calcular as recomendações com base nas contagens ponderadas
        Object.keys(categoryCounts).forEach((category) => {
            const answers = categoryCounts[category];

            if (Object.keys(answers).length > 0) {
                const recommendedAnswer = Object.keys(answers).reduce((prevAnswer, currAnswer) => {
                    return answers[currAnswer] > answers[prevAnswer] ? currAnswer : prevAnswer;
                });
                recommendations[category].push(recommendedAnswer);
            }
        });

        return recommendations;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao gerar recomendações.');
    }
}

// Exportar funções do controlador
module.exports = {
    async saveResponse(request, response) {
        try {
            const { classCode, questionId, selectedOption } = request.body;

            // Verificar e encontrar o usuário e a pergunta
            const foundUser = await user.findOne({ codigoTurma: classCode });
            if (!foundUser) {
                return response.status(404).json({ error: 'Código de turma inválido ou usuário não encontrado na turma.' });
            }
            const questionData = await question.findById(questionId);
            if (!questionData) {
                return response.status(404).json({ error: 'Pergunta não encontrada.' });
            }

            // Verificar se já existe uma resposta para essa pergunta pelo mesmo usuário
            const existingResponse = await Response.findOne({ userId: foundUser._id, questionId });

            if (existingResponse) {
                // Atualizar a resposta existente
                existingResponse.selectedOption = selectedOption;
                await existingResponse.save();
                response.json({ message: 'Resposta atualizada com sucesso.' });
            } else {
                // Criar uma nova resposta
                const newResponse = new Response({ userId: foundUser._id, questionId, selectedOption });
                await newResponse.save();

                // Processar recomendações
                const userRecommendations = await generateRecommendations(foundUser._id);

                response.json({
                    message: 'Resposta salva com sucesso.',
                    recommendations: userRecommendations
                });
            }
        } catch (error) {
            response.status(500).json({ error: 'Erro ao salvar a resposta.' });
        }
    },
};
