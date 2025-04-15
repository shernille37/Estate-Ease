import { useParams } from "react-router-dom";
import EditPropertyForm from "../components/EditPropertyForm";
import { useGetPropertyQuery } from "../slices/propertiesApiSlice";
import ApiWrapper from "../components/wrappers/ApiWrapper";

const PropertyEditScreen = () => {
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useGetPropertyQuery(id);

  const { data: property } = data || {};

  return (
    <>
      <ApiWrapper isLoading={isLoading} error={error}>
        {property && (
          <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
              <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <EditPropertyForm property={property} refetch={refetch} />
              </div>
            </div>
          </section>
        )}
      </ApiWrapper>
    </>
  );
};

export default PropertyEditScreen;
