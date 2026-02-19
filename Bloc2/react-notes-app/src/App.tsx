import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";
// Definim el tipus Note ha de coincidir amb el que ens retorna l'API
/*{
    "_id": "6996ff0293fba81414283404",
    "content": "Una nota",
    "date": "2026-02-19T12:16:02.224Z", //date es retorna com a string
    "important": true,
}*/
type Note = {
  _id: string;
  content: string;
  date: string;
  important: boolean;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
      axios.get<Note[]>(`${baseUrl}`)
      .then( (res)=>setNotes(res.data))  
  }, []);

  return (
    <div>
      <h1>Notes App</h1>
      <div className="card">
        <ul>
      {notes?.map((note)=>(
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
