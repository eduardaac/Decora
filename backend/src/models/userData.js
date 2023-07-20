const mongoose = require('mongoose');
const UserDataSchema = new mongoose.Schema({
    nome: String, 
    email: String, 
    dataNascimento: Date, 
    senha: String, 
    atuacao: String, 
    escolaridade: String, 
    typeUser: String, 
    codigoTurma: String
});
module.exports = mongoose.model('user', UserDataSchema);