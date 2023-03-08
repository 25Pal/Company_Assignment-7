const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const instructorSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String }

}, { timestamps: true })
module.exports = mongoose.model('instructor', instructorSchema);