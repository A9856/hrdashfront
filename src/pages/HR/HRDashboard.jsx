import React, { useEffect, useState } from "react";
import API from "../../services/api";

export default function HRDashboard() {
  const [employees, setEmployees] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [employeeCount, setEmployeeCount] = useState(0);
  const [applicantCount, setApplicantCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  // LOAD ALL DASHBOARD COUNTS
  const loadCounts = async () => {
    try {
      // Employees
      const emp = await API.get("/employees");
      const empList =
        emp.data.employees || emp.data.data || emp.data || [];
      setEmployees(empList);
      setEmployeeCount(empList.length);

      // Applicants
      const app = await API.get("/applicants");
      const appList =
        app.data.applicants || app.data.data || app.data || [];
      setApplicants(appList);
      setApplicantCount(appList.length);

      // Documents
      const doc = await API.get("/documents");
      const docList =
        doc.data.documents || doc.data.data || doc.data || [];
      setDocuments(docList);
      setDocumentCount(docList.length);

      // Departments
      const dep = await API.get("/departments");
      const depList =
        dep.data.departments || dep.data.data || dep.data || [];
      setDepartments(depList);
      setDepartmentCount(depList.length);

    } catch (err) {
      console.error("Dashboard Load Error:", err);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  return (
    <div className="container mt-4">

      <h2 className="mb-4">HR Dashboard</h2>

      {/* CARDS */}
      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h4 className="text-center">Employees</h4>
            <h3 className="text-primary text-center">{employeeCount}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h4 className="text-center">Applicants</h4>
            <h3 className="text-success text-center">{applicantCount}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h4 className="text-center">Documents</h4>
            <h3 className="text-danger text-center">{documentCount}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h4 className="text-center">Departments</h4>
            <h3 className="text-info text-center">{departmentCount}</h3>
          </div>
        </div>

      </div>
      {/*  LATEST LISTS*/}
      <div className="row">

        {/* Employees */}
        <div className="col-md-6">
          <h4>Latest Employees</h4>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.slice(0, 5).map((e) => (
                  <tr key={e._id}>
                    <td>{e.firstName + " " + e.lastName}</td>
                    <td>{e.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Applicants */}
        <div className="col-md-6">
          <h4>Latest Applicants</h4>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Position</th>
              </tr>
            </thead>

            <tbody>
              {applicants.length > 0 ? (
                applicants.slice(0, 5).map((a) => (
                  <tr key={a._id}>
                    <td>{a.name}</td>
                    <td>{a.position}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No Applicants Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
