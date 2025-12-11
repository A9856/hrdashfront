import React, { useState, useEffect } from "react";
import API from "../../services/api";
export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const loadDepartments = async () => {
    let res = await API.get("/departments");
    setDepartments(res.data.departments || []);
  };
  const saveDepartment = async () => {
    if (editId) {
      await API.put(`/departments/${editId}`, { name });
    } else {
      await API.post("/departments", { name });
    }
    setName("");
    setEditId(null);
    loadDepartments();
  };
  const editDepartment = (dep) => {
    setName(dep.name);
    setEditId(dep._id);
  };
  const deleteDepartment = async (id) => {
    await API.delete(`/departments/${id}`);
    loadDepartments();
  };
  useEffect(() => {
    loadDepartments();
  }, []);
  return (
    <div className="container mt-4">
      <h3>Manage Departments</h3>
      <div className="card p-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={saveDepartment}>
          {editId ? "Update Department" : "Add Department"}
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th style={{ width: "160px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editDepartment(d)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteDepartment(d._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No departments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
