import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { AppContext } from "../contexts/appContext";
import getCurrentUser from "../utils/getCurrentUser";
import { FaBars, FaTimes } from "react-icons/fa";

const Menu = () => {
  const { logout } = useContext(AppContext);
  const [currentUser, setCurentUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const user = getCurrentUser();
      setCurentUser(user);
    };

    checkUser();
  }, [location, logout, setMenuOpen]);

  // Close menu when a nav item is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <section className="bg-gray-800 text-white border-b border-gray-300">
      <header className="flex items-center justify-between p-4 bg-gray-100">
        <div className="left-part"></div>
        <Link className="text-xl font-bold  no-underline" id="logo" to="/">
          Will-PGM Studio
        </Link>
      </header>
      <div className="container mx-auto px-4">
        {/* Mobile header with hamburger */}
        <div className="flex items-center justify-between py-4 lg:hidden">
          <div className="flex items-center space-x-4">
            {currentUser && (
              <span className="font-medium capitalize">
                {currentUser?.username}
              </span>
            )}
          </div>
          <button
            className=" focus:outline-none"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <div className="flex items-center justify-between py-4">
            <ul className="flex space-x-6 uppercase">
              <li>
                <Link className=" hover:text-gray-600 transition-colors" to="/">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  className=" hover:text-gray-600 transition-colors"
                  to="/posts"
                >
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link
                  className=" hover:text-gray-600 transition-colors"
                  to="/event"
                >
                  {t("event")}
                </Link>
              </li>
              <li>
                <Link
                  className=" hover:text-gray-600 transition-colors"
                  to="/working-hours"
                >
                  {t("calculator")}
                </Link>
              </li>
              <li>
                <Link
                  className=" hover:text-gray-600 transition-colors"
                  to="/todo"
                >
                  {t("todo")}
                </Link>
              </li>
              <li>
                <Link
                  className=" hover:text-gray-600 transition-colors"
                  to="/recipe"
                >
                  {t("food recipe")}
                </Link>
              </li>
              <li>
                <Link
                  className=" hover:text-gray-600 transition-colors"
                  to="/weather"
                >
                  {t("weather")}
                </Link>
              </li>
              <li>
                <Link
                  className=" hover:text-gray-600 transition-colors"
                  to="/contact"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>

            <ul className="flex items-center space-x-6">
              <li>
                {currentUser && (
                  <span className="font-medium capitalize">
                    {currentUser?.username}
                  </span>
                )}
              </li>
              {currentUser ? (
                <li>
                  <Link
                    className=" hover:text-gray-600 transition-colors"
                    to="/"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className=" hover:text-gray-600 transition-colors"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
              {!currentUser && (
                <li>
                  <Link
                    className=" hover:text-gray-600 transition-colors"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              )}
              <li>
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="lg:hidden pb-4">
            <ul className="flex flex-col space-y-3 uppercase mb-6">
              <li>
                <Link
                  className="block py-2  hover:text-gray-600 transition-colors"
                  to="/"
                  onClick={closeMenu}
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2  hover:text-gray-600 transition-colors"
                  to="/posts"
                  onClick={closeMenu}
                >
                  {t("posts")}
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2  hover:text-gray-600 transition-colors"
                  to="/event"
                  onClick={closeMenu}
                >
                  {t("event")}
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2  hover:text-gray-600 transition-colors"
                  to="/working-hours"
                  onClick={closeMenu}
                >
                  calculator
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2  hover:text-gray-600 transition-colors"
                  to="/todo"
                  onClick={closeMenu}
                >
                  todo
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2  hover:text-gray-600 transition-colors"
                  to="/recipe"
                  onClick={closeMenu}
                >
                  food recipe
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2  hover:text-gray-600 transition-colors"
                  to="/weather"
                  onClick={closeMenu}
                >
                  weather
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2  hover:text-gray-600 transition-colors"
                  to="/contact"
                  onClick={closeMenu}
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col space-y-3 border-t border-gray-200 pt-4">
              {currentUser ? (
                <li>
                  <Link
                    className="block py-2  hover:text-gray-600 transition-colors"
                    to="/"
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      className="block py-2  hover:text-gray-600 transition-colors"
                      to="/login"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-2  hover:text-gray-600 transition-colors"
                      to="/register"
                      onClick={closeMenu}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              <li className="pt-2">
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
