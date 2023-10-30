const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotivationDataSchema = new mongoose.Schema({
    label: { type: String, required: true },
    explanation: {type: String, required: true}
});

module.exports = mongoose.model('motivation', MotivationDataSchema);