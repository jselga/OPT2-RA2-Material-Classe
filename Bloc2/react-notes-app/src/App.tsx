import type { Note } from "./types/Note";
import { NoteForm } from "./NoteForm";
import type { NoteFormData } from "./schemas/noteSchema";
import { useNotes } from "./hooks/useNotes";
function App() {
  const {
    notes,
    editingNote,
    selectedNote,
    setEditingNote,
    loadNoteDetails,
    addNote,
    updateNote,
    deleteNote,
    error
  } = useNotes();

  const handleGetById = (id: string) => {
    loadNoteDetails(id);
  };

  const handleSubmit = (data: NoteFormData) => {
    const noteToSave = {
      content: data.content,
      important: data.important,
    };

    if (editingNote) {
      updateNote(editingNote._id, noteToSave);
    } else {
      addNote(noteToSave);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };
  const handleDelete = (id: string) => {
    deleteNote(id);
  };

  return (
    <div>
      <h1>Notes App</h1>
      <div className="card">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {notes?.map((note) => (
            <li key={note._id}>
              <p>
                {note.content}
                <button onClick={() => handleGetById(note._id)}>+</button>
              </p>

              {selectedNote?._id === note._id && (
                <div>
                  <p>ID: {selectedNote._id}</p>
                  <p>Created at: {selectedNote.date}</p>
                  {note?.important && (
                    <p>
                      <strong>IMPORTANT</strong>
                    </p>
                  )}
                </div>
              )}
              <button onClick={() => handleEdit(note)}>Editar</button>
              <button onClick={() => handleDelete(note._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <section>
        <div>
          <h1>Create Note</h1>
          <NoteForm onSubmit={handleSubmit} editingNote={editingNote} />
        </div>
      </section>
    </div>
  );
}

export default App;
