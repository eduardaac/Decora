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

        // Crie um objeto para contabilizar as respostas por categoria
        const categoryCounts = {
            styles: {},
            decisions: {},
            technologies: {},
        };

        // Usar Promise.all para aguardar todas as operações assíncronas no loop
        await Promise.all(userResponses.map(async (response) => {
            const questionData = await question.findById(response.questionId);
            if (questionData) {
                const selectedOption = questionData.options[response.selectedOption];
                selectedOption.answers[0].answer.forEach((answer) => {
                    const category = questionData.category;
                    if (!categoryCounts[category][answer]) {
                        categoryCounts[category][answer] = 0;
                    }
                    categoryCounts[category][answer] += questionData.priority;
                });
            }
        }));

        // Calcule as recomendações com base nas contagens ponderadas
        Object.keys(categoryCounts).forEach((category) => {
            const answers = categoryCounts[category];
            
            if (Object.keys(answers).length > 0) {  // Verifica se o array não está vazio
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
            const { classCode, questionId, selectedOption } = request.body;

            // Verifique se o usuário (aluno ou professor) existe e faz parte da turma
            const foundUser = await user.findOne({ codigoTurma: classCode });
            if (!foundUser) {
                return response.status(404).json({ error: 'Código de turma inválido ou usuário não encontrado na turma.' });
            }

            // Verifique se a pergunta existe
            const questionData = await question.findById(questionId);
            if (!questionData) {
                return response.status(404).json({ error: 'Pergunta não encontrada.' });
            }

            // Verificar se já existe uma resposta para essa pergunta pelo mesmo usuário
            const existingResponse = await Response.findOne({ userId: foundUser._id, questionId });

            if (existingResponse) {
                // Se a resposta já existir, atualize-a
                existingResponse.selectedOption = selectedOption;
                await existingResponse.save();
                response.json({ message: 'Resposta atualizada com sucesso.' });
            } else {
                // Se a resposta ainda não existir, crie uma nova
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
            console.log(error);
            response.status(500).json({ error: 'Erro ao salvar a resposta.' });
        }
    },
};
