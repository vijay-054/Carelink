import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "../components/dashboard/Dashboard.css";


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth || {});

  const [activeSection, setActiveSection] = useState("Overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState("");

  const adminName =
    user?.fullName ||
    user?.name ||
    "Admin";

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const goToDoctors = () => {
    setActiveSection("Doctors");
    navigate("/admin/doctors");
  };

  const goToPatients = () => {
    setActiveSection("Patients");
    navigate("/admin/patients");
  };

  return (
    <div className="admin-dashboard">

      {/* Animated background */}
      <div className="admin-background">
        <div className="admin-orb admin-orb-one"></div>
        <div className="admin-orb admin-orb-two"></div>
        <div className="admin-orb admin-orb-three"></div>

        <div className="admin-floating-cross cross-one">+</div>
        <div className="admin-floating-cross cross-two">+</div>
      </div>

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-brand">

          <div className="admin-brand-icon">
            +
          </div>

          <div>
            <h2>CareLink</h2>
            <span>Admin Portal</span>
          </div>

        </div>

        {/* ADMIN PROFILE */}
        <div className="admin-profile">

          <div className="admin-avatar">
            {adminName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{adminName}</strong>
            <span>Clinic Admin</span>
          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="admin-nav">

          <button
            className={
              activeSection === "Overview"
                ? "active"
                : ""
            }
            onClick={() => {
              setActiveSection("Overview");
              navigate("/admin-dashboard");
            }}
          >
            <span>⌂</span>
            Overview
          </button>

          <button
            className={
              activeSection === "Doctors"
                ? "active"
                : ""
            }
            onClick={goToDoctors}
          >
            <span>♙</span>
            Doctors
          </button>

          <button
            className={
              activeSection === "Patients"
                ? "active"
                : ""
            }
            onClick={goToPatients}
          >
            <span>♙</span>
            Patients
          </button>

          <button
            onClick={() =>
              showToast(
                "Appointment management selected"
              )
            }
          >
            <span>▣</span>
            Appointments
          </button>

          <button
            onClick={() =>
              showToast(
                "Medical records selected"
              )
            }
          >
            <span>▤</span>
            Health Records
          </button>

          <button
            onClick={() =>
              showToast(
                "Reports section selected"
              )
            }
          >
            <span>▥</span>
            Reports
          </button>

          <button
            onClick={() =>
              showToast(
                "Settings selected"
              )
            }
          >
            <span>⚙</span>
            Settings
          </button>

        </nav>

        {/* LOGOUT */}
        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>

      {/* MAIN */}
      <main className="admin-main">

        {/* TOP BAR */}
        <header className="admin-topbar">

          <div>

            <div className="admin-breadcrumb">
              CareLink
              <span>/</span>
              Admin Portal
            </div>

            <h2>Administration Dashboard</h2>

          </div>

          <div className="admin-top-actions">

            <button
              className="admin-notification"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
            >
              🔔
              <span></span>
            </button>

            <div className="admin-top-user">

              <div className="admin-avatar small">
                {adminName.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{adminName}</strong>
                <span>Clinic Admin</span>
              </div>

            </div>

          </div>

          {/* NOTIFICATIONS */}
          {showNotifications && (
            <div className="admin-notification-panel">

              <h3>Notifications</h3>

              <div className="admin-notification-item">

                <div>✓</div>

                <section>
                  <strong>System ready</strong>
                  <p>
                    CareLink administration portal
                    is ready.
                  </p>
                </section>

              </div>

              <div className="admin-notification-item">

                <div>!</div>

                <section>
                  <strong>System reminder</strong>
                  <p>
                    Review doctor and patient
                    information regularly.
                  </p>
                </section>

              </div>

            </div>
          )}

        </header>

        {/* CONTENT */}
        <div className="admin-content">

          {/* WELCOME */}
          <section className="admin-hero">

            <div className="admin-hero-content">

              <span className="admin-label">
                CARELINK ADMINISTRATION
              </span>

              <h1>
                Welcome back,{" "}
                <span>{adminName.split(" ")[0]}!</span>
              </h1>

              <p>
                Manage doctors, patients,
                appointments and healthcare
                operations from one secure portal.
              </p>

              <div className="admin-hero-actions">

                <button
                  className="admin-primary-btn"
                  onClick={goToDoctors}
                >
                  Manage Doctors →
                </button>

                <button
                  className="admin-secondary-btn"
                  onClick={goToPatients}
                >
                  View Patients
                </button>

              </div>

            </div>

            <div className="admin-hero-visual">

              <div className="admin-pulse-circle">
                +
              </div>

              <div className="admin-pulse-line">
                <span></span>
              </div>

              <div className="admin-floating-card">

                <strong>✓</strong>

                <div>
                  <b>System Status</b>
                  <small>All systems operational</small>
                </div>

              </div>

            </div>

          </section>

          {/* STATISTICS */}
          <section className="admin-stats">

            <div className="admin-stat-card">

              <div className="admin-stat-icon blue">
                ♙
              </div>

              <div>
                <span>Total Doctors</span>
                <strong>4</strong>
                <small>Registered doctors</small>
              </div>

            </div>

            <div className="admin-stat-card">

              <div className="admin-stat-icon green">
                ♙
              </div>

              <div>
                <span>Total Patients</span>
                <strong>0</strong>
                <small>Registered patients</small>
              </div>

            </div>

            <div className="admin-stat-card">

              <div className="admin-stat-icon purple">
                ▣
              </div>

              <div>
                <span>Appointments</span>
                <strong>0</strong>
                <small>Total appointments</small>
              </div>

            </div>

            <div className="admin-stat-card">

              <div className="admin-stat-icon orange">
                ✓
              </div>

              <div>
                <span>Active Doctors</span>
                <strong>4</strong>
                <small>Currently available</small>
              </div>

            </div>

          </section>

          {/* MANAGEMENT */}
          <section className="admin-section">

            <div className="admin-section-heading">

              <span>MANAGEMENT</span>

              <h2>
                Clinic Management
              </h2>

              <p>
                Manage the people and activities
                across your healthcare platform.
              </p>

            </div>

            <div className="admin-management-grid">

              {/* DOCTORS */}
              <button
                className="admin-management-card"
                onClick={goToDoctors}
              >

                <div className="management-icon blue">
                  ♙
                </div>

                <div className="management-content">

                  <h3>Manage Doctors</h3>

                  <p>
                    Add, view and manage healthcare
                    professionals.
                  </p>

                  <span>
                    View Doctors →
                  </span>

                </div>

              </button>

              {/* PATIENTS */}
              <button
                className="admin-management-card"
                onClick={goToPatients}
              >

                <div className="management-icon green">
                  ♙
                </div>

                <div className="management-content">

                  <h3>Manage Patients</h3>

                  <p>
                    View registered patients and
                    manage patient information.
                  </p>

                  <span>
                    View Patients →
                  </span>

                </div>

              </button>

              {/* APPOINTMENTS */}
              <button
                className="admin-management-card"
                onClick={() =>
                  showToast(
                    "Appointment management will be available here"
                  )
                }
              >

                <div className="management-icon purple">
                  ▣
                </div>

                <div className="management-content">

                  <h3>Appointments</h3>

                  <p>
                    Monitor and manage patient
                    appointments.
                  </p>

                  <span>
                    Manage Appointments →
                  </span>

                </div>

              </button>

              {/* REPORTS */}
              <button
                className="admin-management-card"
                onClick={() =>
                  showToast(
                    "Reports section selected"
                  )
                }
              >

                <div className="management-icon orange">
                  ▤
                </div>

                <div className="management-content">

                  <h3>Reports</h3>

                  <p>
                    Review clinic activity and
                    healthcare statistics.
                  </p>

                  <span>
                    View Reports →
                  </span>

                </div>

              </button>

            </div>

          </section>

          {/* SYSTEM OVERVIEW */}
          <section className="admin-section">

            <div className="admin-section-heading">

              <span>SYSTEM OVERVIEW</span>

              <h2>
                Platform Status
              </h2>

              <p>
                Current status of your CareLink
                healthcare platform.
              </p>

            </div>

            <div className="admin-status-grid">

              <div className="admin-status-card">

                <div className="status-check">
                  ✓
                </div>

                <div>
                  <strong>
                    Authentication
                  </strong>

                  <span>
                    Operational
                  </span>
                </div>

              </div>

              <div className="admin-status-card">

                <div className="status-check">
                  ✓
                </div>

                <div>
                  <strong>
                    Database
                  </strong>

                  <span>
                    Connected
                  </span>
                </div>

              </div>

              <div className="admin-status-card">

                <div className="status-check">
                  ✓
                </div>

                <div>
                  <strong>
                    Doctor Portal
                  </strong>

                  <span>
                    Operational
                  </span>
                </div>

              </div>

              <div className="admin-status-card">

                <div className="status-check">
                  ✓
                </div>

                <div>
                  <strong>
                    Patient Portal
                  </strong>

                  <span>
                    Operational
                  </span>
                </div>

              </div>

            </div>

          </section>

          {/* SUPPORT */}
          <section className="admin-support">

            <div className="admin-support-icon">
              ?
            </div>

            <div>

              <span>ADMIN SUPPORT</span>

              <h2>
                Need assistance?
              </h2>

              <p>
                Contact the CareLink support team
                if you need help managing your
                healthcare platform.
              </p>

            </div>

            <button
              onClick={() =>
                showToast(
                  "Support request selected"
                )
              }
            >
              Contact Support →
            </button>

          </section>

        </div>

      </main>

      {/* TOAST */}
      {toast && (
        <div className="admin-toast">
          <span>✓</span>
          {toast}
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;