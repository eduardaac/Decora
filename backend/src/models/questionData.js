const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer: { type: [String],}, // Um array de strings para as respostas
});

const QuestionSchema = new Schema({
    professorId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    label: { type: String, required: true },
    options: [{ text: String, answers: [answerSchema] }], // Um array de objetos com "text" e "answers" para cada opção
    priority: { type: Number, required: true },
});

module.exports = mongoose.model('question', QuestionSchema);
