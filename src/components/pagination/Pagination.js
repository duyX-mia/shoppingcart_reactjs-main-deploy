import React from "react";

import styles from "./Pagination.module.css";

import RBPagination from "react-bootstrap/Pagination";

const Pagination = ({ meta, setParams }) => {
  const renderPaginationItem = () => {
    const paginationItems = [];

    for (let i = 1; i <= meta.totalPage; i++) {
      paginationItems.push(
        <RBPagination.Item
          active={i === meta.page}
          key={`pagination-item-${i}`}
          onClick={() => onGoToPage(i)}
        >
          {i}
        </RBPagination.Item>
      );
    }

    return paginationItems;
  };

  const onPrev = () => {
    const nextPage = meta.page - 1;
    if (nextPage > 0) {
      setParams((prev) => ({ ...prev, page: nextPage }));
    }
  };

  const onNext = () => {
    const nextPage = meta.page + 1;
    if (nextPage <= meta.totalPage) {
      setParams((prev) => ({ ...prev, page: nextPage }));
    }
  };

  const onGoToPage = (page) => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <div className={styles.wrapper}>
      <RBPagination>
        {meta.totalPage > 1 && <RBPagination.Prev onClick={onPrev} />}

        {renderPaginationItem()}

        {meta.totalPage > 1 && <RBPagination.Next onClick={onNext} />}
      </RBPagination>
    </div>
  );
};

export default Pagination;
