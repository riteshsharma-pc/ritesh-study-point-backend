const mongoose = require('mongoose')
const { Schema } = mongoose;

const qnaSchema = new Schema({
    course: { type: String, required: true },
    course: { type: String, required: true },
    subjectCode: { type: Number, required: true },
    unit: { type: Number, required: true },
    question: { type: String, required: true },
    imp: { type: Boolean, required: true },
    ytLink: { type: String },
    answer: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const Qna = mongoose.model('qna', qnaSchema);
module.exports = Qna;