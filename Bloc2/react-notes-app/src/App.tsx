import { useEffect, useState } from "react";
import type { Note } from "./types/Note";
import { getAll, getById } from "./services/notes";
const baseUrl = "http://localhost:3001/api/notes";
const hardcodedId = "69961ea7f15b737c27dcb2a7";
function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleGetById = (id: string) => {
    setError(null);
    setNote(null);
    getById(baseUrl, id)
      .then(setNote)
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
        {note && (
          <p style={note?.important?{fontWeight:'800'}:{fontWeight:'200'}}>
            <strong>Id:</strong> {note?._id} - <strong>Content: </strong>{" "}
            {note?.content} <strong>Created at: {note?.date}</strong>
          </p>
        )}
        <ul>
          {notes?.map((note) => (
            <li key={note._id}>
              <p>{note.content}</p>
              <button onClick={() => handleGetById(note._id)}>Detalls</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
