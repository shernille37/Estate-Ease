import React from "react";
import Spinner from "../Spinner";
import ErrorBadge from "../ErrorBadge";

const ApiWrapper = ({ children, isLoading = false, error = null }) => {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorBadge error={error?.data?.message || error.error} />
      ) : (
        children
      )}
    </>
  );
};

export default ApiWrapper;
