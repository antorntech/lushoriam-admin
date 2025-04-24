import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={
          currentPage === 1
            ? "bg-gray-400 px-1.5 py-1 text-gray-500 rounded"
            : "bg-primary px-1.5 py-1 rounded text-white"
        }
      >
        <FontAwesomeIcon icon={faChevronLeft} className="size-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            fontWeight: page === currentPage ? "bold" : "normal",
          }}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={
          currentPage === totalPages
            ? "bg-gray-400 px-1.5 py-1 text-gray-500 rounded"
            : "bg-primary px-1.5 py-1 rounded text-white"
        }
      >
        <FontAwesomeIcon icon={faChevronRight} className="size-4" />
      </button>
    </div>
  );
};

export default Pagination;
