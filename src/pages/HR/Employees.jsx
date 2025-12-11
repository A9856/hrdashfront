import React, { useEffect, useState } from "react";
import API from "../../services/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get("/employees")
      .then(res => {
        // SAFE HANDLING
        const list =
          res.data.employees ||   // if backend sends { employees: [...] }
          res.data.data ||        // if backend sends { data: [...] }
          res.data ||             // if backend sends [ ... ]
          [];

        setEmployees(list);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Employees List</h3>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((e) => (
              <tr key={e._id}>
                <td>{e.firstName + " " + e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>{e.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
