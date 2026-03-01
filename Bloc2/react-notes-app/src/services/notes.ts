import { api } from "./api"
import type { NewNote, Note } from "../types/Note";
//GET
export const getAll = async (): Promise<Note[]> => {
  const res = await api.get<Note[]>("/");
  return res.data;
};
//GET by ID
export const getById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/${id}`);
  return res.data;
}
//POST
export const create = async (note: NewNote): Promise<Note> => {
  const res = await api.post("/", note)
  return res.data
}
//PUT
export const update = async (id: string, updatedNote: NewNote): Promise<Note> => {
  const res = await api.put(`/${id}`, updatedNote)
  return res.data
}
//DELETE
export const remove = async (id: string): Promise<void> => {
  await api.delete(`/${id}`)

}