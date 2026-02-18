require('dotenv').config()
require('./mongo');

const express = require('express');
const app = express();

const Note = require('./models/Note');

app.use(express.json());

// GET
app.get('/', (request, response) => {
    response.send(`<h1>Notes API go to <a href='/api/notes'> /api/notes</a>  to get all Notes</h1>`)
})
app.get('/api/notes', (request, response, next) => {
    Note.find({}).then(notes => {
        response.json(notes)
    }).catch(err => next(err))
})
//TODO Exercici de classe
app.get('/api/notes/:id')

//POST
app.post('/api/notes', (request, response, next) => {

    const note = request.body
    if (!note || !note.content) {
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }
    const newNote = new Note({
        content: note.content,
        date: new Date(),
        important: typeof note.important !== 'undefined' ? note.important : false
    })
    newNote.save()
        .then(savedNote => {
            response.status(201).json(savedNote)
        }).catch(err => next(err))
})

//PUT

app.put('/api/notes/:id', (request, response, next) => {
    const { id } = request.params;
    const note = request.body;
    const newNoteInfo = {
        content: note.content,
        important: note.important
    }
    Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
        .then(result => {
            result ? response.json(note) : response.status(404).end()
        }).catch(error => next(error))
})
// Middleware: not found
app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
