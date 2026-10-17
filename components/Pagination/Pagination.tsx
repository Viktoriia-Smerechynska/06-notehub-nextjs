// src/components/Pagination/Pagination.tsx
'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

type PaginationProps = {
  pageCount: number;
  forcePage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
};

export default function Pagination({ pageCount, forcePage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={onPageChange}
      // Текст для стрілочок
      previousLabel="←"
      nextLabel="→"
      // Прив'язка CSS-класів для стилізації (відповідає дизайну з фото)
      containerClassName={css.paginationContainer}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      activeClassName={css.activePage}
      disabledClassName={css.disabledPage}
      // Налаштування кількості видимих елементів навколо поточної сторінки
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
    />
  );
}
