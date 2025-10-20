import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, total);

  return (
    <div>
      <p data-cy="info">
        Page {currentPage} (items {firstItem} - {lastItem} of {total})
      </p>

      <select
        data-cy="perPageSelector"
        value={perPage}
        onChange={e => onPerPageChange(Number(e.target.value))}
      >
        {[3, 5, 10, 20].map(n => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <ul className="pagination">
        {/* Prev button */}
        <li
          className={currentPage === 1 ? 'disabled' : ''}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <a
            href="#"
            data-cy="prevLink"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>

        {/* Page links */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <li
            key={page}
            className={page === currentPage ? 'active' : ''}
            onClick={() => handlePageChange(page)}
          >
            <a href="#" data-cy="pageLink">
              {page}
            </a>
          </li>
        ))}

        {/* Next button */}
        <li
          className={currentPage === totalPages ? 'disabled' : ''}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <a
            href="#"
            data-cy="nextLink"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
