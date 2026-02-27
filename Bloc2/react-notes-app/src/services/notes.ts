import axios from "axios";
import type { NewNote, Note } from "../types/Note";
//GET
export const getAll = async (url: string): Promise<Note[]> => {
  const res = await axios.get<Note[]>(url);
  return res.data;
};
//GET by ID
export const getById = async (url: string, id: string): Promise<Note> => {
  const res = await axios.get<Note>(`${url}/${id}`);
  return res.data;
}
//POST
export const create = async (url: string, note: NewNote): Promise<Note> => {
  const res = await axios.post(url, note)
  return res.data
}
//PUT
export const update = async (url: string, id: string, updatedNote: NewNote): Promise<Note> => {
  const res = await axios.put(`${url}/${id}`, updatedNote)
  return res.data
}

//DELETE
export const remove = async(url:string,id:string):Promise<void>=>{
   await axios.delete(`${url}/${id}`)

}