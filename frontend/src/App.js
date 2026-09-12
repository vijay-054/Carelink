import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";

import Dashboard from "./components/dashboard/Dashboard";
import DoctorDashboard from "./components/dashboard/DoctorDashboard";

import ManageDoctors from "./components/admin/ManageDoctors";
import ManagePatients from "./components/admin/ManagePatients";

const getRole = (user) => {
  const role =
    user?.role ||
    user?.userRole ||
    user?.roleName ||
    user?.authority ||
    "";

  return String(role)
    .replace("ROLE_", "")
    .trim()
    .toUpperCase();
};

const isAuthenticated = (user) => {
  return Boolean(user?.token);
};

/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({ children }) {
  const { user } = useSelector(
    (state) => state.auth || {}
  );

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

  if (!isAuthenticated(user)) {
    return <Navigate to="/login" replace />;
  }

  const role = getRole(user);

  if (!allowedRoles.includes(role)) {
    if (role === "DOCTOR") {
      return <Navigate to="/doctor-dashboard" replace />;
    }

    if (role === "CLINIC_ADMIN") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  return (
    <div className="landing-page">

      <div className="landing-background">
        <div className="floating-plus plus-one">+</div>
        <div className="floating-plus plus-two">+</div>
        <div className="floating-plus plus-three">+</div>
        <div className="floating-plus plus-four">+</div>

        <div className="background-orb orb-one" />
        <div className="background-orb orb-two" />
        <div className="background-orb orb-three" />
      </div>

      <header className="landing-navbar">

        <a href="/" className="landing-logo">
          <span className="landing-logo-icon">+</span>
          Care<span>Link</span>
        </a>

        <div className="landing-nav-actions">

          <a
            href="/login"
            className="landing-login"
          >
            Login
          </a>

          <a
            href="/register"
            className="landing-register"
          >
            Get Started
          </a>

        </div>

      </header>

      <main className="landing-content">

        <div className="landing-text">

          <span className="hero-badge">
            SMART HEALTHCARE PLATFORM
          </span>

          <h1>
            Your Health.
            <br />
            <span>Connected.</span>
          </h1>

          <p>
            CareLink brings patients, doctors and healthcare
            management together in one secure and simple
            digital healthcare platform.
          </p>

          <div className="landing-buttons">

            <a
              href="/register"
              className="primary-btn large-btn"
            >
              Create Account →
            </a>

            <a
              href="/login"
              className="secondary-btn large-btn"
            >
              Sign In
            </a>

          </div>

          <div className="hero-features">

            <span>✓ Verified Doctors</span>
            <span>✓ Secure Records</span>
            <span>✓ Easy Booking</span>

          </div>

        </div>

        <div className="landing-art">

          <div className="medical-orbit orbit-one" />
          <div className="medical-orbit orbit-two" />

          <div className="medical-core">
            <span>+</span>
          </div>

          <div className="medical-ring ring-one" />
          <div className="medical-ring ring-two" />

          <div className="floating-card card-one">
            <div className="floating-icon">✓</div>
            <div>
              <strong>Secure Records</strong>
              <small>Protected healthcare data</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <div className="floating-icon">♥</div>
            <div>
              <strong>Trusted Care</strong>
              <small>Connect with doctors</small>
            </div>
          </div>

          <div className="floating-card card-three">
            <div className="floating-icon">▣</div>
            <div>
              <strong>Easy Booking</strong>
              <small>Appointments made simple</small>
            </div>
          </div>

        </div>

      </main>

      <div className="landing-bottom">

        <div>
          <strong>Patients</strong>
          <span>Manage your healthcare</span>
        </div>

        <div>
          <strong>Doctors</strong>
          <span>Manage your consultations</span>
        </div>

        <div>
          <strong>Administrators</strong>
          <span>Manage your clinic</span>
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   DOCTOR DASHBOARD
========================================================= */

function DoctorPage() {
  return (
    <RoleRoute allowedRoles={["DOCTOR"]}>
      <DoctorDashboard />
    </RoleRoute>
  );
}

/* =========================================================
   PATIENT DASHBOARD
========================================================= */

function PatientPage() {
  return (
    <RoleRoute allowedRoles={["PATIENT"]}>
      <Dashboard />
    </RoleRoute>
  );
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function AdminDashboard() {

  const { user } = useSelector(
    (state) => state.auth || {}
  );

  const role = getRole(user);

  return (
    <div className="admin-dashboard">

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <span>+</span>
          CareLink
        </div>

        <div className="admin-user">

          <div className="admin-avatar">
            {(
              user?.email?.charAt(0) || "A"
            ).toUpperCase()}
          </div>

          <div>
            <strong>Clinic Admin</strong>
            <small>{user?.email}</small>
          </div>

        </div>

        <nav>

          <a
            href="/admin-dashboard"
            className="admin-nav active"
          >
            <span>⌂</span>
            Dashboard
          </a>

          <a
            href="/admin-doctors"
            className="admin-nav"
          >
            <span>♙</span>
            Manage Doctors
          </a>

          <a
            href="/admin-patients"
            className="admin-nav"
          >
            <span>♙</span>
            Manage Patients
          </a>

        </nav>

        <AdminLogout />

      </aside>

      <main className="admin-main">

        <header className="admin-topbar">

          <div>
            <span className="admin-eyebrow">
              CARELINK ADMINISTRATION
            </span>

            <h1>Clinic Overview</h1>

            <p>
              Monitor and manage your healthcare platform.
            </p>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar small">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <small>{role}</small>
            </div>
          </div>

        </header>

        <section className="admin-content">

          <div className="admin-welcome">

            <div>
              <span className="admin-badge">
                SYSTEM OVERVIEW
              </span>

              <h2>
                Welcome to the
                <br />
                CareLink Control Center
              </h2>

              <p>
                Manage doctors, patients and healthcare
                operations from one centralized dashboard.
              </p>
            </div>

            <div className="admin-visual">
              <div className="admin-pulse">+</div>
            </div>

          </div>

          <div className="admin-stat-grid">

            <AdminStat
              icon="♙"
              label="Doctors"
              value="—"
              description="Registered doctors"
            />

            <AdminStat
              icon="♙"
              label="Patients"
              value="—"
              description="Registered patients"
            />

            <AdminStat
              icon="▣"
              label="Appointments"
              value="—"
              description="Total appointments"
            />

            <AdminStat
              icon="✓"
              label="System Status"
              value="Active"
              description="CareLink services"
            />

          </div>

          <div className="admin-section-title">

            <div>
              <h2>Management Center</h2>
              <p>
                Quickly access your clinic management tools.
              </p>
            </div>

          </div>

          <div className="admin-action-grid">

            <a
              href="/admin-doctors"
              className="admin-action-card"
            >
              <div className="admin-action-icon">
                ♙
              </div>

              <div>
                <h3>Manage Doctors</h3>
                <p>
                  View, manage and remove doctor accounts.
                </p>
              </div>

              <span>→</span>
            </a>

            <a
              href="/admin-patients"
              className="admin-action-card"
            >
              <div className="admin-action-icon green">
                ♙
              </div>

              <div>
                <h3>Manage Patients</h3>
                <p>
                  View and manage registered patients.
                </p>
              </div>

              <span>→</span>
            </a>

          </div>

          <div className="admin-info-grid">

            <div className="admin-info-card">

              <span className="admin-info-icon">
                ✓
              </span>

              <div>
                <h3>Secure Administration</h3>
                <p>
                  Only authenticated clinic administrators
                  can access these management tools.
                </p>
              </div>

            </div>

            <div className="admin-info-card">

              <span className="admin-info-icon">
                ♥
              </span>

              <div>
                <h3>CareLink Healthcare</h3>
                <p>
                  A centralized platform for connected
                  healthcare management.
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

/* =========================================================
   ADMIN STAT
========================================================= */

function AdminStat({
  icon,
  label,
  value,
  description,
}) {
  return (
    <div className="admin-stat">

      <div className="admin-stat-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{description}</small>
      </div>

    </div>
  );
}

/* =========================================================
   ADMIN LOGOUT
========================================================= */

function AdminLogout() {

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("carelinkToken");
    localStorage.removeItem("carelinkUser");
    localStorage.removeItem("carelinkRegisteredUser");

    window.location.href = "/";
  };

  return (
    <button
      className="admin-logout"
      onClick={handleLogout}
    >
      <span>↪</span>
      Logout
    </button>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PATIENT */}

        <Route
          path="/dashboard"
          element={<PatientPage />}
        />

        {/* DOCTOR */}

        <Route
          path="/doctor-dashboard"
          element={<DoctorPage />}
        />

        {/* ADMIN */}

        <Route
          path="/admin-dashboard"
          element={
            <RoleRoute
              allowedRoles={["CLINIC_ADMIN"]}
            >
              <AdminDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/admin-doctors"
          element={
            <RoleRoute
              allowedRoles={["CLINIC_ADMIN"]}
            >
              <AdminDoctorsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin-patients"
          element={
            <RoleRoute
              allowedRoles={["CLINIC_ADMIN"]}
            >
              <AdminPatientsPage />
            </RoleRoute>
          }
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

/* =========================================================
   ADMIN DOCTORS
========================================================= */

function AdminDoctorsPage() {

  return (
    <div className="admin-management-page">

      <div className="management-header">

        <div>

          <span className="admin-eyebrow">
            CARELINK ADMIN
          </span>

          <h1>Manage Doctors</h1>

          <p>
            View and manage registered doctors.
          </p>

        </div>

        <a
          href="/admin-dashboard"
          className="management-back"
        >
          ← Dashboard
        </a>

      </div>

      <div className="management-card">

        <ManageDoctors />

      </div>

    </div>
  );
}

/* =========================================================
   ADMIN PATIENTS
========================================================= */

function AdminPatientsPage() {

  return (
    <div className="admin-management-page">

      <div className="management-header">

        <div>

          <span className="admin-eyebrow">
            CARELINK ADMIN
          </span>

          <h1>Manage Patients</h1>

          <p>
            View and manage registered patients.
          </p>

        </div>

        <a
          href="/admin-dashboard"
          className="management-back"
        >
          ← Dashboard
        </a>

      </div>

      <div className="management-card">

        <ManagePatients />

      </div>

    </div>
  );
}

export default App;