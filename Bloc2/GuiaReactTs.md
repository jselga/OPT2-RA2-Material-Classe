# Bloc 2 – React + TypeScript

Aquest document és la guia de treball per a les sessions 3, 4 i 5. L'objectiu és construir progressivament el frontend que consumeix l'API creada al Bloc 1.

---

# Sessió 3 – Llegir dades de l'API

## 🎯 Objectius

- Crear projecte React amb TypeScript
- Connectar amb l’API
- Mostrar la llista d’items
- Implementar un GET per id (treball autònom)

---

## 1️⃣ Setup inicial

Crear projecte amb Vite:

```bash
npm create vite@latest react-notes-app
cd react-notes-app
npm install
npm run dev
```

Seleccionar:

- React
- TypeScript

---
### Fixar la versió de Node
Per a garantir la compatibilitat futura del nostres projecte és important que el nostre projecte tingui informació de la versió de node utilitzada. Normalmlent s'indica a la documentació però per ser més explicit utilitzarem el fitxer `.nvmrc`  

Es crea el fitxer a l'arrel del projecte i s'especifica la versió actual amb la que esteu fent el projecte. Es pot saber fent node -v
```bash
v24.13.1
```
Un cop definit qui faci servir el projecte només haurà de posar a la consola
```bash
nvm use
```
Procureu fer servir una versió LTS
[Node.js Releases](https://nodejs.org/en/about/previous-releases)
## 2️⃣ Definir el tipus

`src/types/note.ts`

```ts
export type Note = {
  _id: string
  content: string
  date: string
  important: boolean
}
```

---

## 3️⃣ GET – Llistar totes les notes

A `App.tsx`:

```tsx
const [notes, setNotes] = useState<Note[]>([])

useEffect(() => {
  fetch('http://localhost:3000/api/notes')
    .then(res => res.json())
    .then(data => setNotes(data))
}, [])
```

Mostrar la llista:

```tsx
{notes.map(note => (
  <div key={note._id}>
    <p>{note.content}</p>
  </div>
))}
```

---

## ✍️ Exercici – GET per ID

Implementa una funció que permeti obtenir un element concret per id.

Pistes:

- Crea una funció `getById(id: string)` al servei
- Crea un input per introduir un id
- Mostra la nota trobada

Objectiu: entendre la diferència entre:

- GET col·lecció
- GET recurs individual

---

# Sessió 4 – Crear dades (POST)

## 🎯 Objectius

- Recuperar formularis controlats
- Crear una nova nota
- Actualitzar la llista sense recarregar
- Entendre el pas de props entre components
- Tipar correctament les props amb TypeScript

---

## 1️⃣ Separar el formulari en un component (Props + TypeScript)

Crearem un component `NoteForm.tsx`.

### Tipar les props

```tsx
export type NewNote = {
  content: string;
  important: boolean;
};
export type NoteFormProps = {
  newContent: NewNote
  onContentChange: (value: string) => void
  onImportantChange: (value: boolean) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
```
### Component

```tsx
export const NoteForm = ({
  newContent,
  onContentChange,
  onImportantChange,
  onSubmit,
}: NoteFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={newContent.content}
        onChange={(e) => onContentChange(e.currentTarget.value)}
      />
      <input
        type="checkbox"
        checked={newContent.important}
        onChange={(e) => onImportantChange(e.currentTarget.checked)}
      />
      <button type="submit">Crear</button>
    </form>
  );
};
```

---
## 2️⃣ Utilitzar el component des d’App.tsx

A `App.tsx` mantenim l’estat:

```tsx
  const [newContent, setNewContent] = useState<NewNote>({
    content: "",
    important: false,
  });
```
Creem els handlers:
```tsx
  const handleContentChange = (value: string) => {
    setNewContent((prev) => ({ ...prev, content: value }));
  };
  const handleImportantChange = (value: boolean) => {
    setNewContent((prev) => ({ ...prev, important: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Creant nota:", newContent);
  };
```

I utilitzem el component:

```tsx
<NoteForm
  newContent={newContent}
  onContentChange={handleContentChange}
  onImportantChange={handleImportantChange}
  onSubmit={handleSubmit}
/>
```
👉 Observa que passem funcions com a props.  
👉 TypeScript valida que la signatura sigui correcta.

---

## 3️⃣ Recordatori: què són les props?

- Les props permeten comunicar components.
- El component pare controla l’estat.
- El component fill només rep dades i funcions.

Aquest patró s’anomena:
👉 "Lifting state up"

---
## 4️⃣ POST al servei

`services/notes.ts`

```ts
export const create = async (url:string,newObject: { content: string; important: boolean }) => {
  const res = await axios.post(url, newObject)
  return res.data
}
```
---
## 5️⃣ Actualitzar estat local
```tsx
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const noteToCreate = {
      content: newContent.content,
      important: newContent.important,
    };

    create(baseUrl, noteToCreate).then((createdNote) => {
      setNotes(notes.concat(createdNote));
    });
  };

```
## ✍️ Exercici

- Impedir enviar formulari buit
- Mostrar missatge si hi ha error

---
# Sessió 5 – Editar dades (PUT) i reutilització del formulari

## 🎯 Objectius

- Reutilitzar el mateix formulari per editar
- Implementar PUT
- Entendre estat condicional (mode edició)
- Mantenir el mateix ordre de treball que a la Sessió 4

Treballarem en aquest ordre:

1️⃣ Estat\
2️⃣ Component\
3️⃣ Servei\
4️⃣ Modificació Handlers


---

## 1️⃣ Estat

Afegim estat per controlar si estem editant una nota:

```tsx
const [editingNote, setEditingNote] = useState<Note | null>(null)
```

Quan vulguem editar una nota, carregarem el seu contingut al formulari:

```tsx
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setNewContent({ content: note.content, important: note.important });
  };
```
---
## 2️⃣ Component (llista amb botó Editar)

A la llista de notes afegim un botó:

```tsx
<button onClick={() => handleEdit(note)}>
  Editar
</button>
```

Ara el mateix formulari servirà tant per crear com per editar.

---
## 3️⃣ Servei (PUT)

Al fitxer `services/notes.ts` afegim:

```ts
export const update = async (url:string,id: string,updatedNote: NewNote):Promise<Note> => {
  const res = await axios.put(`${url}/${id}`, updatedNote)
  return res.data
}
```

---
