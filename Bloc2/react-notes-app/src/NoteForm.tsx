import { useForm } from "react-hook-form";
import { noteSchema, type NoteFormData } from "./schemas/noteSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const NoteForm = ({
  onSubmit,
}: {
  onSubmit: (data: NoteFormData) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: "",
      important: false,
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("content")} />
{errors.content && <p>{errors.content.message}</p>}
      <input type="checkbox" {...register("important")} />
      {/* <button type="submit">{editingNote ? "Actualitzar" : "Crear"}</button> */}
      <button type="submit">Crear</button>
    </form>
  );
};
