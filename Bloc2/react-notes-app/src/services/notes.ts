import axios from "axios";
import type { NewNote, Note } from "../types/Note";

export const getAll = async (url:string):Promise<Note []>=> {
  const res = await axios.get<Note[]>(url);
  return res.data;
};

export const getById= async (url:string,id:string):Promise<Note>=>{
const res = await axios.get<Note>(`${url}/${id}`);
return res.data;
}

export const create = async (url:string,note:NewNote):Promise<Note> => {
  const res = await axios.post(url, note)
  return res.data
}
