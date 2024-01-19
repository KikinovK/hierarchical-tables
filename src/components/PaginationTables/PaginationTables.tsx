import { FC } from 'react';
import { Pagination } from 'react-bootstrap';

import styles from './style.module.css';

interface PaginationTablesProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationTables: FC<PaginationTablesProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const getPageItems = () => {
    const items = [];

    const halfWidth = 1;
    const width = halfWidth * 2 + 1;
    const startPage = Math.max(1, currentPage - halfWidth);
    const endPage = Math.min(totalPages, currentPage + halfWidth);

    const isMinWidth = totalPages > width;

    if (1 <= currentPage - width && isMinWidth) {
      items.push(
        <Pagination.Ellipsis
          key="ellipsis-start"
          onClick={() => onPageChange(currentPage - width)}
          title={`Previous ${width} pages`}
        />
      );
    }

    for (
      let page = isMinWidth ? startPage : 1;
      page <= (isMinWidth ? endPage : totalPages);
      page++
    ) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    if (totalPages >= currentPage + width && isMinWidth) {
      items.push(
        <Pagination.Ellipsis
          key="ellipsis-end"
          onClick={() => onPageChange(currentPage + width)}
          title={`Next ${width} pages`}
        />
      );
    }

    return items;
  };
  return (
    <Pagination className={styles.pagination}>
      <Pagination.First
        onClick={() => onPageChange(1)}
        title={`${1}`}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        title={`${currentPage - 1}`}
        disabled={currentPage === 1}
      />

      {getPageItems()}

      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        title={`${currentPage + 1}`}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        title={`${totalPages}`}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationTables;
