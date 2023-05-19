import React from "react";

export default function Pagination(props) {
  const pageNumbers = [...Array(props.pages + 1).keys()].slice(1);

  const nextPage = () => {
    if (props.currentPage !== props.pages)
      props.setCurrentPage(props.currentPage + 1);
  };
  const prevPage = () => {
    if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1);
  };
  return (
    <div className="pagination">
      <button className="button-pagination" onClick={prevPage}>
        Previous
      </button>

      {pageNumbers.map((pgNumber) => (
        <button
          onClick={() => props.setCurrentPage(pgNumber)}
          className="button-pagination"
          key={pgNumber}
        >
          {pgNumber}
        </button>
      ))}

      <button className="button-pagination" onClick={nextPage}>
        Next
      </button>
    </div>
  );
}
