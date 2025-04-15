import PropertyHeaderImage from "../components/PropertyHeaderImage";
import PropertyDetails from "../components/PropertyDetails";

import BookmarkButton from "../components/BookmarkButton";
import ShareButtons from "../components/ShareButtons";
import PropertyContactForm from "../components/PropertyContactForm";
import PropertyImages from "../components/PropertyImages";

import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetPropertyQuery } from "../slices/propertiesApiSlice";
import ApiWrapper from "../components/wrappers/ApiWrapper";
import { useEffect } from "react";

const PropertyScreen = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetPropertyQuery(id);

  const { data: property } = data || {};

  return (
    <>
      <ApiWrapper isLoading={isLoading} error={error}>
        {property && (
          <>
            <PropertyHeaderImage image={property.images[0]} />

            <section>
              <div className="container m-auto py-6 px-6">
                <Link
                  to="/properties"
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <FaArrowLeft className="fas fa-arrow-left mr-2" />
                  Back to Properties
                </Link>
              </div>
            </section>

            <section className="bg-blue-50">
              <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                  <PropertyDetails property={property} />
                  <aside className="space-y-4">
                    <BookmarkButton property={property} />
                    <ShareButtons property={property} />
                    <PropertyContactForm property={property} />
                  </aside>
                </div>
              </div>
            </section>

            <PropertyImages images={property.images} />
          </>
        )}
      </ApiWrapper>
    </>
  );
};

export default PropertyScreen;
