
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
  newContent: NewNote
  onContentChange: (value: string) => void
  onImportantChange: (value: boolean) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}