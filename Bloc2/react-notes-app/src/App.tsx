import { useEffect, useState } from "react";
import type { Note } from "./types/Note";
import { create, getAll, getById, remove, update } from "./services/notes";
import { NoteForm } from "./NoteForm";
import type { NoteFormData } from "./schemas/noteSchema";
function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  // const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleGetById = (id: string) => {
    setError(null);
    // setNote(null);
    getById(id)
      .then(setSelectedNote)
      .catch((error) => {
        if (error.response?.status === 404) {
          setError("Nota no trobada");
        } else if (error.response?.status === 400) {
          setError("Id mal formatada");
        } else {
          setError("Error inesperat");
        }
      });
  };

  const handleSubmit = (data: NoteFormData) => {
    const noteToSave = {
      content: data.content,
      important: data.important,
    };
    if (editingNote) {
      update(editingNote._id, noteToSave).then((updatedNote) => {
        console.log("UPDATED", updatedNote);

        setNotes((prevNotes) =>
          prevNotes.map((n) => (n._id === updatedNote._id ? updatedNote : n)),
        );
        setEditingNote(null);
      });
      console.log(editingNote);
    } else {
      create(noteToSave).then((createdNote) => {
        setNotes((prevNotes) => prevNotes.concat(createdNote));
      });
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };
  const handleDelete = (id: string) => {
    remove(id)
      .then(() => {
        setNotes(notes.filter((n) => n._id !== id));
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getAll().then(setNotes).catch(console.error);
  }, []);

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
