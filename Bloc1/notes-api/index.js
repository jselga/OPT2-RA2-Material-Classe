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


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
