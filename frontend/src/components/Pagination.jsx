import React from "react";
import { Link } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const Pagination = ({ pathname, page, totalPages }) => {
  return (
    totalPages > 1 && (
      <>
        <div className="w-full flex justify-center mb-2">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <Link
                to={`${pathname}?page=${page > 1 ? page - 1 : 1}`}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <GrFormPreviousLink />
              </Link>
            </li>
            {[...Array(totalPages).keys()].map((p) => (
              <li key={p + 1}>
                <Link
                  to={`${pathname}?page=${p + 1}`}
                  className={`${
                    page === p
                      ? "z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  } flex items-center justify-center px-3 h-8 leading-tight`}
                >
                  {p + 1}
                </Link>
              </li>
            ))}

            <li>
              <Link
                to={`${pathname}?page=${
                  page < totalPages - 1 ? page + 2 : totalPages
                }`}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                <GrFormNextLink />
              </Link>
            </li>
          </ul>
        </div>
      </>
    )
  );
};

export default Pagination;
