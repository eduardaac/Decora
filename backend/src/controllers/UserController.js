const { response } = require('express');
const user = require('../models/userData');
const { v4: uuidv4 } = require('uuid');

function generateUniqueCodigoTurma() {
    const codigoTurma = uuidv4();
    return codigoTurma;
}

module.exports = {
    async read(request, response) {
        try {
            const userList = await user.find();
            return response.json(userList);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao obter lista de usuários.' });
        }
    },

    async create(request, response) {
        try {
            const { nome, email, dataNascimento, senha, atuacao, escolaridade, typeUser, codigoTurma } = request.body;
            // Verificar se o typeUser é "professor" e gerar um código de turma aleatório e distinto
            let generatedCodigoTurma;
            if (typeUser === "professor") {
                generatedCodigoTurma = generateUniqueCodigoTurma();
            } else if (typeUser === "aluno") {
                // Verificar se o código de turma existe no banco de dados
                const turmaExists = await user.exists({ typeUser: "professor", codigoTurma });
                if (!turmaExists) {
                    return response.status(400).json({ error: 'Código de turma não encontrado.' });
                }
            }
            const userCreated = await user.create({
                nome,
                email,
                dataNascimento,
                senha,
                atuacao,
                escolaridade,
                typeUser,
                codigoTurma: generatedCodigoTurma,
            });
            return response.status(201).json(userCreated);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            const userDeleted = await user.findOneAndDelete({ _id: id });
            if (userDeleted) {
                return response.json(userDeleted);
            }
            return response.status(404).json({ error: 'Usuário não encontrado.' });
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao remover usuário.' });
        }
    },

    async update(request, response) {
        try {
            const { id } = request.params;
            const {
                nome,
                email,
                dataNascimento,
                senha,
                atuacao,
                escolaridade,
                typeUser,
                codigoTurma
            } = request.body;

            const existingUser = await user.findById(id);
            if (!existingUser) {
                return response.status(404).json({ error: 'Usuário não encontrado.' });
            }

            // Atualizar somente os campos que foram enviados no corpo da requisição
            existingUser.nome = nome || existingUser.nome;
            existingUser.email = email || existingUser.email;
            existingUser.dataNascimento = dataNascimento || existingUser.dataNascimento;
            existingUser.senha = senha || existingUser.senha;
            existingUser.atuacao = atuacao || existingUser.atuacao;
            existingUser.escolaridade = escolaridade || existingUser.escolaridade;
            existingUser.typeUser = typeUser || existingUser.typeUser;
            existingUser.codigoTurma = codigoTurma || existingUser.codigoTurma;

            const updatedUser = await existingUser.save();

            return response.json(updatedUser);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao atualizar o usuário.' });
        }
    },
};
