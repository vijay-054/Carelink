import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);

  const doctorName =
    user?.fullName ||
    user?.name ||
    "Doctor";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="doctor-dashboard">

      {/* Animated background */}
      <div className="doctor-bg-circle circle-one"></div>
      <div className="doctor-bg-circle circle-two"></div>
      <div className="doctor-bg-circle circle-three"></div>

      {/* Sidebar */}
      <aside className="doctor-sidebar">

        <div className="doctor-brand">
          <div className="brand-icon">+</div>

          <div>
            <h2>CareLink</h2>
            <span>Doctor Portal</span>
          </div>
        </div>

        <div className="doctor-profile">
          <div className="doctor-avatar">
            {doctorName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{doctorName}</strong>
            <span>Doctor</span>
          </div>
        </div>

        <nav className="doctor-nav">

          <button className="doctor-nav-item active">
            <span>▦</span>
            Dashboard
          </button>

          <button
            className="doctor-nav-item"
            onClick={() => alert("Appointments page coming next")}
          >
            <span>◷</span>
            Appointments
          </button>

          <button
            className="doctor-nav-item"
            onClick={() => alert("Patients page coming next")}
          >
            <span>♙</span>
            My Patients
          </button>

          <button
            className="doctor-nav-item"
            onClick={() => alert("Schedule page coming next")}
          >
            <span>▣</span>
            Schedule
          </button>

          <button
            className="doctor-nav-item"
            onClick={() => alert("Messages page coming next")}
          >
            <span>✉</span>
            Messages
          </button>

          <button
            className="doctor-nav-item"
            onClick={() => alert("Profile page coming next")}
          >
            <span>◉</span>
            Profile
          </button>

        </nav>

        <div className="doctor-sidebar-bottom">

          <div className="doctor-help">
            <strong>Need help?</strong>
            <p>
              Our support team is available 24/7.
            </p>

            <button
              onClick={() => alert("Support contacted")}
            >
              Contact Support
            </button>
          </div>

          <button
            className="doctor-logout"
            onClick={handleLogout}
          >
            ↪ &nbsp; Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="doctor-main">

        {/* Top bar */}
        <header className="doctor-header">

          <div>
            <span className="doctor-label">
              DOCTOR PORTAL
            </span>

            <h1>Dashboard</h1>

            <p>
              Manage your appointments, patients and schedule.
            </p>
          </div>

          <div className="header-user">

            <button
              className="notification-btn"
              onClick={() =>
                alert("No new notifications")
              }
            >
              🔔
            </button>

            <div className="header-avatar">
              {doctorName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{doctorName}</strong>
              <span>Doctor</span>
            </div>

          </div>

        </header>

        {/* Welcome Card */}
        <section className="doctor-welcome">

          <div className="welcome-content">

            <span className="welcome-tag">
              CARELINK HEALTHCARE
            </span>

            <h2>
              Good morning,{" "}
              <span>{doctorName}!</span>
            </h2>

            <p>
              Here's what's happening with your practice today.
              Stay connected with your patients and manage your
              appointments easily.
            </p>

            <div className="welcome-actions">

              <button
                className="primary-action"
                onClick={() =>
                  alert("Appointments will open here")
                }
              >
                View Appointments →
              </button>

              <button
                className="secondary-action"
                onClick={() =>
                  alert("Schedule management will open here")
                }
              >
                Manage Schedule
              </button>

            </div>

          </div>

          <div className="welcome-medical-icon">
            <div className="medical-circle">
              +
            </div>

            <div className="pulse-ring"></div>
          </div>

        </section>

        {/* Statistics */}
        <section className="doctor-stats">

          <div className="stat-card">

            <div className="stat-icon blue">
              ◷
            </div>

            <div>
              <span>Today's Appointments</span>
              <strong>0</strong>
              <small>Scheduled today</small>
            </div>

            <span className="stat-arrow">→</span>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>
              <span>Completed Visits</span>
              <strong>0</strong>
              <small>Completed consultations</small>
            </div>

            <span className="stat-arrow">→</span>

          </div>

          <div className="stat-card">

            <div className="stat-icon purple">
              ♙
            </div>

            <div>
              <span>Total Patients</span>
              <strong>0</strong>
              <small>Patients under care</small>
            </div>

            <span className="stat-arrow">→</span>

          </div>

          <div className="stat-card">

            <div className="stat-icon orange">
              ✉
            </div>

            <div>
              <span>Messages</span>
              <strong>0</strong>
              <small>Unread messages</small>
            </div>

            <span className="stat-arrow">→</span>

          </div>

        </section>

        {/* Quick Actions */}
        <section className="doctor-section">

          <div className="section-heading">

            <div>
              <span>SHORTCUTS</span>
              <h2>Quick Actions</h2>
              <p>
                Common tasks you can access quickly.
              </p>
            </div>

          </div>

          <div className="quick-actions">

            <button
              onClick={() =>
                alert("Appointments")
              }
            >
              <div className="quick-icon blue">
                ◷
              </div>

              <div>
                <strong>Appointments</strong>
                <span>
                  View today's appointments
                </span>
              </div>

              <b>→</b>
            </button>

            <button
              onClick={() =>
                alert("Patients")
              }
            >
              <div className="quick-icon green">
                ♙
              </div>

              <div>
                <strong>My Patients</strong>
                <span>
                  View your patient list
                </span>
              </div>

              <b>→</b>
            </button>

            <button
              onClick={() =>
                alert("Schedule")
              }
            >
              <div className="quick-icon purple">
                ▣
              </div>

              <div>
                <strong>My Schedule</strong>
                <span>
                  Manage available hours
                </span>
              </div>

              <b>→</b>
            </button>

            <button
              onClick={() =>
                alert("Messages")
              }
            >
              <div className="quick-icon orange">
                ✉
              </div>

              <div>
                <strong>Messages</strong>
                <span>
                  Communicate with patients
                </span>
              </div>

              <b>→</b>
            </button>

          </div>

        </section>

        {/* Today's Appointments */}
        <section className="doctor-section">

          <div className="section-heading appointment-heading">

            <div>
              <span>TODAY</span>
              <h2>Today's Appointments</h2>
              <p>
                Your upcoming consultations for today.
              </p>
            </div>

            <button
              onClick={() =>
                alert("All appointments")
              }
            >
              View all →
            </button>

          </div>

          <div className="empty-appointments">

            <div className="empty-icon">
              ◷
            </div>

            <h3>No appointments today</h3>

            <p>
              Your scheduled appointments will appear here.
            </p>

            <button
              onClick={() =>
                alert("Schedule management")
              }
            >
              Manage Schedule
            </button>

          </div>

        </section>

      </main>

    </div>
  );
};

export default DoctorDashboard;