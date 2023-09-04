const { response } = require('express');
const user = require('../models/userData');
const question = require('../models/questionData');
const Response = require('../models/responseData');

async function generateRecommendations(userResponses) {
    // Inicialize o objeto de recomendações
    const recommendations = {
        styles: [],
        decisions: [],
        technologies: [],
    };

    try {
        // Crie um objeto para rastrear as respostas e suas prioridades por categoria
        const answerPrioritiesByCategory = {
            styles: {},
            decisions: {},
            technologies: {},
        };

        // Itere pelas respostas do usuário
        for (const questionId of Object.keys(userResponses)) {
            const questionData = await question.findById(questionId);
            if (questionData) {
                const selectedOption = questionData.options[userResponses[questionId]];
                if (selectedOption && selectedOption.answers) {
                    selectedOption.answers.forEach((answerObj) => {
                        answerObj.answer.forEach((answer) => {
                            // Rastreie a prioridade da resposta por categoria
                            const category = questionData.category;
                            if (!answerPrioritiesByCategory[category][answer]) {
                                answerPrioritiesByCategory[category][answer] = questionData.priority;
                            } else {
                                answerPrioritiesByCategory[category][answer] += questionData.priority;
                            }
                        });
                    });
                }
            }
        }

        // Construa as recomendações com base nas prioridades máximas por categoria
        for (const category of Object.keys(answerPrioritiesByCategory)) {
            const categoryPriorities = answerPrioritiesByCategory[category];
            let maxPriority = 0;
            let maxPriorityAnswers = [];

            // Encontre a prioridade máxima dentro da categoria
            for (const answer of Object.keys(categoryPriorities)) {
                const priority = categoryPriorities[answer];
                if (priority > maxPriority) {
                    maxPriority = priority;
                    maxPriorityAnswers = [answer];
                } else if (priority === maxPriority) {
                    maxPriorityAnswers.push(answer);
                }
            }

            // Adicione as respostas com prioridade máxima à categoria
            recommendations[category] = maxPriorityAnswers;
        }

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
            console.log(userRecommendations);
            response.json({
                message: 'Resposta salva com sucesso.',
                recommendations: userRecommendations,
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Erro ao salvar a resposta.' });
        }
    },
};
