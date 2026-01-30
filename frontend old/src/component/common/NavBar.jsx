import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.js";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const commonMenu = [{ label: "About Us", path: "#" }];

  const authMenu = isAuthenticated
    ? [
        {
          label: "Dashboard",
          path:
            user?.role === "ADMIN"
              ? "/admin"
              : user?.role === "LAWYER"
              ? "/lawyer"
              : "/client",
        },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Sign Up", path: "/signup" },
      ];

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar__logo">
        <h2>LegalTech</h2>
      </div>

      <ul className="navbar__menu">
        {[...commonMenu, ...authMenu].map(({ label, path }) => (
          <li key={label} className="navbar__item">
            <NavLink to={path} className="navbar__link">
              {label}
            </NavLink>
          </li>
        ))}

        {isAuthenticated && (
          <li className="navbar__item">
            <button
              className="navbar__link navbar__logout"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
