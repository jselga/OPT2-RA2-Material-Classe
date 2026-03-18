import { useEffect, useState } from "react";
import { create, getAll, getById, remove, update } from "../services/notes";
import type { NewNote, Note } from "../types/Note";
import type { NoteFormData } from "../schemas/noteSchema";

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
      const [error, setError] = useState<string | null>(null);

    const loadNoteDetails = async (id:string) => {
        const note = await getById(id);
        setSelectedNote(note);

    }
    const addNote = async (note: NoteFormData) => {
        const newNote = await create(note);
        setNotes(prev => [...prev, newNote]);
    };
    const updateNote = async (id: string, note: NewNote) => {
        const updatedNote = await update(id, note);
        setNotes((prevNotes) =>
            prevNotes.map((n) => (n._id === updatedNote._id ? updatedNote : n)),
        );
        setEditingNote(null);
    }
    const deleteNote = async (id: string) => {
        await remove(id);
        setNotes(notes.filter((n) => n._id !== id));
    };
    useEffect(() => {
        const loadNotes = async () => {
            try {
            const data = await getAll();
            setNotes(data);
            setError(null)    
            } catch (err) {
                setError("Error carregant notes: "+err)
            }
            
        };
        loadNotes();
    }, []);

    return {
        notes,
        editingNote,
        selectedNote,
        setEditingNote,
        loadNoteDetails,
        addNote,
        updateNote,
        deleteNote,
        error,
    };
};