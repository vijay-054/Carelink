import React from "react";
import "./Dashboard.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import AdminDoctorsPage from "./pages/AdminDoctorsPage";
import AdminPatientsPage from "./pages/AdminPatientsPage";


/* =========================================================
   ROLE HELPER
========================================================= */

const getRole = (user) => {
  if (!user) {
    return null;
  }

  let role =
    user.role ||
    user.userRole ||
    user.roleName ||
    user.authority ||
    user.authorities?.[0]?.authority ||
    user.authorities?.[0] ||
    null;

  if (typeof role === "object") {
    role =
      role.name ||
      role.role ||
      role.authority ||
      null;
  }

  if (!role) {
    return null;
  }

  role = String(role).trim().toUpperCase();

  if (role.startsWith("ROLE_")) {
    role = role.substring(5);
  }

  return role;
};


/* =========================================================
   AUTH CHECK
========================================================= */

const isAuthenticated = (user) => {
  if (!user) {
    return false;
  }

  return Boolean(user.token);
};


/* =========================================================
   LOADING SCREEN
========================================================= */

function LoadingScreen() {
  return (
    <div className="route-loading">
      <div className="loading-logo">+</div>

      <h2>CareLink</h2>

      <div className="loading-spinner"></div>

      <p>
        Loading your healthcare portal...
      </p>
    </div>
  );
}


/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({ children }) {
  const { user, isLoading } = useSelector(
    (state) => state.auth || {}
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated(user)) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}


/* =========================================================
   ROLE ROUTE
========================================================= */

function RoleRoute({
  allowedRoles,
  children,
}) {
  const { user } = useSelector(
    (state) => state.auth || {}
  );

  const role = getRole(user);

  if (!role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (allowedRoles.includes(role)) {
    return children;
  }

  if (role === "DOCTOR") {
    return (
      <Navigate
        to="/doctor-dashboard"
        replace
      />
    );
  }

  if (
    role === "CLINIC_ADMIN" ||
    role === "ADMIN"
  ) {
    return (
      <Navigate
        to="/admin-dashboard"
        replace
      />
    );
  }

  if (role === "PATIENT") {
    return (
      <Navigate
        to="/patient-dashboard"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  );
}


/* =========================================================
   ROLE DASHBOARD REDIRECT
========================================================= */

function RoleDashboardRedirect() {
  const { user } = useSelector(
    (state) => state.auth || {}
  );

  if (!isAuthenticated(user)) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const role = getRole(user);

  if (role === "DOCTOR") {
    return (
      <Navigate
        to="/doctor-dashboard"
        replace
      />
    );
  }

  if (
    role === "CLINIC_ADMIN" ||
    role === "ADMIN"
  ) {
    return (
      <Navigate
        to="/admin-dashboard"
        replace
      />
    );
  }

  if (role === "PATIENT") {
    return (
      <Navigate
        to="/patient-dashboard"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  );
}


/* =========================================================
   PATIENT PAGE
========================================================= */

function PatientPage() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["PATIENT"]}>
        <Dashboard />
      </RoleRoute>
    </ProtectedRoute>
  );
}


/* =========================================================
   DOCTOR PAGE
========================================================= */

function DoctorPage() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["DOCTOR"]}>
        <DoctorDashboard />
      </RoleRoute>
    </ProtectedRoute>
  );
}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function AdminPage() {
  return (
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[
          "CLINIC_ADMIN",
          "ADMIN",
        ]}
      >
        <AdminDashboard />
      </RoleRoute>
    </ProtectedRoute>
  );
}


/* =========================================================
   ADMIN DOCTORS
========================================================= */

function AdminDoctors() {
  return (
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[
          "CLINIC_ADMIN",
          "ADMIN",
        ]}
      >
        <AdminDoctorsPage />
      </RoleRoute>
    </ProtectedRoute>
  );
}


/* =========================================================
   ADMIN PATIENTS
========================================================= */

function AdminPatients() {
  return (
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[
          "CLINIC_ADMIN",
          "ADMIN",
        ]}
      >
        <AdminPatientsPage />
      </RoleRoute>
    </ProtectedRoute>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {
  const { user, isLoading } = useSelector(
    (state) => state.auth || {}
  );

  if (isLoading && !user) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={
            <RoleDashboardRedirect />
          }
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={
            user ? (
              <RoleDashboardRedirect />
            ) : (
              <Login />
            )
          }
        />


        {/* REGISTER */}

        <Route
          path="/register"
          element={
            user ? (
              <RoleDashboardRedirect />
            ) : (
              <Register />
            )
          }
        />


        {/* GENERIC DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <RoleDashboardRedirect />
          }
        />


        {/* PATIENT DASHBOARD */}

        <Route
          path="/patient-dashboard"
          element={
            <PatientPage />
          }
        />


        {/* DOCTOR DASHBOARD */}

        <Route
          path="/doctor-dashboard"
          element={
            <DoctorPage />
          }
        />


        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin-dashboard"
          element={
            <AdminPage />
          }
        />


        {/* ADMIN DOCTORS */}

        <Route
          path="/admin/doctors"
          element={
            <AdminDoctors />
          }
        />


        {/* ADMIN PATIENTS */}

        <Route
          path="/admin/patients"
          element={
            <AdminPatients />
          }
        />


        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <RoleDashboardRedirect />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}


export default App;