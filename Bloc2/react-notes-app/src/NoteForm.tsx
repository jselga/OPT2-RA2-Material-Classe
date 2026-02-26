import type { NoteFormProps } from "./types/Note";

export const NoteForm = ({
  newContent,
  editingNote,
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
      <button type="submit">{editingNote ? "Actualitzar" : "Crear"}</button>
    </form>
  );
};
