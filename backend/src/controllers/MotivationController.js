const motivation = require('../models/motivationData')
const defaultMotivations = require('./defaultMotivations');


module.exports = {
    async create(request, response) {
        const { answer, explanation } = request.body;

        if (!answer || !explanation) {
            return response.status(400).json({ error: "Label e explicação são obrigatórios." });
        }

        motivation.push({ answer, explanation });

        return response.status(201).json({ message: "Motivação adicionada com sucesso." });
    },

    async getMotivationsByAnswer(request, response) {
        const { answer } = request.params;

        const motivation = defaultMotivations.find((m) => m.answer === answer);

        if (motivation) {
            return response.json(motivation);
        } else {
            return response.status(404).json({ error: "Motivação não encontrada nas motivações padrão." });
        }
    }

};
