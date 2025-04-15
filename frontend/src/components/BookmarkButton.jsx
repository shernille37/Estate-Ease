import { FaBookmark } from "react-icons/fa";

import {
  useBookmarkPropertyMutation,
  useGetBookmarkStatusQuery,
} from "../slices/propertiesApiSlice";
import { toast } from "react-toastify";
import ApiWrapper from "./wrappers/ApiWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookmarkButton = ({ property }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [bookmarkProperty, { isLoading }] = useBookmarkPropertyMutation();

  const { data, isLoading: isLoadingBookmarkStatus } =
    useGetBookmarkStatusQuery(property._id);

  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState();

  useEffect(() => {
    if (!userInfo) {
      setIsBookmarked(false);
      return;
    }

    setIsBookmarked(data ? data.data : false);
  }, [userInfo, data]);

  const handleClick = async () => {
    try {
      if (!userInfo) {
        toast.error("You need to log in to bookmark a property");
        navigate("/login");
        return;
      }
      const res = await bookmarkProperty({ id: property._id }).unwrap();

      toast.success(res.message);

      setIsBookmarked((prev) => !prev);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <ApiWrapper isLoading={isLoadingBookmarkStatus}>
      {isBookmarked ? (
        <button
          onClick={handleClick}
          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaBookmark className="mr-2" />
          {isLoading ? "Removing Bookmark" : "Remove Bookmark"}
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaBookmark className="mr-2" />
          {isLoading ? "Bookmarking" : "Bookmark Property"}
        </button>
      )}
    </ApiWrapper>
  );
};

export default BookmarkButton;
