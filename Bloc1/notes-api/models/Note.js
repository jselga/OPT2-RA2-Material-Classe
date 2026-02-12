const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
    content:
    {
        type: String,
        required: true
    },
    date: Date,
    important: {
        type: Boolean,
        default: false
    }
})

const Note = model('Note', noteSchema);
module.exports = Note;