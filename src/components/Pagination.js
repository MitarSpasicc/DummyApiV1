import React from "react";
import "../styles/pagination.css";

function Pagination({
  totalPages,
  postsPerPage,
  setPage,
  currentPage,
  goToPreviousPage,
  goToNextPage,
  goToEnd,
  goToStart,
}) {
  const buttonsPerPage = 5;
  const numberOfPages = Math.ceil(totalPages / postsPerPage);

  const pageButtons = (total, max, current) => {
    const half = Math.round(max / 2);
    let to = max;

    if (current + half >= total) {
      to = total;
    } else if (current > half) {
      to = current + half;
    }
    let from = to - max;

    return Array.from({ length: max }, (_, i) => i + from);
  };

  return (
    <div className="pagination-container">
      <button className="pgn-btn btn-start" onClick={() => goToStart()}>
        <i className="lni lni-angle-double-left"></i>
      </button>
      <button
        className="pgn-btn btn-left"
        onClick={() => goToPreviousPage()}
        disabled={currentPage === 0 ? true : false}
      >
        <i className="lni lni-chevron-left"></i>
      </button>

      {pageButtons(numberOfPages, buttonsPerPage, currentPage).map((number) => {
        return (
          <div
            onClick={() => setPage(number)}
            key={number}
            className={
              currentPage === number ? "pag-number active" : "pag-number"
            }
          >
            {number + 1}
          </div>
        );
      })}
      <button
        className="pgn-btn btn-right"
        onClick={() => goToNextPage()}
        disabled={currentPage === numberOfPages - 1 ? true : false}
      >
        <i className="lni lni-chevron-right"></i>
      </button>
      <button
        className="pgn-btn btn-end"
        onClick={() => goToEnd(numberOfPages - 1)}
      >
        <i className="lni lni-angle-double-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
