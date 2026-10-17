// app/notes/page.tsx
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import NotesClient from './Notes.client'; // 👑 1. ВИПРАВЛЕНО ІМПОРТ: тепер веде на список нотаток, а не в [id]

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Попередньо завантажуємо дані на сервері (Prefetch)
  await queryClient.prefetchQuery({
    // 👑 2. Синхронізуємо ключ і функцію з початковим станом клієнта (сторінка 1, пошук порожній)
    queryKey: ['notes', 1, ''],
    queryFn: () => getNotes(1, ''),
  });

  return (
    // Гідратуємо кеш, щоб NotesClient отримав дані без повторного запиту в браузері
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient /> {/* 👑 Тепер тут рендериться правильний компонент з пошуком і пагінацією */}
    </HydrationBoundary>
  );
}
