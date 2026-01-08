import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 font-pop px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center border border-orange-200">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 text-orange-500 p-4 rounded-full">
            <FaLock size={32} />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-8">
          You are not authorized to view this page.  
          Please sign in with the correct account or return to home.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <button className="px-5 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
              Go to Home
            </button>
          </Link>

          <Link to="/register">
            <button className="px-5 py-2 rounded-lg border border-orange-500 text-orange-500 font-semibold hover:bg-orange-50 transition">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
