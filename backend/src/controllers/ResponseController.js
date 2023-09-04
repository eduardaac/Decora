const { response } = require('express');
const user = require('../models/userData');
const question = require('../models/questionData');
const Response = require('../models/responseData');

async function generateRecommendations(userResponses) {
    const recommendations = {
        styles: [],
        decisions: [],
        technologies: [],
    };

    try {
        const categoryCounts = {
            styles: {},
            decisions: {},
            technologies: {},
        };

        // Iterar pelas respostas do usuário
        Object.keys(userResponses).forEach(async (questionId) => {
            const questionData = await question.findById(questionId);
            if (questionData) {
                const selectedOption = questionData.options[userResponses[questionId]];
                if (selectedOption && selectedOption.answers) { // Verifica se há respostas vinculadas
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
            }
        });

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

module.exports = {
    async saveResponse(request, response) {
        try {
            const { classCode, userResponses } = request.body;

            const foundUser = await user.findOne({ codigoTurma: classCode });
            if (!foundUser) {
                return response.status(404).json({ error: 'Código de turma inválido ou usuário não encontrado na turma.' });
            }

            // Processar recomendações
            const userRecommendations = await generateRecommendations(userResponses);

            response.json({
                message: 'Resposta salva com sucesso.',
                recommendations: userRecommendations
            });
        } catch (error) {
            response.status(500).json({ error: 'Erro ao salvar a resposta.' });
        }
    },
};