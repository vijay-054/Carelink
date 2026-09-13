import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "../components/dashboard/Dashboard.css";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth || {});

  // Get user name safely
  const userName =
    user?.fullName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Admin";

  // Get role safely
  let role =
    user?.role ||
    user?.userRole ||
    user?.roleName ||
    user?.authority ||
    user?.authorities?.[0]?.authority ||
    user?.authorities?.[0] ||
    "";

  if (typeof role === "object") {
    role =
      role?.name ||
      role?.role ||
      role?.authority ||
      "";
  }

  role = String(role).trim().toUpperCase();

  if (role.startsWith("ROLE_")) {
    role = role.substring(5);
  }

  // If not logged in, go to login
  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="care-dashboard admin-dashboard">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          <div className="logo-heart">
            +
          </div>

          <span>CareLink</span>
        </div>

        <nav className="dashboard-nav">

          <button className="dashboard-nav-item active">
            <span>▣</span>
            Dashboard
          </button>

          <button className="dashboard-nav-item">
            <span>👨‍⚕️</span>
            Doctors
          </button>

          <button className="dashboard-nav-item">
            <span>👥</span>
            Patients
          </button>

          <button className="dashboard-nav-item">
            <span>📅</span>
            Appointments
          </button>

          <button className="dashboard-nav-item">
            <span>📊</span>
            Reports
          </button>

          <button className="dashboard-nav-item">
            <span>⚙</span>
            Settings
          </button>

        </nav>

        <button
          className="dashboard-logout"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("authToken");

            window.location.href = "/login";
          }}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>

      {/* MAIN */}
      <main className="dashboard-main">

        {/* TOP BAR */}
        <header className="dashboard-topbar">

          <div>
            <span className="dashboard-page-label">
              ADMIN PORTAL
            </span>
          </div>

          <div className="topbar-user">

            <button
              className="notification-button"
              aria-label="Notifications"
            >
              🔔
              <span className="notification-dot" />
            </button>

            <div className="user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">
              <strong>{userName}</strong>
              <span>
                {role || "Clinic Admin"}
              </span>
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="dashboard-content">

          {/* HEADING */}
          <section className="dashboard-heading">

            <span className="modal-eyebrow">
              ADMINISTRATION
            </span>

            <h1>
              Welcome, {userName}! 👋
            </h1>

            <p>
              Manage your CareLink healthcare system
              from one place.
            </p>

          </section>

          {/* HERO */}
          <section className="patient-hero">

            <div className="patient-hero-content">

              <h2>
                CareLink<br />
                Administration
              </h2>

              <p>
                Manage doctors, patients, appointments
                and healthcare operations efficiently.
              </p>

            </div>

            <div className="patient-hero-art">
              <div className="leaf leaf-one">
                🌿
              </div>

              <div className="patient-woman">
                🧑‍⚕️
              </div>

              <div className="heart-shape">
                ♥
              </div>
            </div>

            <div className="hero-script">
              Better Care<br />
              Better Management
            </div>

          </section>

          {/* STATS */}
          <section className="dashboard-stats">

            <div className="dashboard-stat">

              <div className="stat-icon mint">
                👨‍⚕️
              </div>

              <div>
                <span>Doctors</span>
                <strong>12</strong>
                <small>Registered Doctors</small>
              </div>

            </div>

            <div className="dashboard-stat">

              <div className="stat-icon teal">
                👥
              </div>

              <div>
                <span>Patients</span>
                <strong>48</strong>
                <small>Registered Patients</small>
              </div>

            </div>

            <div className="dashboard-stat">

              <div className="stat-icon orange">
                📅
              </div>

              <div>
                <span>Appointments</span>
                <strong>24</strong>
                <small>This Month</small>
              </div>

            </div>

            <div className="dashboard-stat">

              <div className="stat-icon coral">
                💬
              </div>

              <div>
                <span>Messages</span>
                <strong>8</strong>
                <small>Unread Messages</small>
              </div>

            </div>

          </section>

          {/* MANAGEMENT CARDS */}
          <section className="two-column-grid">

            <div className="dashboard-card">

              <div className="card-heading">

                <h3>
                  Doctor Management
                </h3>

              </div>

              <p>
                Manage registered doctors and their
                healthcare services.
              </p>

              <button
                className="green-button"
                onClick={() =>
                  (window.location.href =
                    "/admin/doctors")
                }
              >
                Manage Doctors
              </button>

            </div>

            <div className="dashboard-card">

              <div className="card-heading">

                <h3>
                  Patient Management
                </h3>

              </div>

              <p>
                View and manage patients registered
                with CareLink.
              </p>

              <button
                className="green-button"
                onClick={() =>
                  (window.location.href =
                    "/admin/patients")
                }
              >
                Manage Patients
              </button>

            </div>

          </section>

          {/* QUICK ACTIONS */}
          <section className="dashboard-card">

            <div className="card-heading">

              <h3>
                Quick Actions
              </h3>

            </div>

            <div className="quick-action-grid">

              <button
                className="quick-action green-action"
                onClick={() =>
                  (window.location.href =
                    "/admin/doctors")
                }
              >
                <span>👨‍⚕️</span>
                <small>
                  Manage Doctors
                </small>
              </button>

              <button
                className="quick-action blue-action"
                onClick={() =>
                  (window.location.href =
                    "/admin/patients")
                }
              >
                <span>👥</span>
                <small>
                  Manage Patients
                </small>
              </button>

              <button
                className="quick-action orange-action"
                onClick={() =>
                  (window.location.href =
                    "/admin/appointments")
                }
              >
                <span>📅</span>
                <small>
                  Appointments
                </small>
              </button>

              <button
                className="quick-action sky-action"
              >
                <span>📊</span>
                <small>
                  View Reports
                </small>
              </button>

            </div>

          </section>

          {/* RECENT ACTIVITY */}
          <section className="dashboard-card">

            <div className="card-heading">

              <h3>
                Recent Activity
              </h3>

            </div>

            <div className="activity-item">

              <div className="activity-icon">
                👨‍⚕️
              </div>

              <div>
                <strong>
                  New doctor registered
                </strong>

                <span>
                  Recently added to CareLink
                </span>
              </div>

            </div>

            <div className="activity-item">

              <div className="activity-icon">
                👥
              </div>

              <div>
                <strong>
                  New patient registered
                </strong>

                <span>
                  Patient account created
                </span>
              </div>

            </div>

            <div className="activity-item">

              <div className="activity-icon">
                📅
              </div>

              <div>
                <strong>
                  Appointment scheduled
                </strong>

                <span>
                  New appointment created
                </span>
              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;