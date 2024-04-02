import { ThemeContext } from "ThemeContext";
import React, { useContext } from "react";

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
  const { theme }: any = useContext(ThemeContext); 

  return (
    <div className="flex justify-center my-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`mx-1 ${
            number === currentPage
              ? theme=== "dark" ? "bg-blue-500 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-700 text-white"
              : theme=== "dark" ? "bg-gray-600 hover:bg-gray-400" : "bg-gray-300 hover:bg-gray-400 text-black"
          }  font-bold py-2 px-4 rounded`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
