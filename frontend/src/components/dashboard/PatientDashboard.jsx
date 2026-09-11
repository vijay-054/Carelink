import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");

  const handleNavigation = (label, path) => {
    setActivePage(label);

    if (path) {
      navigate(path);
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: "⌂",
      path: "/dashboard",
    },
    {
      label: "Find Doctors",
      icon: "♟",
      path: "/doctors",
    },
    {
      label: "Book Appointment",
      icon: "▣",
      path: "/appointments/book",
    },
    {
      label: "My Appointments",
      icon: "▣",
      path: "/appointments",
    },
    {
      label: "Health Records",
      icon: "▤",
      path: "/health-records",
    },
    {
      label: "Prescriptions",
      icon: "▧",
      path: "/prescriptions",
    },
    {
      label: "Messages",
      icon: "◯",
      path: "/messages",
    },
    {
      label: "Profile",
      icon: "♟",
      path: "/profile",
    },
    {
      label: "Settings",
      icon: "⚙",
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");

    navigate("/login");
  };

  return (
    <div className="care-dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="dashboard-sidebar">

        {/* LOGO */}

        <div className="dashboard-logo">
          <div className="logo-heart">+</div>

          <span>CareLink</span>
        </div>

        {/* NAVIGATION */}

        <nav className="dashboard-nav">

          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`dashboard-nav-item ${
                activePage === item.label ? "active" : ""
              }`}
              onClick={() =>
                handleNavigation(item.label, item.path)
              }
            >
              <span>{item.icon}</span>

              <span className="dashboard-nav-label">
                {item.label}
              </span>
            </button>
          ))}

        </nav>

        {/* LOGOUT */}

        <button
          type="button"
          className="dashboard-logout"
          onClick={handleLogout}
        >
          <span>↪</span>

          <span>Logout</span>
        </button>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* TOP BAR */}

        <header className="dashboard-topbar">

          <div className="dashboard-topbar-left">
            <span className="dashboard-topbar-title">
              Patient Portal
            </span>
          </div>

          <div className="dashboard-topbar-right">

            <button
              type="button"
              className="dashboard-notification"
              onClick={() => navigate("/messages")}
              title="Messages"
            >
              ♢
            </button>

            <button
              type="button"
              className="dashboard-profile-button"
              onClick={() => navigate("/profile")}
            >
              <div className="dashboard-profile-avatar">
                P
              </div>

              <div className="dashboard-profile-info">
                <strong>Patient</strong>
                <span>My Account</span>
              </div>
            </button>

          </div>

        </header>

        {/* CONTENT */}

        <section className="dashboard-content">

          {/* HEADING */}

          <div className="dashboard-heading">

            <div>
              <span className="page-eyebrow">
                CARELINK HEALTHCARE
              </span>

              <h1>Welcome back</h1>

              <p>
                Manage your healthcare appointments and records
                from one place.
              </p>
            </div>

          </div>

          {/* HERO */}

          <div className="patient-hero">

            <div className="patient-hero-content">

              <span className="patient-hero-eyebrow">
                YOUR HEALTH, SIMPLIFIED
              </span>

              <h2>
                Take control of your healthcare.
              </h2>

              <p>
                Find the right doctor, book appointments, and
                keep track of your healthcare journey with CareLink.
              </p>

              <div className="patient-hero-actions">

                <button
                  type="button"
                  className="patient-button"
                  onClick={() =>
                    handleNavigation(
                      "Find Doctors",
                      "/doctors"
                    )
                  }
                >
                  Find a Doctor
                  <span>→</span>
                </button>

                <button
                  type="button"
                  className="patient-secondary-button"
                  onClick={() =>
                    handleNavigation(
                      "My Appointments",
                      "/appointments"
                    )
                  }
                >
                  View Appointments
                </button>

              </div>

            </div>

            <div className="patient-hero-visual">

              <div className="hero-medical-circle">
                +
              </div>

              <div className="hero-floating-card">
                <span>✓</span>

                <div>
                  <strong>Care made simple</strong>
                  <small>Everything in one place</small>
                </div>
              </div>

            </div>

          </div>

          {/* QUICK STATS */}

          <div className="dashboard-stats">

            <div className="dashboard-stat">

              <div className="stat-icon blue">
                ♟
              </div>

              <div>
                <span>Doctors</span>
                <strong>Find Care</strong>
              </div>

            </div>

            <div className="dashboard-stat">

              <div className="stat-icon green">
                ✓
              </div>

              <div>
                <span>Appointments</span>
                <strong>Manage Visits</strong>
              </div>

            </div>

            <div className="dashboard-stat">

              <div className="stat-icon purple">
                ▤
              </div>

              <div>
                <span>Health Records</span>
                <strong>View Records</strong>
              </div>

            </div>

            <div className="dashboard-stat">

              <div className="stat-icon orange">
                ▧
              </div>

              <div>
                <span>Prescriptions</span>
                <strong>View Medicines</strong>
              </div>

            </div>

          </div>

          {/* QUICK ACTIONS */}

          <div className="dashboard-section-header">

            <div>
              <span className="section-eyebrow">
                QUICK ACCESS
              </span>

              <h2>What would you like to do?</h2>
            </div>

          </div>

          <div className="dashboard-quick-grid">

            <button
              type="button"
              className="dashboard-card quick-action-card"
              onClick={() =>
                handleNavigation(
                  "Find Doctors",
                  "/doctors"
                )
              }
            >
              <div className="quick-action-icon blue">
                ♟
              </div>

              <div>
                <h3>Find a Doctor</h3>

                <p>
                  Browse doctors and find the right
                  specialist for your needs.
                </p>
              </div>

              <span className="quick-arrow">
                →
              </span>
            </button>

            <button
              type="button"
              className="dashboard-card quick-action-card"
              onClick={() =>
                handleNavigation(
                  "Book Appointment",
                  "/appointments/book"
                )
              }
            >
              <div className="quick-action-icon green">
                +
              </div>

              <div>
                <h3>Book Appointment</h3>

                <p>
                  Schedule a consultation with a doctor
                  at a convenient time.
                </p>
              </div>

              <span className="quick-arrow">
                →
              </span>
            </button>

            <button
              type="button"
              className="dashboard-card quick-action-card"
              onClick={() =>
                handleNavigation(
                  "My Appointments",
                  "/appointments"
                )
              }
            >
              <div className="quick-action-icon purple">
                ▣
              </div>

              <div>
                <h3>My Appointments</h3>

                <p>
                  Check your upcoming and previous
                  appointments.
                </p>
              </div>

              <span className="quick-arrow">
                →
              </span>
            </button>

            <button
              type="button"
              className="dashboard-card quick-action-card"
              onClick={() =>
                handleNavigation(
                  "Health Records",
                  "/health-records"
                )
              }
            >
              <div className="quick-action-icon orange">
                ▤
              </div>

              <div>
                <h3>Health Records</h3>

                <p>
                  Access your medical records and
                  healthcare information.
                </p>
              </div>

              <span className="quick-arrow">
                →
              </span>
            </button>

          </div>

          {/* INFORMATION CARDS */}

          <div className="dashboard-bottom-grid">

            <div className="dashboard-card information-card">

              <div className="card-heading">

                <div>
                  <span className="section-eyebrow">
                    CARELINK
                  </span>

                  <h3>Your healthcare companion</h3>
                </div>

                <div className="card-heading-icon">
                  +
                </div>

              </div>

              <p>
                CareLink helps you stay connected with
                your healthcare providers and keep your
                important healthcare information organized.
              </p>

              <button
                type="button"
                className="text-action"
                onClick={() =>
                  handleNavigation(
                    "Find Doctors",
                    "/doctors"
                  )
                }
              >
                Explore CareLink
                <span>→</span>
              </button>

            </div>

            <div className="dashboard-card help-card">

              <div className="help-icon">
                ?
              </div>

              <div>
                <span className="section-eyebrow">
                  NEED HELP?
                </span>

                <h3>We're here for you</h3>

                <p>
                  Have questions about your appointments
                  or healthcare records?
                </p>

                <button
                  type="button"
                  className="text-action"
                  onClick={() =>
                    handleNavigation(
                      "Messages",
                      "/messages"
                    )
                  }
                >
                  Contact Support
                  <span>→</span>
                </button>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default PatientDashboard;