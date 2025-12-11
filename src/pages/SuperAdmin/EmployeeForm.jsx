import React, { useState, useEffect } from "react";
import API from "../../services/api";

export default function EmployeeForm({ selectedEmployee = null, onSuccess = () => {} }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    status: "active",
    photo: null,
  });

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        firstName: selectedEmployee.firstName || "",
        lastName: selectedEmployee.lastName || "",
        email: selectedEmployee.email || "",
        phone: selectedEmployee.phone || "",
        department: selectedEmployee.department || "",
        designation: selectedEmployee.designation || "",
        status: selectedEmployee.status || "active",
        photo: null,
      });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in form) {
      if (form[key]) {
        data.append(key, form[key]);
      }
    }

    try {
      if (selectedEmployee && selectedEmployee._id) {
        await API.put(`/employees/${selectedEmployee._id}`, data);
        alert("Employee updated");
      } else {
        await API.post("/employees", data);
        alert("Employee created");
      }

      onSuccess();

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        status: "active",
        photo: null,
      });
    } catch (err) {
      console.error(err);
      alert("Error creating/updating employee");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text"name="firstName"value={form.firstName}onChange={handleChange}placeholder="First Name"required/>

      <input type="text" name="lastName"value={form.lastName}onChange={handleChange}placeholder="Last Name" required/>

      <input type="email"name="email"value={form.email}onChange={handleChange}placeholder="Email" required/>

      <input type="text" name="phone"value={form.phone}onChange={handleChange}placeholder="Phone"/>

      <input type="text" name="department"value={form.department}onChange={handleChange}placeholder="Department"/>

      <input type="text" name="designation"value={form.designation} onChange={handleChange}placeholder="Designation"/>

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <input type="file" name="photo" onChange={handleChange} />

      <button type="submit">
        {selectedEmployee ? "Update" : "Create"}
      </button>
    </form>
  );
}
