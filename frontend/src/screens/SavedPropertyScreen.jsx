import React from "react";

import { useGetSavedPropertiesQuery } from "../slices/propertiesApiSlice";
import PropertyCard from "../components/PropertyCard";
import ApiWrapper from "../components/wrappers/ApiWrapper";
import ErrorBadge from "../components/ErrorBadge";

const SavedPropertiesScreen = () => {
  const { data, isLoading, error, refetch } = useGetSavedPropertiesQuery();

  const { data: properties } = data || {};

  return (
    <ApiWrapper isLoading={isLoading} error={error}>
      {properties && (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Saved Properties</h1>
            {properties.length === 0 ? (
              <ErrorBadge error={"No Saved Properties"} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    savedProperty={true}
                    refetch={refetch}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </ApiWrapper>
  );
};

export default SavedPropertiesScreen;
