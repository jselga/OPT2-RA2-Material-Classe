import { useEffect, useState } from "react";
import type { Note } from "./types/Note";
import { getAll } from "./services/notes";
const baseUrl = "http://localhost:3001/api/notes";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    try {
      // getAll(baseUrl).then((notes)=>setNotes(notes));  
      getAll(baseUrl).then(setNotes); 
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <h1>Notes App</h1>
      <div className="card">
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
