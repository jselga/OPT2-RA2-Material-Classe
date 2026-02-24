import { useEffect, useState } from "react";
import type { Note } from "./types/Note";
import { getAll, getById } from "./services/notes";
const baseUrl = "http://localhost:3001/api/notes";
const hardcodedId = "69961ea7f15b737c27dcb2a7";
function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
 
    getAll(baseUrl).then(setNotes).catch(console.error);

    getById(baseUrl, hardcodedId)
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
  }, []);

  return (
    <div>
      <h1>Notes App</h1>
      <div className="card">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {note && (
          <p>
            <strong>Id:</strong> {note?._id} - <strong>Content: </strong>{" "}
            {note?.content}
          </p>
        )}
        <ul>
          {notes?.map((note) => (
            <li key={note._id}>
              <p>{note.content}</p>
              <p>created at: {note.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
