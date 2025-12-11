import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      {/* Branding */}
      <Link className="navbar-brand" to="/dashboard">
        HR Dashboard
      </Link>

      <div className="d-flex align-items-center">

        {/* SHOW MENU ONLY IF LOGGED IN */}
        {user && (
          <>
            {/* ----- ROLE-BASED MENU ----- */}

            {/* Super Admin Menu */}
            {user.role === "superadmin" && (
              <>
                <Link className="btn btn-warning btn-sm me-2" to="/admin">
                  Admin Panel
                </Link>

                <Link className="btn btn-info btn-sm me-2" to="/manage-hr">
                  Manage HR Users
                </Link>

                <Link className="btn btn-secondary btn-sm me-2" to="/settings">
                  System Settings
                </Link>
              </>
            )}

            {/* HR Panel Menu */}
            {user.role === "hr" && (
              <>
                <Link className="btn btn-success btn-sm me-2" to="/hr">
                  HR Dashboard
                </Link>

                <Link className="btn btn-primary btn-sm me-2" to="/employee">
                  Manage Employees
                </Link>

                <Link className="btn btn-info btn-sm me-2" to="/applicants">
                  Applicants
                </Link>

                <Link className="btn btn-secondary btn-sm me-2" to="/documents">
                  Documents
                </Link>
                {user.role === "superadmin" && (
                  <Link className="nav-link" to="/admin/departments">
                    Departments
                  </Link>
                )}

              </>
            )}

            {/* COMMON USER INFO */}
            <span className="text-white me-3 fw-bold">
              {user.name} ({user.role})
            </span>

            <button className="btn btn-danger btn-sm" onClick={logout}>
              Logout
            </button>
          </>
        )}

        {/* IF NOT LOGGED IN */}
        {!user && (
          <Link className="btn btn-light btn-sm" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
