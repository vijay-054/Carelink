import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import "./App.css";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import AdminDoctorsPage from "./pages/AdminDoctorsPage";
import AdminPatientsPage from "./pages/AdminPatientsPage";


/* =========================================================
   GET USER ROLE
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

  // If role is an object
  if (typeof role === "object" && role !== null) {
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

  // Convert ROLE_PATIENT -> PATIENT
  if (role.startsWith("ROLE_")) {
    role = role.substring(5);
  }

  return role;
};


/* =========================================================
   CHECK AUTHENTICATION
========================================================= */

const isAuthenticated = (user) => {
  if (!user) {
    return false;
  }

  // Main authentication check
  if (user.token) {
    return true;
  }

  // Support common token property names
  if (user.accessToken) {
    return true;
  }

  if (user.jwt) {
    return true;
  }

  return false;
};


/* =========================================================
   LOADING SCREEN
========================================================= */

function LoadingScreen() {
  return (
    <div className="route-loading">
      <div className="loading-card">

        <div className="loading-logo">
          +
        </div>

        <h2>CareLink</h2>

        <div className="loading-spinner"></div>

        <p>
          Loading your healthcare portal...
        </p>

      </div>
    </div>
  );
}


/* =========================================================
   GET DASHBOARD PATH BASED ON ROLE
========================================================= */

const getDashboardPath = (role) => {
  switch (role) {
    case "PATIENT":
      return "/patient-dashboard";

    case "DOCTOR":
      return "/doctor-dashboard";

    case "ADMIN":
    case "CLINIC_ADMIN":
      return "/admin-dashboard";

    default:
      return "/login";
  }
};


/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({ children }) {
  const auth = useSelector(
    (state) => state.auth || {}
  );

  const user = auth.user;
  const isLoading = auth.isLoading;

  // Wait for authentication check
  if (isLoading) {
    return <LoadingScreen />;
  }

  // User is not logged in
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
   ROLE PROTECTED ROUTE
========================================================= */

function RoleRoute({
  allowedRoles,
  children,
}) {
  const auth = useSelector(
    (state) => state.auth || {}
  );

  const user = auth.user;
  const role = getRole(user);

  // No role
  if (!role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Role is allowed
  if (allowedRoles.includes(role)) {
    return children;
  }

  // Role is not allowed
  return (
    <Navigate
      to={getDashboardPath(role)}
      replace
    />
  );
}


/* =========================================================
   ROLE DASHBOARD REDIRECT
========================================================= */

function RoleDashboardRedirect() {
  const auth = useSelector(
    (state) => state.auth || {}
  );

  const user = auth.user;
  const isLoading = auth.isLoading;

  // Still checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Not logged in
  if (!isAuthenticated(user)) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const role = getRole(user);

  return (
    <Navigate
      to={getDashboardPath(role)}
      replace
    />
  );
}


/* =========================================================
   PATIENT DASHBOARD
========================================================= */

function PatientPage() {
  return (
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={["PATIENT"]}
      >
        <Dashboard />
      </RoleRoute>
    </ProtectedRoute>
  );
}


/* =========================================================
   DOCTOR DASHBOARD
========================================================= */

function DoctorPage() {
  return (
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={["DOCTOR"]}
      >
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
          "ADMIN",
          "CLINIC_ADMIN",
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
          "ADMIN",
          "CLINIC_ADMIN",
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
          "ADMIN",
          "CLINIC_ADMIN",
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
  const auth = useSelector(
    (state) => state.auth || {}
  );

  const user = auth.user;
  const isLoading = auth.isLoading;

  /*
    Show loading screen only while Redux
    is checking the authentication state.
  */

  if (isLoading && !user) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={
            <RoleDashboardRedirect />
          }
        />


        {/* =================================================
            LOGIN
        ================================================= */}

        <Route
          path="/login"
          element={
            isAuthenticated(user) ? (
              <RoleDashboardRedirect />
            ) : (
              <Login />
            )
          }
        />


        {/* =================================================
            REGISTER
        ================================================= */}

        <Route
          path="/register"
          element={
            isAuthenticated(user) ? (
              <RoleDashboardRedirect />
            ) : (
              <Register />
            )
          }
        />


        {/* =================================================
            GENERIC DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <RoleDashboardRedirect />
          }
        />


        {/* =================================================
            PATIENT
        ================================================= */}

        <Route
          path="/patient-dashboard"
          element={
            <PatientPage />
          }
        />


        {/* =================================================
            DOCTOR
        ================================================= */}

        <Route
          path="/doctor-dashboard"
          element={
            <DoctorPage />
          }
        />


        {/* =================================================
            ADMIN
        ================================================= */}

        <Route
          path="/admin-dashboard"
          element={
            <AdminPage />
          }
        />


        {/* =================================================
            ADMIN DOCTORS
        ================================================= */}

        <Route
          path="/admin/doctors"
          element={
            <AdminDoctors />
          }
        />


        {/* =================================================
            ADMIN PATIENTS
        ================================================= */}

        <Route
          path="/admin/patients"
          element={
            <AdminPatients />
          }
        />


        {/* =================================================
            UNKNOWN URL
        ================================================= */}

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