import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaHandHoldingHeart, FaHandsHelping, FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  const { token, userData } = useContext(UserContext);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-orange-200/80 border-b border-orange-400 font-pop px-2">
      <div className="flex items-center justify-between px-5 md:px-12 py-4 max-w-[1400px] mx-auto">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Right Section */}
        <ul className="flex items-center gap-6 text-[#333333] font-semibold text-sm">

          {/* Donor */}
          {token && userData.role === "donor" && (
            <li>
              <Link
                to="/donor/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 transition"
              >
                <FaHandHoldingHeart size={22} className="text-orange-500" />
                <span className="hidden sm:inline">Donor</span>
              </Link>
            </li>
          )}

          {/* NGO */}
          {token && userData.role === "ngo" && (
            <li>
              <Link
                to="/ngo/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 transition"
              >
                <FaHandsHelping  size={22} className="text-orange-500" />
                <span className="hidden sm:inline">NGO</span>
              </Link>
            </li>
          )}

          {/* Sign In */}
          {!token && Object.keys(userData).length === 0 && (
            <li>
              <Link to="/register">
                <button className="flex items-center gap-2 border border-orange-400 bg-orange-400 hover:bg-orange-500 hover:border-orange-500 text-white rounded-full px-4 py-2 transition shadow-sm">
                  <FaSignInAlt />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              </Link>
            </li>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
