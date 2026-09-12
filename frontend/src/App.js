import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import AdminDoctorsPage from "./pages/AdminDoctorsPage";
import AdminPatientsPage from "./pages/AdminPatientsPage";

import { getMe } from "./store/slices/authSlice";


/* =========================================================
   ROLE HELPER
========================================================= */

const getRole = (user) => {
  if (!user) return null;

  return (
    user.role ||
    user.authorities?.[0]?.authority ||
    user.authorities?.[0] ||
    null
  );
};


/* =========================================================
   AUTH CHECK
========================================================= */

const isAuthenticated = (user) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  return Boolean(token && user);
};


/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({ children }) {
  const { user, isLoading } = useSelector(
    (state) => state.auth || {}
  );

  if (isLoading) {
    return (
      <div className="route-loading">
        <div className="loading-spinner"></div>
        <p>Loading CareLink...</p>
      </div>
    );
  }

  if (!isAuthenticated(user)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


/* =========================================================
   ROLE ROUTE
========================================================= */

function RoleRoute({ allowedRoles, children }) {
  const { user } = useSelector(
    (state) => state.auth || {}
  );

  const role = getRole(user);

  if (!allowedRoles.includes(role)) {

    if (role === "DOCTOR") {
      return (
        <Navigate
          to="/doctor-dashboard"
          replace
        />
      );
    }

    if (role === "CLINIC_ADMIN") {
      return (
        <Navigate
          to="/admin-dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/patient-dashboard"
        replace
      />
    );
  }

  return children;
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

  /* DOCTOR */

  if (role === "DOCTOR") {
    return (
      <Navigate
        to="/doctor-dashboard"
        replace
      />
    );
  }

  /* ADMIN */

  if (role === "CLINIC_ADMIN") {
    return (
      <Navigate
        to="/admin-dashboard"
        replace
      />
    );
  }

  /* PATIENT */

  return (
    <Navigate
      to="/patient-dashboard"
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
      <RoleRoute allowedRoles={["CLINIC_ADMIN"]}>
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
      <RoleRoute allowedRoles={["CLINIC_ADMIN"]}>
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
      <RoleRoute allowedRoles={["CLINIC_ADMIN"]}>
        <AdminPatientsPage />
      </RoleRoute>
    </ProtectedRoute>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {

  const dispatch = useDispatch();

  const {
    user,
    isLoading,
  } = useSelector(
    (state) => state.auth || {}
  );


  /* =======================================================
     RESTORE LOGIN AFTER PAGE REFRESH
  ======================================================= */

  useEffect(() => {

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken");

    if (token && !user) {
      dispatch(getMe());
    }

  }, [dispatch, user]);


  /* =======================================================
     LOADING
  ======================================================= */

  if (isLoading && !user) {
    return (
      <div className="route-loading">

        <div className="loading-logo">
          +
        </div>

        <h2>CareLink</h2>

        <div className="loading-spinner"></div>

        <p>
          Loading your healthcare portal...
        </p>

      </div>
    );
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
            user ? (
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
            user ? (
              <RoleDashboardRedirect />
            ) : (
              <Register />
            )
          }
        />


        {/* =================================================
            DASHBOARD ENTRY
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
            FALLBACK
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