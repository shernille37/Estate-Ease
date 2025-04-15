import { Link } from "react-router-dom";

const InfoBox = ({
  children,
  title,
  bgColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
}) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{title}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <Link
        to={buttonInfo.link}
        className={`inline-blocktext-white ${buttonInfo.bgColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
