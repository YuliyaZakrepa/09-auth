import type { Note, NoteTag,NewNoteData } from "@/types/note";
import {API} from './api';
import {User} from '@/types/user';


export type CheckSessionRequest = {
  success: boolean;
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
interface RegisterRequest{
  email: string;
  password: string
}
interface LoginRequest{
  email: string;
  password: string
}
export type UpdateUserRequest = {
    username: string; 
    avatar?:string
};
export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag?: NoteTag,
  sortBy?: string,
): Promise<FetchNotesResponse> {
  const { data } = await API.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage, tag, sortBy}});
  return data;
}

export async function createNote(newNote: NewNoteData): Promise<Note> {
  const { data } = await API.post<Note>("/notes", newNote);
  return data;
}
export async function deleteNote(noteId: Note["id"]): Promise<Note> {
  const { data } = await API.delete<Note>(`/notes/${noteId}`);
  return data;
}
export async function register ({email, password}: RegisterRequest): Promise<User> {
  const { data } = await API.post<User>("/auth/register", {email, password});
  return data;
}
export async function login ({email, password}: LoginRequest): Promise<User> {
  const { data } = await API.post<User>("/auth/login", {email, password});
  return data;
}
export async function logout (): Promise<void> {
  await API.post<User>("/auth/logout");
}
export async function getMe (): Promise<User> {
  const {data} = await API.get<User>("/users/me");
  return data;
}
export async function checkSession (): Promise<CheckSessionRequest> {
  const {data} = await API.get<CheckSessionRequest>("/auth/session");
  return data;
}
export async function updateMe (payload: UpdateUserRequest): Promise<User> {
  const {data} = await API.patch<User>("/users/me", payload);
  return data;
}
export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const { data } = await API.get<Note>(`/notes/${id}`);
  return data;
}

