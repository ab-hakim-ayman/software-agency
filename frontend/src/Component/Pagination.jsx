import React, { useState, useEffect } from 'react';

function Pagination({ itemsPerPage, totalItems, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='text-center'>
      {/* Pagination controls */}
      <button className='p-3' onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button className='p-3' onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
}

export default Pagination;
