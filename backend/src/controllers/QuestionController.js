const { response } = require('express');
const question = require('../models/questionData');

module.exports = {

    async read(request, response) {
        const questionList = await question.find();
        return response.json(questionList);
    },

    async create(request, response) {
        const { domain, application, numberUser, technologicalExp, dataBaseExp, interactionsUsers, transmission, availability, maintainability, security, usability } = request.body;
        const questionCreated = await question.create({
            domain,
            application,
            numberUser,
            technologicalExp,
            dataBaseExp,
            interactionsUsers,
            transmission,
            availability,
            maintainability,
            security,
            usability,
        })
    },
    async delete(request, response) {
        const { id } = request.params;
        const questionDeleted = await question.findOneAndDelete({ _id: id });
        if (questionDeleted) {
            return response.json(questionDeleted);
        }
        return response.status(401).json({ error: 'Não foi encontrado esse registro' })
    },
    async update(request, response) {
        const { id } = request.params;
        const {
            domain,
            application,
            numberUser,
            technologicalExp,
            dataBaseExp,
            interactionsUsers,
            transmission,
            availability,
            maintainability,
            security,
            usability
        } = request.body;

        if (!id) {
            return response.status(400).json({ error: 'ID de usuário inválido.' });
        }
        try {
            const existingQuestion = await question.findById(id);

            if (!existingQuestion) {
                return response.status(404).json({ error: 'Usuário não encontrado.' });
            }

            if (domain) {
                existingQuestion.domain = domain;
            }
            if (application) {
                existingQuestion.application = application;
            }
            if (numberUser) {
                existingQuestion.numberUser = numberUser;
            }
            if (technologicalExp) {
                existingQuestion.technologicalExp = technologicalExp;
            }
            if (dataBaseExp) {
                existingQuestion.dataBaseExp = dataBaseExp;
            }
            if (interactionsUsers) {
                existingQuestion.interactionsUsers = interactionsUsers;
            }
            if (transmission) {
                existingQuestion.transmission = transmission;
            }
            if (availability) {
                existingQuestion.availability = availability;
            }
            if (maintainability) {
                existingQuestion.maintainability = maintainability;
            }
            if (security) {
                existingQuestion.security = security;
            }
            if (usability) {
                existingQuestion.usability = usability;
            }

            const updatedQuestion = await existingQuestion.save();

            return response.json(updatedQuestion);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao atualizar o perguntas.' });
        }
    },
};