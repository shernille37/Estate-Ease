import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDeletePropertyMutation } from "../slices/propertiesApiSlice";
import { useGetMessagesCountQuery } from "../slices/messageApiSlice";

const UserProperties = ({ property, refetch }) => {
  const [deleteProperty, { isLoading: isLoadingDelete }] =
    useDeletePropertyMutation();

  const { refetch: refetchMessageCount } = useGetMessagesCountQuery();

  const handleDelete = async (propertyId) => {
    const confirmed = window.confirm("Are you sure?");

    if (!confirmed) return;

    try {
      await deleteProperty(propertyId).unwrap();
      refetch();
      refetchMessageCount();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      return;
    }

    toast.success("Property Deleted Successfully");
  };

  return (
    <div className="mb-10">
      <Link to={`/properties/${property._id}`}>
        <img
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt={property.name}
          height={500}
          width={500}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street}, {property.location.city}{" "}
          {property.location.state} {property.location.zipcode}
        </p>
      </div>
      <div className="mt-2">
        <Link
          to={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="cursor-pointer bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDelete(property._id)}
        >
          {isLoadingDelete ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default UserProperties;
