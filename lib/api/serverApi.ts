import type { Note, NoteTag } from "@/types/note";
import { API } from "./api";
import { type User } from "@/types/user";
import { cookies } from "next/headers";
import { AxiosResponse } from "axios";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export type CheckSessionRequest = {
  success: boolean;
};

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag?: NoteTag,
  sortBy?: string,
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const { data } = await API.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage, tag, sortBy },
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await API.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await API.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
export async function checkSession(): Promise<
  AxiosResponse<CheckSessionRequest>
> {
  const cookieStore = await cookies();
  const response = await API.get<CheckSessionRequest>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
}
