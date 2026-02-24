import { useEffect, useState } from "react";
import type { Note } from "./types/Note";
import { getAll, getById } from "./services/notes";
const baseUrl = "http://localhost:3001/api/notes";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note,setNote] =useState<Note>();
  
  useEffect(() => {
    try {
      // getAll(baseUrl).then((notes)=>setNotes(notes));  
      getAll(baseUrl).then(setNotes); 
      getById(baseUrl,'69961ea7f15b737c27dcb2a8').then(setNote);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <h1>Notes App</h1>
      <div className="card">
        <p><strong>Id:</strong> {note?._id} - <strong>Content: </strong> {note?.content}</p>
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
