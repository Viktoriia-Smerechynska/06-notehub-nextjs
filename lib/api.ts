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

const headers: Record<string, string> = {};

if (KEY) {
  const cleanKey = KEY.replace(/['"]/g, '').trim();
  headers['Authorization'] = `Bearer ${cleanKey}`;
}

export const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers,
});

export const getNotes = async (page: number = 1, searchQuery: string = '') => {
  const params: Record<string, any> = {
    page: Number(page),
    perPage: 12,
  };

  if (searchQuery && searchQuery.trim() !== '') {
    params.search = searchQuery.trim();
  }

  const res = await api.get<NoteListResponse>('/notes', { params });
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = getSingleNote;
