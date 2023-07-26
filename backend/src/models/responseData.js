const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseDataSchema = new mongoose.Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'question', required: true },
    selectedOption: { type: Number, required: true },
});

module.exports = mongoose.model('response', ResponseDataSchema);
