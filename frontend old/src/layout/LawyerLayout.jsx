import { NavLink, Outlet } from "react-router-dom";

const LawyerLayout = () => {
  return (
    <div className="lawyer__layout">
      {/* Sidebar */}
      <aside className="lawyer__sidebar">
        <div className="lawyer__sidebar__brand">
          <h2>Lawyer Panel</h2>
        </div>

        <nav className="lawyer__sidebar__nav">
          <ul className="lawyer__sidebar__menu">
            <li className="lawyer__sidebar__item">
              <NavLink
                to="/lawyer/cases"
                className={({ isActive }) =>
                  `lawyer__sidebar__link ${isActive ? "lawyer__sidebar__link__active" : ""}`
                }
              >
                Cases
              </NavLink>
            </li>

            <li className="lawyer__sidebar__item">
              <NavLink
                to="/lawyer/intake-review"
                className={({ isActive }) =>
                  `lawyer__sidebar__link ${isActive ? "lawyer__sidebar__link__active" : ""}`
                }
              >
                Intake Review
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lawyer__layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default LawyerLayout;
