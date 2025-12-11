import React, { useEffect, useState } from "react";
import API from "../../services/api";

export default function Documents() {
  const [list, setList] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch HR documents
  const fetchDocuments = () => {
    API.get("/documents/hr") // HR-specific documents
      .then((res) => setList(res.data.documents))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Upload HR document
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file");

    const data = new FormData();
    data.append("file", file);
    data.append("type", "hr");
    data.append("userId", "HR_USER_ID_HERE"); // Replace with logged-in HR userId

    try {
      await API.post("/documents", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded successfully!");
      setFile(null);
      fetchDocuments();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // Delete document
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this HR document?")) {
      try {
        await API.delete(`/documents/hr/${id}`);
        fetchDocuments();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-3">
      <h3>HR Documents</h3>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf,.doc,.docx"
        />
        <button type="submit" className="btn btn-success ms-2">
          Upload HR Document
        </button>
      </form>

      {/* Documents Table */}
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Role</th>
            <th>Type</th>
            <th>File</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.map((d) => (
            <tr key={d._id}>
              <td>{d.userName || d.userId?.name}</td>
              <td>{d.type}</td>
              <td>
                <a href={`http://localhost:5000/${d.filePath}`}target="_blank"rel="noopener noreferrer">
                  {d.fileName}
                </a>
              </td>
              <td>
                <button className="btn btn-danger btn-sm"onClick={() => handleDelete(d._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No HR documents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

