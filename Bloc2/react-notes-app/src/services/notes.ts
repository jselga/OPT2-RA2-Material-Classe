import axios from "axios";
import type { Note } from "../types/Note";

export const getAll = (url:string) => {
  return axios.get<Note[]>(url).then((res) => res.data);

};