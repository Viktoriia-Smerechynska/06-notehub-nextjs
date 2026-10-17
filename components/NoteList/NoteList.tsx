// components/NoteList/NoteList.tsx

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, Note } from '@/lib/api';
import Link from 'next/link';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

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
            {}
            <span className={css.tag}>{(note as any).tag || 'General'}</span>

            <div
              className={css.actions}
              style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
            >
              {}
              <Link href={`/notes/${note.id}`} className={css.viewLink || css.button}>
                View details
              </Link>

              <button
                className={css.button}
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
