import { useEffect, useState } from "react";
import type { Note } from "./types/Note";
import { getAll, getById } from "./services/notes";
const baseUrl = "http://localhost:3001/api/notes";


function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
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
              <button onClick={() => handleGetById(note._id)}>Detalls

              </button>
              {selectedNote?._id === note._id && (
                <div>
                  <p>ID: {selectedNote._id}</p>
                  <p>Created at: {selectedNote.date}</p>
                  {note?.important && ( <p><strong>IMPORTANT</strong></p> )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
