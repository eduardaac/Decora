const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDataSchema = new mongoose.Schema({
    nome: { type: String, },
    email: { type: String,},
    dataNascimento: { type: Date, },
    senha: { type: String,  },
    atuacao: { type: String, },
    escolaridade: { type: String, },
    typeUser: { type: String, enum: ['professor', 'aluno'], },
    codigoTurma: { type: String },
});
module.exports = mongoose.model('user', UserDataSchema);