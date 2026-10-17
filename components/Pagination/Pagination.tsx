// components/Pagination/Pagination.tsx
'use client'; // 👑 1. Обов'язково додаємо директиву клієнтського компонента

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination = ({ pageCount, forcePage, onPageChange }: PaginationProps) => {
  // 👑 2. Якщо сторінок 1 або менше, пагінацію краще взагалі не рендерити
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      previousLabel="&larr;"
      nextLabel="&rarr;"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName={css.pagination}
      activeClassName={css.active}
      forcePage={forcePage}
    />
  );
};

export default Pagination;
