import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HRDashboard from "./pages/HR/HRDashboard";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import EmployeeForm from "./pages/SuperAdmin/EmployeeForm";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./contexts/AuthContext";
import Employees from "./pages/HR/Employees";
import Applicants from "./pages/HR/Applicants";
import Documents from "./pages/HR/Documents";
import Departments from "./pages/HR/Departments";
import DepartmentManagement from "./pages/SuperAdmin/DepartmentManagement";


function RoleRoute({ allowed, children }) {
  const { user } = useContext(AuthContext);

  // user na ho to login pe bhej do
  if (!user) return <Navigate to="/login" />;

  // role check
  return allowed.includes(user.role)
    ? children
    : <Navigate to="/dashboard" />;
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Common dashboard (sab logged‑in users ke liye) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* HR + SuperAdmin */}
        <Route
          path="/hr"
          element={
            <PrivateRoute>
              <RoleRoute allowed={["hr", "superadmin"]}>
                <HRDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Sirf SuperAdmin dashboard */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleRoute allowed={["superadmin"]}>
                <SuperAdminDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        {/* HR Departments Page */}
        <Route
          path="/hr/departments"
          element={
            <PrivateRoute>
              <RoleRoute allowed={["hr", "superadmin"]}>
                <Departments />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* SuperAdmin Department Management */}
        <Route
          path="/admin/departments"
          element={
            <PrivateRoute>
              <RoleRoute allowed={["superadmin"]}>
                <DepartmentManagement />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/departments"
          element={
            <PrivateRoute>
              <RoleRoute allowed={["superadmin"]}>
                <Departments />
              </RoleRoute>
            </PrivateRoute>
          }
        />



        {/* SuperAdmin ke liye EmployeeForm (example URL: /admin/employees/new) */}
        <Route
          path="/admin/employees/new"
          element={
            <PrivateRoute>
              <RoleRoute allowed={["superadmin"]}>
                <EmployeeForm />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/employees/:id/edit"
          element={
            <PrivateRoute>
              <RoleRoute allowed={["superadmin"]}>
                <EmployeeForm />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* last  changes */}
        <Route path="/hr/employees" element={<Employees />} />

        <Route path="/hr/applicants" element={<Applicants />} />

        <Route path="/hr/documents" element={<Documents />} />

        {/* Fallback: koi bhi random URL ho to dashboard pe bhej do */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import HRDashboard from "./pages/HR/HRDashboard";
// import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";

// import Navbar from "./components/Navbar";
// import PrivateRoute from "./components/PrivateRoute";
// import { AuthContext } from "./contexts/AuthContext";
// import { useContext } from "react";

// function RoleRoute({ allowed, children }) {
//   const { user } = useContext(AuthContext);
//   return allowed.includes(user.role) ? children : <Navigate to="/dashboard" />;
// }

// export default function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/hr"
//           element={
//             <PrivateRoute>
//               <RoleRoute allowed={["hr", "superadmin"]}>
//                 <HRDashboard />
//               </RoleRoute>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute>
//               <RoleRoute allowed={["superadmin"]}>
//                 <SuperAdminDashboard />
//               </RoleRoute>
//             </PrivateRoute>
//           }
//         />

//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </>
//   );
// }

// import React, { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import HRDashboard from "./pages/HR/HRDashboard";
// import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
// import Navbar from "./components/Navbar";
// import { AuthContext } from "./contexts/AuthContext";

// function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);
//   return user ? children : <Navigate to="/login" />;
// }

// function RoleRoute({ allowed, children }) {
//   const { user } = useContext(AuthContext);
//   return allowed.includes(user.role) ? children : <Navigate to="/dashboard" />;
// }

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/hr"
//           element={
//             <ProtectedRoute>
//               <RoleRoute allowed={["hr", "superadmin"]}>
//                 <HRDashboard />
//               </RoleRoute>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <RoleRoute allowed={["superadmin"]}>
//                 <SuperAdminDashboard />
//               </RoleRoute>
//             </ProtectedRoute>
//           }
//         />

//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </>
//   );
// }
