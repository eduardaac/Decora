const mongoose = require('mongoose');
const UserDataSchema = new mongoose.Schema({
    nome: String, 
    email: String, 
    
});
module.exports = mongoose.model('user', UserDataSchema);