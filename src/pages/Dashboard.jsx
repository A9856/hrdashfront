import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome, {user?.name}</h2>
      <p className="mb-4">
        <strong>Role:</strong> {user?.role}
      </p>

      <div className="row">
        {user.role === "superadmin" && (
          <div className="col-md-4 mb-3">
            <Link to="/admin" className="text-decoration-none">
              <div className="card bg-primary text-white p-3 h-100">
                <h5 className="card-title">Super Admin Panel</h5>
                <p className="card-text">Manage HR Users, Departments, Settings</p>
              </div>
            </Link>
          </div>
        )}

        {(user.role === "hr" || user.role === "superadmin") && (
          <div className="col-md-4 mb-3">
            <Link to="/hr" className="text-decoration-none">
              <div className="card bg-success text-white p-3 h-100">
                <h5 className="card-title">HR Dashboard</h5>
                <p className="card-text">Manage Employees, Applications & Reports</p>
              </div>
            </Link>
          </div>
        )}

        {user.role === "employee" && (
          <div className="col-md-4 mb-3">
            <div className="card bg-info text-white p-3 h-100">
              <h5 className="card-title">Employee Panel</h5>
              <p className="card-text">View your profile and tasks</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
