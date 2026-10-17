// components/NoteItem/NoteItem.tsx

import Link from 'next/link';
import { Note } from '@/lib/api';
import css from './NoteItem.module.css'; // Переконайтеся, що підключили ваші стилі

type Props = {
  item: Note;
  onDelete?: (id: string) => void; // Пропс для видалення з вашої минулої ДЗ
};

const NoteItem = ({ item, onDelete }: Props) => {
  return (
    <li className={css.item}>
      {/* 1. Повертаємо назву та вміст нотатки як звичайний текст */}
      <h3 className={css.title}>{item.title}</h3>
      <p className={css.content}>{item.content}</p>

      <div className={css.actions}>
        {/* 👑 2. Додаємо окреме посилання View details перед кнопкою Delete */}
        <Link href={`/notes/${item.id}`} className={css.viewLink}>
          View details
        </Link>

        {/* 3. Повертаємо кнопку видалення з минулої ДЗ */}
        <button onClick={() => onDelete?.(item.id)} className={css.deleteBtn}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default NoteItem;
