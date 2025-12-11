import React, { useEffect, useState } from "react";
import API from "../../services/api";

export default function Applicants() {
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingApplicant, setEditingApplicant] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    status: "pending",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all applicants
  const fetchApplicants = () => {
    API.get("/applicants")
      .then((res) => setList(res.data.applicants))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  // Add or update applicant
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("position", formData.position);
    data.append("status", formData.status);
    if (resumeFile) data.append("resume", resumeFile);

    try {
      if (editingApplicant) {
        // Update applicant
        await API.put(`/applicants/${editingApplicant._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Applicant updated successfully!");
      } else {
        // Add new applicant
        await API.post("/applicants", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Applicant added successfully!");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        status: "pending",
      });
      setResumeFile(null);
      setEditingApplicant(null);
      setShowForm(false);
      fetchApplicants();
    } catch (err) {
      console.error(err);
      setMessage("Error saving applicant.");
    }
  };

  // Load applicant data for editing
  const handleEdit = (applicant) => {
    setEditingApplicant(applicant);
    setFormData({
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone || "",
      position: applicant.position,
      status: applicant.status,
    });
    setResumeFile(null);
    setShowForm(true);
  };

  // Delete applicant
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this applicant?")) {
      try {
        await API.delete(`/applicants/${id}`);
        fetchApplicants();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-3">
      <h3>Applicants</h3>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setShowForm(!showForm);
          setEditingApplicant(null);
          setFormData({
            name: "",
            email: "",
            phone: "",
            position: "",
            status: "pending",
          });
          setResumeFile(null);
          setMessage("");
        }}
      >
        {showForm ? "Close Form" : "Add Applicant"}
      </button>

      {/* Form for Add/Edit */}
      {showForm && (
        <div className="card p-3 mb-3">
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text"className="form-control"name="name"value={formData.name}onChange={handleChange}required/>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email"className="form-control"name="email"value={formData.email}onChange={handleChange}required/>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text"className="form-control"name="phone"value={formData.phone}onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Position</label>
              <input type="text" className="form-control"name="position"value={formData.position}onChange={handleChange}required/>
            </div>
            <div className="mb-3">
              <label className="form-label">Resume</label>
              <input type="file"className="form-control"onChange={handleFileChange}accept=".pdf,.doc,.docx"/>
              {editingApplicant?.resume && (
                // <small>
                //   Current file:{" "}
                //   <a href={`http://localhost:5000/${editingApplicant.resume}`}target="_blank"rel="noopener noreferrer">Download</a>
                // </small>
                 <small>
                  Current file:{" "}
                  <a href={`https://hrdashback.vercel.app/${editingApplicant.resume}`}target="_blank"rel="noopener noreferrer">Download</a>
                </small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select name="status"className="form-select"value={formData.status}onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="hired">Hired</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              {editingApplicant ? "Update Applicant" : "Add Applicant"}
            </button>
          </form>
        </div>
      )}
      {/* Applicants Table */}
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Status</th>
            <th>Resume</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map((a) => (
            <tr key={a._id}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.phone || "-"}</td>
              <td>{a.position}</td>
              <td>{a.status}</td>
              <td>
                {/* {a.resume ? (
                  <a href={`http://localhost:5000/${a.resume}`}target="_blank"rel="noopener noreferrer">Download</a>) : ("No File"
                )} */}
                 {a.resume ? (
                  <a href={`https://hrdashback.vercel.app/${a.resume}`}target="_blank"rel="noopener noreferrer">Download</a>) : ("No File"
                )}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"onClick={() => handleEdit(a)}>Edit
                </button>
                <button className="btn btn-danger btn-sm"onClick={() => handleDelete(a._id)}>Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
