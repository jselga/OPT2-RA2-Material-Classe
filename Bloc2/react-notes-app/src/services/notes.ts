import axios from "axios";
import type { Note } from "../types/Note";

export const getAll = async (url:string) => {
  const res = await axios.get<Note[]>(url);
  return res.data;
};

export const getById= async (url:string,id:string)=>{
console.log(`${url}/${id}`);
const res = await axios.get<Note>(`${url}/${id}`);
return res.data;
}
