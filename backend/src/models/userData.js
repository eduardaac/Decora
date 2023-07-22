const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDataSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    senha: { type: String, required: true },
    atuacao: { type: String, required: true },
    escolaridade: { type: String, required: true },
    typeUser: { type: String, enum: ['professor', 'aluno'], required: true },
    codigoTurma: { type: String },
});
module.exports = mongoose.model('user', UserDataSchema);