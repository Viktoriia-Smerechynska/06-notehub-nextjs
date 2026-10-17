// app/notes/[id]/NoteDetails.client.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css'; // Імпорт модульних стилів

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, // 👑 Запобігаємо повторному запиту після гідратації за ТЗ
    enabled: !!id,
  });

  // 1. Опрацювання стану завантаження строго за ТЗ
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  // 2. Опрацювання помилки або випадку, коли нотатку не знайдено (строго за ТЗ)
  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            {/* 👑 Виводимо динамічний заголовок нотатки */}
            <h2>{note.title}</h2>
          </div>
          {/* Виводимо тег/категорію (використовуємо fall-back, якщо поле на бекенді відсутнє) */}
          <p className={css.tag}>{(note as any).tag || 'General'}</p>
          {/* 👑 Виводимо динамічний контент нотатки */}
          <p className={css.content}>{note.content}</p>
          {/* 👑 Виводимо дату створення у красивому форматі */}
          <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </main>
  );
}
