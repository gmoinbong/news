import React, { useState } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import '../styles/Pagination.scss'
interface Props {
  itemCount: number;
  itemsPerPage: number;
  onChangePage: (page: number) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number;
  className: string;
}

const Pagination: React.FC<Props> = ({ itemCount, itemsPerPage, onChangePage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(itemCount / itemsPerPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onChangePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPages = () => {
    const pages = [];

    if (currentPage > 1) {
      pages.push(
        <li key="prev" onClick={() => handleClick(currentPage - 1)}>
          <AiOutlineDoubleLeft />
        </li>
      );
    }


    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <li key={i} className={i === currentPage ? 'active' : ''} onClick={() => handleClick(i)}>
          {i}
        </li>
      );
    }

    if (currentPage < pageCount) {
      pages.push(
        <li key="next" onClick={() => handleClick(currentPage + 1)}>
          <AiOutlineDoubleRight />
        </li>
      );
    }


    return pages;
  };



  return <ul className="pagination">{renderPages()}</ul>;
};

export default Pagination;
