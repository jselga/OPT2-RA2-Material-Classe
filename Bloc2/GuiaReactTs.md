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

---

## 1️⃣ Formulari controlat

```tsx
const [newContent, setNewContent] = useState('')

<form onSubmit={handleSubmit}>
  <input
    value={newContent}
    onChange={(e) => setNewContent(e.target.value)}
  />
  <button type="submit">Crear</button>
</form>
```

---

## 2️⃣ POST al servei

`services/notes.ts`

```ts
export const create = async (newObject: { content: string; important: boolean }) => {
  const res = await axios.post('http://localhost:3000/api/notes', newObject)
  return res.data
}
```

---

## 3️⃣ Actualitzar estat local

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  const noteToCreate = {
    content: newContent,
    important: false
  }

  create(noteToCreate)
    .then(createdNote => {
      setNotes(notes.concat(createdNote))
      setNewContent('')
    })
}
```

---

## ✍️ Exercici

- Impedir enviar formulari buit
- Mostrar missatge si hi ha error

---

