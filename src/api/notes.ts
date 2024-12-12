import { api } from './client';
import { Note } from '../types/note';

export interface CreateNoteData {
  title: string;
  content: string;
  category_id: string;
  tags: string[];
}

export async function getNotes() {
  const { data } = await api.get<Note[]>('api/notes/get-notes');
  return data;
}

export async function getNoteById(id: string) {
  const { data } = await api.get<Note>(`api/notes/get-notes/${id}`);
  return data;
}

export async function createNote(note: CreateNoteData) {
  const { data } = await api.post<Note>('api/notes/create-notes', note);
  return data;
}

export async function updateNote(id: string, note: CreateNoteData) {
  const { data } = await api.put<Note>(`api/notes/update-notes/${id}`, note);
  return data;
}

export async function deleteNote(id: string) {
  await api.delete(`/notes/${id}`);
}