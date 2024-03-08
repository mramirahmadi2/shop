import React from "react";

interface PaginationProps {
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`mx-1 ${
            number === currentPage
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-300 hover:bg-gray-400"
          } text-white font-bold py-2 px-4 rounded`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
