const mongoose = require('mongoose');
const QuestionDataSchema = new mongoose.Schema({
    domain: String,
    application: String,
    numberUser: String, 
    technologicalExp: String,
    dataBaseExp: String,
    interactionsUsers: String,
    transmission: String,
    availability: String,
    maintainability: String,
    security: String,
    usability: String,
    elasticity: String 
});
module.exports = mongoose.model('question', QuestionDataSchema);