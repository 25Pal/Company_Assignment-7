const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const studentSchema = new mongoose.Schema({
    name: { type: String },
    subject: { type: String },
    marks: { type: Number },
    instructorId: {
        type: ObjectId,
        ref: 'instructor'
    },
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true })
module.exports = mongoose.model('student', studentSchema);