import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/slices/authSlice";

import DomainChart from "./DomainChart";
import RecentActivity from "./RecentActivity";
import StatCards from "./StatsCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth || {}
  );

  const role = user?.role || "PATIENT";

  const isDoctor = role === "DOCTOR";

  const userName =
    user?.fullName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    (isDoctor ? "Doctor" : "Patient");

  const firstLetter =
    userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/");
  };


  /* =====================================================
     PATIENT DATA
  ===================================================== */

  const patientStats = [
    {
      label: "Appointments",
      value: "12",
      subLabel: "Total appointments",
      icon: "📅",
    },
    {
      label: "Upcoming",
      value: "3",
      subLabel: "Scheduled",
      icon: "◷",
    },
    {
      label: "Completed",
      value: "9",
      subLabel: "Completed",
      icon: "✓",
    },
    {
      label: "Doctors",
      value: "5",
      subLabel: "Consulted",
      icon: "👥",
    },
  ];

  const patientChart = [
    { label: "Mon", value: 2 },
    { label: "Tue", value: 4 },
    { label: "Wed", value: 3 },
    { label: "Thu", value: 6 },
    { label: "Fri", value: 3 },
    { label: "Sat", value: 4 },
  ];

  const patientActivities = [
    {
      title: "Appointment booked with Dr. Mehta",
      date: "Today, 10:30 AM",
      icon: "📅",
    },
    {
      title: "Profile updated",
      date: "Yesterday, 4:20 PM",
      icon: "✎",
    },
    {
      title: "Appointment completed",
      date: "Mar 25, 2025",
      icon: "✓",
    },
    {
      title: "Account created",
      date: "Mar 20, 2025",
      icon: "👤",
    },
  ];


  /* =====================================================
     DOCTOR DATA
  ===================================================== */

  const doctorStats = [
    {
      label: "Today's Appointments",
      value: "8",
      subLabel: "Scheduled for today",
      icon: "📅",
    },
    {
      label: "Consultations",
      value: "42",
      subLabel: "This month",
      icon: "🩺",
    },
    {
      label: "Available Slots",
      value: "12",
      subLabel: "This week",
      icon: "◷",
    },
    {
      label: "Patients",
      value: "156",
      subLabel: "Total patients",
      icon: "👥",
    },
  ];

  const doctorChart = [
    { label: "Mon", value: 5 },
    { label: "Tue", value: 7 },
    { label: "Wed", value: 4 },
    { label: "Thu", value: 8 },
    { label: "Fri", value: 6 },
    { label: "Sat", value: 4 },
  ];

  const doctorActivities = [
    {
      title: "New appointment scheduled",
      date: "Today, 11:00 AM",
      icon: "📅",
    },
    {
      title: "Consultation completed",
      date: "Today, 9:30 AM",
      icon: "✓",
    },
    {
      title: "Patient profile updated",
      date: "Yesterday, 5:15 PM",
      icon: "✎",
    },
    {
      title: "Doctor profile viewed",
      date: "Mar 24, 2025",
      icon: "👤",
    },
  ];


  /* =====================================================
     PATIENT DASHBOARD
  ===================================================== */

  if (!isDoctor) {
    return (
      <div className="carelink-dashboard patient-dashboard">

        {/* ================= SIDEBAR ================= */}

        <aside className="dashboard-sidebar">

          <div className="sidebar-logo">
            <div className="logo-heart">
              ♥
            </div>

            <span>
              CareLink
            </span>
          </div>


          <nav className="sidebar-navigation">

            <Link
              to="/dashboard"
              className="sidebar-link active"
            >
              <span className="sidebar-icon">
                ▦
              </span>

              Dashboard
            </Link>


            <Link
              to="/doctor-list"
              className="sidebar-link"
            >
              <span className="sidebar-icon">
                ♙
              </span>

              Find a Doctor
            </Link>


            <Link
              to="/appointments"
              className="sidebar-link"
            >
              <span className="sidebar-icon">
                ▣
              </span>

              My Appointments
            </Link>


            <div className="sidebar-link">
              <span className="sidebar-icon">
                ♡
              </span>

              Health Profile
            </div>


            <div className="sidebar-link">
              <span className="sidebar-icon">
                ▢
              </span>

              Messages
            </div>


            <div className="sidebar-link">
              <span className="sidebar-icon">
                ⚙
              </span>

              Settings
            </div>

          </nav>


          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <span>
              ⇥
            </span>

            Logout
          </button>

        </aside>


        {/* ================= MAIN ================= */}

        <main className="dashboard-main">

          {/* TOP BAR */}

          <header className="dashboard-topbar">

            <div className="dashboard-search">
              <span>
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search doctors, specialties..."
              />
            </div>


            <div className="topbar-right">

              <button className="notification-button">
                ♧
                <span className="notification-dot"></span>
              </button>


              <div className="topbar-profile">

                <div className="topbar-avatar patient-avatar">
                  {firstLetter}
                </div>

                <div className="topbar-user">

                  <strong>
                    {userName}
                  </strong>

                  <span>
                    Patient
                  </span>

                </div>

                <span className="profile-arrow">
                 ⌄
                </span>

              </div>

            </div>

          </header>


          {/* CONTENT */}

          <div className="dashboard-content">

            {/* WELCOME */}

            <section className="welcome-banner">

              <div className="welcome-content">

                <span className="welcome-label">
                  PATIENT DASHBOARD
                </span>

                <h1>
                  Welcome, {userName} 👋
                </h1>

                <p>
                  Manage your appointments and healthcare
                  activities from one place.
                </p>

              </div>


              <div className="patient-illustration">
                <div className="person-head">
                  <div className="person-hair"></div>
                  <div className="person-face"></div>
                </div>

                <div className="person-body"></div>
              </div>

            </section>


            {/* STATS */}

            <section className="dashboard-stat-wrapper">

              <StatCards
                stats={patientStats}
              />

            </section>


            {/* QUICK ACTIONS */}

            <section className="quick-actions-section">

              <div className="dashboard-section-heading">

                <span>
                  QUICK ACTIONS
                </span>

                <h2>
                  Manage Your Healthcare
                </h2>

              </div>


              <div className="action-card-grid">

                <Link
                  to="/doctor-list"
                  className="action-card"
                >

                  <div className="action-card-icon blue">
                    ♧
                  </div>

                  <div className="action-card-content">

                    <h3>
                      Find a Doctor
                    </h3>

                    <p>
                      Browse doctors and find the
                      right specialist for you.
                    </p>

                  </div>

                  <span className="action-card-arrow">
                    ›
                  </span>

                </Link>


                <Link
                  to="/appointments"
                  className="action-card"
                >

                  <div className="action-card-icon blue">
                    ▣
                  </div>

                  <div className="action-card-content">

                    <h3>
                      My Appointments
                    </h3>

                    <p>
                      View and manage your
                      appointments.
                    </p>

                  </div>

                  <span className="action-card-arrow">
                    ›
                  </span>

                </Link>


                <Link
                  to="/doctor-list"
                  className="action-card"
                >

                  <div className="action-card-icon blue">
                    +
                  </div>

                  <div className="action-card-content">

                    <h3>
                      Book Appointment
                    </h3>

                    <p>
                      Schedule a consultation
                      with a doctor.
                    </p>

                  </div>

                  <span className="action-card-arrow">
                    ›
                  </span>

                </Link>


                <div className="action-card">

                  <div className="action-card-icon pink">
                    ♥
                  </div>

                  <div className="action-card-content">

                    <h3>
                      Health Profile
                    </h3>

                    <p>
                      View your personal healthcare
                      information.
                    </p>

                  </div>

                  <span className="action-card-arrow">
                    ›
                  </span>

                </div>

              </div>

            </section>


            {/* BOTTOM */}

            <section className="dashboard-bottom">

              <DomainChart
                data={patientChart}
                title="Appointment Activity"
              />

              <RecentActivity
                activities={patientActivities}
              />

            </section>

          </div>

        </main>

      </div>
    );
  }


  /* =====================================================
     DOCTOR DASHBOARD
  ===================================================== */

  return (
    <div className="carelink-dashboard doctor-dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="dashboard-sidebar">

        <div className="sidebar-logo">
          <div className="logo-heart doctor-logo">
            ♥
          </div>

          <span>
            CareLink
          </span>
        </div>


        <nav className="sidebar-navigation">

          <Link
            to="/dashboard"
            className="sidebar-link active doctor-active"
          >
            <span className="sidebar-icon">
              ▦
            </span>

            Dashboard
          </Link>


          <Link
            to="/schedule"
            className="sidebar-link"
          >
            <span className="sidebar-icon">
              ▣
            </span>

            My Schedule
          </Link>


          <Link
            to="/consultations"
            className="sidebar-link"
          >
            <span className="sidebar-icon">
              ♧
            </span>

            Consultations
          </Link>


          <div className="sidebar-link">

            <span className="sidebar-icon">
              👥
            </span>

            My Patients

          </div>


          <div className="sidebar-link">

            <span className="sidebar-icon">
              ♙
            </span>

            Profile

          </div>


          <div className="sidebar-link">

            <span className="sidebar-icon">
              ▢
            </span>

            Messages

          </div>


          <div className="sidebar-link">

            <span className="sidebar-icon">
              ⚙
            </span>

            Settings

          </div>

        </nav>


        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >

          <span>
            ⇥
          </span>

          Logout

        </button>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* TOPBAR */}

        <header className="dashboard-topbar">

          <div className="dashboard-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search patients, appointments..."
            />

          </div>


          <div className="topbar-right">

            <button className="notification-button">
              ♧
              <span className="notification-dot"></span>
            </button>


            <div className="topbar-profile">

              <div className="topbar-avatar doctor-top-avatar">
                {firstLetter}
              </div>

              <div className="topbar-user">

                <strong>
                  Dr. {userName}
                </strong>

                <span>
                  Doctor
                </span>

              </div>

              <span className="profile-arrow">
               ⌄
              </span>

            </div>

          </div>

        </header>


        {/* CONTENT */}

        <div className="dashboard-content">

          {/* WELCOME */}

          <section className="welcome-banner doctor-welcome">

            <div className="welcome-content">

              <span className="welcome-label doctor-label">
                DOCTOR DASHBOARD
              </span>

              <h1>
                Welcome, Dr. {userName} 👋
              </h1>

              <p>
                Manage your schedule, consultations
                and patients from one place.
              </p>

            </div>


            <div className="doctor-illustration">

              <div className="doctor-head">
                <div className="doctor-hair"></div>
                <div className="doctor-face"></div>
              </div>

              <div className="doctor-body">
                <div className="doctor-coat"></div>
                <div className="doctor-stethoscope">
                  ♡
                </div>
              </div>

            </div>

          </section>


          {/* STATS */}

          <section className="dashboard-stat-wrapper doctor-stat-wrapper">

            <StatCards
              stats={doctorStats}
            />

          </section>


          {/* SERVICES */}

          <section className="quick-actions-section">

            <div className="dashboard-section-heading">

              <span className="doctor-heading">
                DOCTOR SERVICES
              </span>

              <h2>
                Manage Your Practice
              </h2>

            </div>


            <div className="action-card-grid">

              <Link
                to="/schedule"
                className="action-card doctor-card"
              >

                <div className="action-card-icon green">
                  ▣
                </div>

                <div className="action-card-content">

                  <h3>
                    My Schedule
                  </h3>

                  <p>
                    View and manage your
                    available slots.
                  </p>

                </div>

                <span className="action-card-arrow green-arrow">
                  ›
                </span>

              </Link>


              <Link
                to="/consultations"
                className="action-card doctor-card"
              >

                <div className="action-card-icon green">
                  ♧
                </div>

                <div className="action-card-content">

                  <h3>
                    Consultations
                  </h3>

                  <p>
                    View your patient consultations
                    and appointment details.
                  </p>

                </div>

                <span className="action-card-arrow green-arrow">
                  ›
                </span>

              </Link>


              <div className="action-card doctor-card">

                <div className="action-card-icon green">
                  👥
                </div>

                <div className="action-card-content">

                  <h3>
                    My Patients
                  </h3>

                  <p>
                    View patients associated with
                    your consultations.
                  </p>

                </div>

                <span className="action-card-arrow green-arrow">
                  ›
                </span>

              </div>


              <div className="action-card doctor-card">

                <div className="action-card-icon green">
                  ♙
                </div>

                <div className="action-card-content">

                  <h3>
                    Doctor Profile
                  </h3>

                  <p>
                    View your specialization,
                    experience and profile.
                  </p>

                </div>

                <span className="action-card-arrow green-arrow">
                  ›
                </span>

              </div>

            </div>

          </section>


          {/* BOTTOM */}

          <section className="dashboard-bottom">

            <DomainChart
              data={doctorChart}
              title="Weekly Consultation Activity"
            />

            <RecentActivity
              activities={doctorActivities}
            />

          </section>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;