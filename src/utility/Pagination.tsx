import React, { useState } from 'react';

interface Props {
  itemCount: number;
  itemsPerPage: number;
  onChangePage: (page: number) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number;
}

const Pagination: React.FC<Props> = ({ itemCount, itemsPerPage, onChangePage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(itemCount / itemsPerPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onChangePage(page);
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <li key={i} onClick={() => handleClick(i)}>
          {i}
        </li>
      );
    }
    return pages;
  };

  return <ul>{renderPages()}</ul>;
};

export default Pagination;
