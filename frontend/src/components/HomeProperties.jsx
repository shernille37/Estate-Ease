import React from "react";
import Spinner from "./Spinner";
import ErrorBadge from "./ErrorBadge";
import PropertyCard from "./PropertyCard";
import ApiWrapper from "../components/wrappers/ApiWrapper";
import { Link } from "react-router-dom";
import { useGetRecentPropertiesQuery } from "../slices/propertiesApiSlice";

const HomeProperties = () => {
  const { data, isLoading, error } = useGetRecentPropertiesQuery();

  const { data: properties } = data || {};

  return (
    <>
      <ApiWrapper isLoading={isLoading} error={error}>
        {properties && (
          <>
            <section className="px-4 py-6">
              <div className="container-xl lg:container m-auto px-4 py-6">
                <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                  Recent Properties
                </h2>
                {properties.length === 0 ? (
                  <ErrorBadge error={"No Properties Found"} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map((property) => (
                      <PropertyCard key={property._id} property={property} />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="m-auto max-w-lg my-6 px-6">
              <Link
                to="/properties"
                className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
              >
                View All Properties
              </Link>
            </section>
          </>
        )}
      </ApiWrapper>
    </>
  );
};

export default HomeProperties;
