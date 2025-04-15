import { useLocation, useSearchParams } from "react-router-dom";
import ErrorBadge from "../components/ErrorBadge";
import Pagination from "../components/Pagination";
import PropertyCard from "../components/PropertyCard";
import ApiWrapper from "../components/wrappers/ApiWrapper";
import { useGetPropertiesQuery } from "../slices/propertiesApiSlice";

const PropertiesScreen = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const page = searchParams.get("page");

  const { data, isLoading, error } = useGetPropertiesQuery(page || 1);

  const { data: properties } = data || {};

  return (
    <>
      <ApiWrapper isLoading={isLoading} error={error}>
        {properties && (
          <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
              {properties.content.length === 0 ? (
                <ErrorBadge error={"No Properties Found"} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {properties.content.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </ApiWrapper>
      {properties && (
        <Pagination
          pathname={pathname}
          page={properties.pageable.pageNumber}
          totalPages={properties.totalPages}
        />
      )}
    </>
  );
};

export default PropertiesScreen;
