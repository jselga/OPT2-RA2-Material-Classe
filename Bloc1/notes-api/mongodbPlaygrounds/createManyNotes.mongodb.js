// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('notesapp');

// Create a new document in the collection.
db.getCollection('notes').insertMany([
    {
        content: "Primera nota",
        date: new Date(),
        important: true
    },
    {
        content: "Segona nota",
        date: new Date(),
        important: false
    }
]);



