import UserProperties from "../components/UserProperties";
import ErrorBadge from "../components/ErrorBadge";
import ApiWrapper from "../components/wrappers/ApiWrapper";
import { useGetMyPropertiesQuery } from "../slices/propertiesApiSlice";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const ProfileScreen = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const page = searchParams.get("page");

  const { data, isLoading, error, refetch } = useGetMyPropertiesQuery(
    page || 1
  );

  const { data: userProperties } = data || {};

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <ApiWrapper isLoading={isLoading} error={error}>
      {userProperties && userInfo && (
        <section className="bg-blue-50">
          <div className="container m-auto py-24">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
              <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
                Your Profile
              </h1>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mx-20 mt-10 mb-10">
                  <h2 className="text-2xl mb-4">
                    <span className="font-bold block">Username: </span>
                    {userInfo.username}
                  </h2>
                  <h2 className="text-2xl">
                    <span className="font-bold block">Email: </span>{" "}
                    {userInfo.email}
                  </h2>
                </div>

                <div className="md:w-3/4 md:pl-4">
                  <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
                    Your Listings
                  </h2>

                  {userProperties.content.length === 0 ? (
                    <ErrorBadge error={"No Properties Found"} />
                  ) : (
                    <>
                      {userProperties.content.map((property) => (
                        <UserProperties
                          key={property._id}
                          property={property}
                          refetch={refetch}
                        />
                      ))}
                    </>
                  )}

                  <Pagination
                    pathname={pathname}
                    totalPages={userProperties.totalPages}
                    page={userProperties.pageable.pageNumber}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </ApiWrapper>
  );
};

export default ProfileScreen;
