import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import logo from "../assets/images/logo-white.png";
import { useSelector, useDispatch } from "react-redux";

import { useGetMessagesCountQuery } from "../slices/messageApiSlice";
import { logout } from "../slices/authSlice";
import { initializeCount } from "../slices/messageSlice";

const Navbar = () => {
  const { pathname } = useLocation();

  const { data, refetch } = useGetMessagesCountQuery();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { messageCount } = useSelector((state) => state.message);

  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch(initializeCount(data.data));
    }
    if (userInfo) refetch();
  }, [data, userInfo]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}

            <Link to="/">
              <div className="flex flex-shrink-0 items-center" to="/">
                <img className="h-10 w-auto" src={logo} alt="PropertyPulse" />

                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  Estate Ease
                </span>
              </div>
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <Link
                  to="/"
                  className={`${
                    pathname === "/" ? "bg-black" : ""
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 `}
                  onClick={() => setProfileOpen(false)}
                >
                  Home
                </Link>

                <Link
                  to="/properties"
                  className={`${
                    pathname === "/properties" ? "bg-black" : ""
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 `}
                  onClick={() => setProfileOpen(false)}
                >
                  Properties
                </Link>

                {userInfo && (
                  <Link
                    to="/properties/add"
                    className={`${
                      pathname === "/properties/add" ? "bg-black" : ""
                    } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 `}
                    onClick={() => setProfileOpen(false)}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!userInfo && (
            <Link
              to="/login"
              className={`text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 `}
            >
              Sign In
            </Link>
          )}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {userInfo && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Link to="/messages" className="relative group">
                <button
                  type="button"
                  className="cursor-pointer relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {messageCount}
                </span>
              </Link>

              {/* <!-- Profile dropdown button --> */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="cursor-pointer text-base hover:bg-gray-800 p-1.5 rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-3"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setProfileOpen((prev) => !prev)}
                  >
                    {userInfo.username}
                  </button>
                </div>

                {/* <!-- Profile dropdown --> */}
                {isProfileOpen && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      onClick={() => setProfileOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/bookmarks"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => setProfileOpen(false)}
                    >
                      Saved Properties
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileOpen && (
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className={`${
                pathname === "/" ? "bg-black" : ""
              } text-white block rounded-md px-3 py-2 text-base font-medium text-center`}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className={`${
                pathname === "/properties" ? "bg-black" : ""
              } text-white block rounded-md px-3 py-2 text-base font-medium text-center`}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              Properties
            </Link>
            {userInfo && (
              <Link
                to="/properties/add"
                className={`${
                  pathname === "/properties/add" ? "bg-black" : ""
                } text-white block rounded-md px-3 py-2 text-base font-medium text-center`}
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                Add Property
              </Link>
            )}

            {!userInfo && (
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => signIn(provider.id)}
                      className="flex items-center mx-auto text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      <FaGoogle className="text-white mr-2"></FaGoogle>
                      <span>Login or Register</span>
                    </button>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
