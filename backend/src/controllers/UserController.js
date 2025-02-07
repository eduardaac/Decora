const { response } = require('express');
const user = require('../models/userData');
const question = require('../models/questionData');
const { registerProfessorWithDefaultQuestions } = require('./QuestionController');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

function generateUniqueCodigoTurma() {
    const codigoTurma = uuidv4();
    return codigoTurma;
}

const secretKey = 'sua_chave_secreta_aqui';

module.exports = {

    async login(request, response) {
        try {
            const { email, senha } = request.body;

            const existingUser = await user.findOne({ email });

            if (!existingUser) {
                return response.status(401).json({ error: 'E-mail inválido.' });
            }

            const isPasswordValid = await bcrypt.compare(senha, existingUser.senha);

            if (!isPasswordValid) {
                return response.status(401).json({ error: 'Senha inválida.' });
            }

            const token = jwt.sign({ userId: existingUser._id }, secretKey, { expiresIn: '1h' });

            return response.json({
                token,
                userId: existingUser._id,
                typeUser: existingUser.typeUser, // Adicione o typeUser ao JSON de resposta
                codigoTurma: existingUser.codigoTurma,
            });

        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Erro ao fazer login.' });
        }
    },

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

            let generatedCodigoTurma;
            if (typeUser === "professor") {
                generatedCodigoTurma = generateUniqueCodigoTurma();
            } else if (typeUser === "aluno") {
                // Verificar se o código de turma existe no banco de dados
                const turmaExists = await user.exists({ typeUser: "professor", codigoTurma });
                if (!turmaExists) {
                    return response.status(400).json({ error: 'Código de turma não encontrado.' });
                }
                generatedCodigoTurma = codigoTurma; // Salvar o código de turma fornecido pelo aluno
            }

            const existingUser = await user.findOne({ email });

            if (existingUser) {
                return response.status(400).json({ error: 'Este email já está em uso.' });
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

            // Verificar se o usuário criado é um professor e registrar as perguntas padrão, se necessário
            if (typeUser === 'professor') {
                const registerResult = await registerProfessorWithDefaultQuestions(userCreated._id);
                if (registerResult.error) {
                    return response.status(500).json({ error: 'Erro ao registrar professor com perguntas padrão.' });
                }
            }

            return response.status(201).json(userCreated);
        } catch (error) {
            console.log(error);
            return response.status(500).ajson({ error: 'Erro ao criar usuário.' });
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;

            // Encontre o professor para verificar seu tipo de usuário e codigoTurma
            const professor = await user.findById(id);

            if (!professor) {
                return response.status(404).json({ error: 'Usuário não encontrado.' });
            }

            // Verifique se o professor é do tipo de usuário 'professor' e tem um codigoTurma
            if (professor.typeUser === 'professor' && professor.codigoTurma) {
                // Encontre todos os alunos vinculados a esse professor pelo mesmo codigoTurma
                const alunos = await user.find({ typeUser: 'aluno', codigoTurma: professor.codigoTurma });

                // Atualize o código de turma dos alunos para null, para que eles precisem inserir novamente
                for (const aluno of alunos) {
                    aluno.codigoTurma = null;
                    await aluno.save();
                }
            }

            // Delete as perguntas do professor associadas ao codigoTurma
            await question.deleteMany({ professorId: id });

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

            console.log("Updating user with ID:", id);
            const existingUser = await user.findById(id);

            if (!existingUser) {
                return response.status(404).json({ error: 'Usuário não encontrado.' });
            }

            // Atualizar somente os campos que foram enviados no corpo da requisição
            existingUser.nome = nome || existingUser.nome;
            existingUser.email = email || existingUser.email;
            existingUser.dataNascimento = dataNascimento || existingUser.dataNascimento;
            existingUser.atuacao = atuacao || existingUser.atuacao;
            existingUser.escolaridade = escolaridade || existingUser.escolaridade;
            existingUser.typeUser = typeUser || existingUser.typeUser;

            // Se uma nova senha foi fornecida, criptografá-la e atualizar
            if (senha) {
                existingUser.senha = await bcrypt.hash(senha, 10);
            }

            if (typeUser === 'professor') {
                existingUser.codigoTurma = generateUniqueCodigoTurma();
                const updatedUser = await existingUser.save();

                const registerResult = await registerProfessorWithDefaultQuestions(updatedUser._id);
                if (registerResult.error) {
                    return response.status(500).json({ error: 'Erro ao registrar professor com perguntas padrão.' });
                }
            } else if (typeUser === 'aluno') {
                const turmaExists = await user.exists({ typeUser: "professor", codigoTurma });
                if (!turmaExists) {
                    return response.status(400).json({ error: 'Código de turma não encontrado.' });
                }
                existingUser.codigoTurma = codigoTurma || existingUser.codigoTurma;
            }

            // Salvar as alterações
            const updatedUser = await existingUser.save();

            return response.json(updatedUser);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao atualizar o usuário.' });
        }
    },
    async getUserById(request, response) {
        try {
            const { id } = request.params;
            const existingUser = await user.findById(id);

            if (!existingUser) {
                return response.status(404).json({ error: 'Usuário não encontrado.' });
            }

            const alunos = await user.find({ typeUser: 'aluno', codigoTurma: existingUser.codigoTurma });
            const totalAlunos = alunos.length;
            const nomesAlunos = alunos.map((aluno) => aluno.nome);
            const emailAlunos = alunos.map((aluno) => aluno.email);

            // Crie um novo objeto com todas as informações necessárias
            const responseData = {
                _id: existingUser._id,
                nome: existingUser.nome,
                email: existingUser.email,
                dataNascimento: existingUser.dataNascimento,
                senha: existingUser.senha,
                atuacao: existingUser.atuacao,
                codigoTurma: existingUser.codigoTurma,
                escolaridade: existingUser.escolaridade,
                typeUser: existingUser.typeUser,
                totalAlunos: totalAlunos,
                nomesAlunos: nomesAlunos,
                emailAlunos: emailAlunos,
            };

            return response.json(responseData);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Erro ao obter informações do usuário.' });
        }
    },

    async deleteAllUsers(request, response) {
        try {
            // Delete todos os usuários
            await user.deleteMany({}); // Isso vai deletar todos os documentos na coleção 'users'

            // Opcional: Também pode deletar outras informações relacionadas (por exemplo, perguntas associadas aos professores)
            await question.deleteMany({}); // Isso vai deletar todas as perguntas

            return response.json({ message: 'Todos os usuários foram deletados com sucesso.' });
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao deletar todos os usuários.' });
        }
    }

};
