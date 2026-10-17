// app/notes/page.tsx
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import NotesClient from './[id]/NoteDetails.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Попередньо завантажуємо дані на сервері (Prefetch)
  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  return (
    // Гідратуємо кеш, щоб NotesClient отримав дані без повторного запиту в браузері
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
