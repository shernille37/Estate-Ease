import ClipLoader from "react-spinners/ClipLoader";

const overRide = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ msg = "" }) => {
  return (
    <>
      <ClipLoader
        color="#3b82f6"
        cssOverride={overRide}
        size={150}
        aria-label="Loading Spinner"
      />
      <p className="text-center text-2xl font-bold">{msg}</p>
    </>
  );
};

export default Spinner;
