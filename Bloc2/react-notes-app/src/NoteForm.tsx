import { useForm } from "react-hook-form";
import { noteSchema, type NoteFormData } from "./schemas/noteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NoteFormProps } from "./types/Note";
import { useEffect } from "react";

export const NoteForm = ({ editingNote, onSubmit }: NoteFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: "",
      important: false,
    },
  });
  useEffect(() => {
    if (editingNote) {
      reset({
        content: editingNote.content,
        important: editingNote.important,
      });
    }
  }, [editingNote, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("content")} />
      {errors.content && <p>{errors.content.message}</p>}
      <input type="checkbox" {...register("important")} />
      <button type="submit">{editingNote ? "Actualitzar" : "Crear"}</button>
      {/* <button type="submit">Crear</button> */}
    </form>
  );
};
