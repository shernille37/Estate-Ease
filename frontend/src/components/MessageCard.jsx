import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  useMarkReadMutation,
  useDeleteMessageMutation,
} from "../slices/messageApiSlice";

import { incrementCount, decrementCount } from "../slices/messageSlice";

const MessageCard = ({ data, refetch }) => {
  const [isRead, setIsRead] = useState(data.read);

  const [markRead, { isLoading }] = useMarkReadMutation();
  const [deleteMessage, { isLoading: isLoadingDelete }] =
    useDeleteMessageMutation();

  const dispatch = useDispatch();

  const handleRead = async () => {
    try {
      const {
        data: { read },
      } = await markRead(data._id).unwrap();

      setIsRead(read);
      if (isRead) dispatch(incrementCount());
      else dispatch(decrementCount());

      toast.success(`Marked as ${read ? "read" : "new"}`);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure?"))
      try {
        await deleteMessage(data._id).unwrap();

        if (!isRead) dispatch(decrementCount());

        refetch();
        toast.success("Message deleted");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {data.propertyName}
      </h2>
      <p className="text-gray-700">{data.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {data.senderUsername}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href="mailto:recipient@example.com" className="text-blue-500">
            {data.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href="tel:123-456-7890" className="text-blue-500">
            {data.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>{" "}
          {new Date(data.createdAt).toLocaleString("en-US")}
        </li>
      </ul>
      <button
        onClick={handleRead}
        className="cursor-pointer mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isLoading ? "..." : isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDelete}
        className="cursor-pointer mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        {isLoadingDelete ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default MessageCard;
