import type { Note, NoteTag,NewNoteData } from "@/types/note";


import axios from "axios";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const API = axios.create({ baseURL: "https://notehub-public.goit.study/api" });

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag?: NoteTag,
  sortBy?: string,
): Promise<FetchNotesResponse> {
  const { data } = await API.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage, tag, sortBy},
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const { data } = await API.get<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function createNote(newNote: NewNoteData): Promise<Note> {
  const { data } = await API.post<Note>("/notes", newNote, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
export async function deleteNote(noteId: Note["id"]): Promise<Note> {
  const { data } = await API.delete<Note>(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
