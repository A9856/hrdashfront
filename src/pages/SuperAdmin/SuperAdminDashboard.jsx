import React, { useEffect, useState } from "react";
import API from "../../services/api";
import EmployeeForm from "./EmployeeForm";
import { Link } from "react-router-dom";
export default function SuperAdminDashboard() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // Final Correct Users Loader
  const loadUsers = async () => {
    try {
      const res = await API.get("/employees");
      let list = [];
      if (Array.isArray(res.data)) {
        list = res.data; // direct array
      }
      else if (res.data.employees && Array.isArray(res.data.employees)) {
        list = res.data.employees; // { response array employees: [] }
      }
      else if (res.data.users && Array.isArray(res.data.users)) {
        list = res.data.users; // { users: [] }
      }
      setUsers(list);
    } catch (err) {
      console.error("Failed to load employees", err);
      setUsers([]);
    }
  };
  //  Departments Loader
  const loadDepartments = async () => {
    try {
      const res = await API.get("/departments");
      const list = Array.isArray(res.data) ? res.data : [];
      setDepartments(list);
    } catch (error) {
      console.error("Error fetching departments");
      setDepartments([]);
    }
  };
  //  Only ONE useEffect
  useEffect(() => {
    loadUsers();
    loadDepartments();
  }, []);
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeForm(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      try {
        await API.delete(`/employees/${id}`);
        loadUsers();
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  const handleFormClose = () => {
    setShowEmployeeForm(false);
    setSelectedEmployee(null);
    loadUsers();
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "230px", minHeight: "100vh" }}>
        <h4 className="text-center">Admin Panel</h4>
        <hr />
        <ul className="nav flex-column">
          {/* HR Users */}
          <li className="nav-item mb-2">
            <Link to="/admin/users" className="nav-link text-white">
              HR Users
            </Link>
          </li>
          {/* Departments */}
          <li className="nav-item mb-2">
            <Link to="/admin/departments" className="nav-link text-white">
              Departments
            </Link>
          </li>
          {/* Settings */}
          <li className="nav-item mb-2">
            <Link to="/admin/settings" className="nav-link text-white">
              Settings
            </Link>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="container mt-4">
        {/* USERS TAB */}
        {activeTab === "users" && (
          <>
            <h3>Manage HR Users</h3>
            <button
              className="btn btn-success mb-3"
              onClick={() => setShowEmployeeForm(true)}>Add Employee</button>
            {showEmployeeForm && (
              <div className="card p-3 mb-3">
                <h5>{selectedEmployee ? "Edit Employee" : "Add Employee"}</h5>
                <EmployeeForm
                  selectedEmployee={selectedEmployee}
                  onSuccess={handleFormClose} />
                <button className="btn btn-secondary mt-2" onClick={() => setShowEmployeeForm(false)}>Cancel</button>
              </div>
            )}
            {/* Employee Table */}
            <table className="table table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.firstName} {u.lastName}</td>
                      <td>{u.email}</td>
                      <td>{u.phone || "-"}</td>
                      <td>{u.department || "-"}</td>
                      <td>{u.designation || "-"}</td>
                      <td>{u.status || "Inactive"}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2"onClick={() => handleEdit(u)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-muted text-center">No employees found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {/* DEPARTMENTS TAB */}
        {activeTab === "departments" && (
          <>
            <h3>Manage Departments</h3>

            <table className="table table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Department Name</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(departments) && departments.length > 0 ? (
                  departments.map((d) => (
                    <tr key={d._id}>
                      <td>{d.name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-muted">No departments found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <>
            <h3>System Settings</h3>
            <p className="text-muted">Only SuperAdmin can access these settings.</p>
            <ul>
              <li>Change system theme</li>
              <li>Update company profile</li>
              <li>Manage security settings</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
