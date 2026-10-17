// components/NoteList/NoteList.tsx

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, Note } from '@/lib/api'; // 👑 1. Оновлено імпорт на наш новий інстанс
import Link from 'next/link'; // 👑 2. Додано імпорт Link для переходу на сторінку деталей
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  // 👑 3. Переписали мутацію видалення під наш новий api.ts розробником
  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/notes/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem || css.item}>
          <h2 className={css.title}>{note.title}</h2>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            {/* Виводимо тег (якщо поля tag на бекенді немає, використовуємо fall-back категорію) */}
            <span className={css.tag}>{(note as any).tag || 'General'}</span>

            <div
              className={css.actions}
              style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
            >
              {/* 👑 4. Додаємо обов'язкове посилання View details перед кнопкою Delete за ТЗ */}
              <Link href={`/notes/${note.id}`} className={css.viewLink || css.button}>
                View details
              </Link>

              <button
                className={css.button}
                // 👑 5. Виправлено типізацію: тепер аргумент note.id передається строго як рядок
                onClick={() => deleteNoteMutation.mutate(note.id)}
                disabled={deleteNoteMutation.isPending}
              >
                {deleteNoteMutation.isPending ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
