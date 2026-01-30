import { NavLink, Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <NavLink
            to="cases"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            Cases
          </NavLink>

          <NavLink
            to="intakes"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            Intakes
          </NavLink>

          <NavLink
            to="intake-form"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            + Intake Form
          </NavLink>
        </nav>
      </aside>

      <main className="content">
        <div className="dashboard-card">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ClientLayout;
