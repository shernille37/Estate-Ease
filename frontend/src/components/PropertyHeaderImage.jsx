const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container m-auto">
        <div className="grid grid-cols-1">
          <img
            src={`${image}`}
            alt="Header Image"
            className="object-cover h-[400px] w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
