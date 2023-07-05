const mongoose = require('mongoose')
const { Schema } = mongoose;

const theorySchema = new Schema({
    course: { type: String, required: true },
    sem: {type: Number, required: true},
    subjectCode: { type: Number, required: true },
    unit: { type: Number, required: true },
    topic: { type: String, required: true },
    imp: { type: Boolean, required: true },
    ytLink: { type: String },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const Theory = mongoose.model('theory', theorySchema);
module.exports = Theory;