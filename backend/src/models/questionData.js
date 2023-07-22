const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer: { type: String, required: true },
    priority: { type: Number, required: true },
});

const QuestionDataSchema = new Schema({
    professorId: { type: Schema.Types.ObjectId, ref: 'user', required: true }, 
    options: [String], 
    answers: [answerSchema],
});

module.exports = mongoose.model('question', QuestionDataSchema);
