import type { NoteFormData } from "../schemas/noteSchema";

export type Note = {
  _id: string;
  content: string;
  date: string;
  important: boolean;
};
export type NewNote = {
  content: string;
  important: boolean;
};
export type NoteFormProps = {
   editingNote: Note | null;
  onSubmit: (data:NoteFormData)=>void;
}