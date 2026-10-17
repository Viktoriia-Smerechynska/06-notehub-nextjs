// src/lib/api.ts

import axios from 'axios';

const KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export type Note = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteListResponse = {
  notes: Note[];
  total: number;
};

export const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: KEY ? `Bearer ${KEY}` : '',
  },
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getNotes = async (page: number = 1, searchQuery: string = '') => {
  await delay(2000);
  const res = await api.get<NoteListResponse>('/notes', {
    params: {
      page,
      limit: 10,
      search: searchQuery || undefined,
    },
  });
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = getSingleNote;
