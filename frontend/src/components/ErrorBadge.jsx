import { FaExclamationTriangle } from "react-icons/fa";

const ErrorBadge = ({ error }) => {
  return (
    <div className="flex items-center justify-center">
      <FaExclamationTriangle className="fas fa-exclamation-triangle text-3xl text-yellow-400 mr-8" />
      <h2 className="text-3xl font-bold text-gray-500 text-center">{error}</h2>
    </div>
  );
};

export default ErrorBadge;
