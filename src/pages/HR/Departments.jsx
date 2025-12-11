import React, { useEffect, useState } from "react";
import API from "../../services/api";

export default function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    API.get("/departments")
      .then(res => {
        const list = res.data.departments || [];
        setDepartments(list);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Departments List</h3>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Department Name</th>
          </tr>
        </thead>

        <tbody>
          {departments.length > 0 ? (
            departments.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center">No Departments Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
