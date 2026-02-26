import { useEffect, useState } from "react";
import type { NewNote, Note } from "./types/Note";
import { create, getAll, getById, update } from "./services/notes";
import { NoteForm } from "./NoteForm";
const baseUrl = import.meta.env.VITE_NOTES_API_URL as string;
const cleanNote = {
  content: "",
  important: false,
};
function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [newContent, setNewContent] = useState<NewNote>(cleanNote);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleGetById = (id: string) => {
    setError(null);
    setNote(null);
    getById(baseUrl, id)
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

  const handleContentChange = (value: string) => {
    setNewContent((prev) => ({ ...prev, content: value }));
  };
  const handleImportantChange = (value: boolean) => {
    setNewContent((prev) => ({ ...prev, important: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const noteToSave = {
      content: newContent.content,
      important: newContent.important,
    };
    if (editingNote) {
      update(baseUrl, editingNote._id, noteToSave).then((updatedNote) => {
        setNotes(
          notes.map((n) => (n._id === updatedNote._id ? updatedNote : n)),
        );
      });
      console.log(editingNote);
      
      setEditingNote(null)
    } else {
      create(baseUrl, noteToSave).then((createdNote) => {
        setNotes(notes.concat(createdNote));
        // Reset del formulari
        setNewContent(cleanNote);
      });
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setNewContent({ content: note.content, important: note.important });
  };
  useEffect(() => {
    getAll(baseUrl).then(setNotes).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Notes App</h1>
      <div className="card">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {notes?.map((note) => (
            <li key={note._id}>
              <p>{note.content}</p>
              <button onClick={() => handleEdit(note)}>Editar</button>
              <button onClick={() => handleGetById(note._id)}>Detalls</button>
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
            </li>
          ))}
        </ul>
      </div>
      <section>
        <div>
          <h1>Create Note</h1>
          <NoteForm
            newContent={newContent}
            editingNote={editingNote}
            onContentChange={handleContentChange}
            onImportantChange={handleImportantChange}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
