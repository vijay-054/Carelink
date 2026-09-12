import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth || {});

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  const doctorName =
    user?.fullName ||
    user?.name ||
    "Doctor";

  const doctorEmail =
    user?.email ||
    "doctor@carelink.com";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "⌂",
      action: () => setActiveMenu("Dashboard"),
    },
    {
      name: "Appointments",
      icon: "▣",
      action: () => setActiveMenu("Appointments"),
    },
    {
      name: "Patients",
      icon: "♙",
      action: () => setActiveMenu("Patients"),
    },
    {
      name: "Schedule",
      icon: "◷",
      action: () => setActiveMenu("Schedule"),
    },
    {
      name: "Messages",
      icon: "✉",
      action: () => setActiveMenu("Messages"),
    },
    {
      name: "Profile",
      icon: "◯",
      action: () => setActiveMenu("Profile"),
    },
  ];

  const stats = [
    {
      title: "Today's Appointments",
      value: "8",
      description: "Scheduled for today",
      icon: "▣",
      className: "blue",
    },
    {
      title: "Total Patients",
      value: "124",
      description: "Active patients",
      icon: "♙",
      className: "green",
    },
    {
      title: "Pending Requests",
      value: "5",
      description: "Need your attention",
      icon: "!",
      className: "orange",
    },
    {
      title: "Completed Visits",
      value: "86",
      description: "This month",
      icon: "✓",
      className: "purple",
    },
  ];

  const appointments = [
    {
      time: "09:00 AM",
      patient: "Arun Kumar",
      type: "General Consultation",
      status: "Confirmed",
    },
    {
      time: "10:30 AM",
      patient: "Priya Sharma",
      type: "Follow-up Visit",
      status: "Confirmed",
    },
    {
      time: "12:00 PM",
      patient: "Rahul Raj",
      type: "Health Checkup",
      status: "Pending",
    },
    {
      time: "03:00 PM",
      patient: "Ananya S",
      type: "Consultation",
      status: "Confirmed",
    },
  ];

  return (
    <div className="doctor-dashboard">

      {/* Animated background */}
      <div className="background-shape shape-one"></div>
      <div className="background-shape shape-two"></div>
      <div className="background-shape shape-three"></div>

      {/* ================= SIDEBAR ================= */}

      <aside className="doctor-sidebar">

        <div className="doctor-brand">
          <div className="doctor-logo">+</div>

          <div>
            <div className="brand-name">CareLink</div>
            <div className="brand-subtitle">
              Healthcare Portal
            </div>
          </div>
        </div>

        <div className="doctor-profile-mini">

          <div className="doctor-avatar">
            {doctorName.charAt(0).toUpperCase()}
          </div>

          <div className="mini-info">
            <strong>Dr. {doctorName}</strong>
            <span>Doctor</span>
          </div>

        </div>

        <nav className="doctor-navigation">

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activeMenu === item.name
                  ? "doctor-nav-item active"
                  : "doctor-nav-item"
              }
              onClick={item.action}
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </button>
          ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="support-box">
            <div className="support-title">
              Need help?
            </div>

            <div className="support-text">
              Our support team is available 24/7.
            </div>

            <button
              onClick={() => alert("CareLink Support: support@carelink.com")}
            >
              Contact Support
            </button>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="doctor-main">

        {/* HEADER */}

        <header className="doctor-header">

          <div>
            <div className="breadcrumb">
              DOCTOR PORTAL
              <span>/</span>
              {activeMenu}
            </div>

            <h1>{activeMenu}</h1>

            <p>
              Manage your patients and healthcare appointments.
            </p>
          </div>

          <div className="header-actions">

            <button
              className="notification-button"
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
            >
              ♢
              <span className="notification-dot"></span>
            </button>

            {showNotifications && (
              <div className="notification-panel">
                <strong>Notifications</strong>

                <p>
                  You have 5 pending appointment requests.
                </p>

                <p>
                  Today's first appointment is at 09:00 AM.
                </p>
              </div>
            )}

            <div className="header-user">

              <div className="header-avatar">
                {doctorName.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>Dr. {doctorName}</strong>
                <span>{doctorEmail}</span>
              </div>

            </div>

          </div>

        </header>

        {/* ================= DASHBOARD ================= */}

        {activeMenu === "Dashboard" && (
          <>

            {/* WELCOME CARD */}

            <section className="doctor-welcome">

              <div className="welcome-content">

                <span className="welcome-label">
                  CARELINK DOCTOR PORTAL
                </span>

                <h2>
                  Good morning, Dr. {doctorName}! 👋
                </h2>

                <p>
                  Stay on top of your appointments,
                  patients and daily healthcare activities.
                </p>

                <div className="welcome-buttons">

                  <button
                    className="primary-button"
                    onClick={() =>
                      setActiveMenu("Appointments")
                    }
                  >
                    View Appointments →
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() =>
                      setActiveMenu("Schedule")
                    }
                  >
                    Manage Schedule
                  </button>

                </div>

              </div>

              <div className="welcome-illustration">

                <div className="pulse-circle">
                  +
                </div>

                <div className="pulse-ring ring-one"></div>
                <div className="pulse-ring ring-two"></div>

              </div>

            </section>

            {/* STATS */}

            <section className="stats-grid">

              {stats.map((stat) => (
                <div
                  className="doctor-stat-card"
                  key={stat.title}
                >

                  <div
                    className={`stat-icon ${stat.className}`}
                  >
                    {stat.icon}
                  </div>

                  <div className="stat-information">

                    <span>{stat.title}</span>

                    <strong>{stat.value}</strong>

                    <small>
                      {stat.description}
                    </small>

                  </div>

                  <span className="stat-arrow">
                    →
                  </span>

                </div>
              ))}

            </section>

            {/* CONTENT GRID */}

            <section className="dashboard-content">

              {/* APPOINTMENTS */}

              <div className="content-card appointments-card">

                <div className="card-header">

                  <div>
                    <span className="section-label">
                      TODAY
                    </span>

                    <h3>
                      Upcoming Appointments
                    </h3>
                  </div>

                  <button
                    className="view-all"
                    onClick={() =>
                      setActiveMenu("Appointments")
                    }
                  >
                    View all →
                  </button>

                </div>

                <div className="appointment-list">

                  {appointments.map(
                    (appointment, index) => (
                      <div
                        className="appointment-item"
                        key={index}
                      >

                        <div className="appointment-time">
                          {appointment.time}
                        </div>

                        <div className="appointment-avatar">
                          {appointment.patient.charAt(0)}
                        </div>

                        <div className="appointment-details">

                          <strong>
                            {appointment.patient}
                          </strong>

                          <span>
                            {appointment.type}
                          </span>

                        </div>

                        <span
                          className={
                            appointment.status ===
                            "Confirmed"
                              ? "status confirmed"
                              : "status pending"
                          }
                        >
                          {appointment.status}
                        </span>

                        <button
                          className="appointment-action"
                          onClick={() =>
                            alert(
                              `Appointment with ${appointment.patient}`
                            )
                          }
                        >
                          →
                        </button>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* RIGHT CARD */}

              <div className="content-card availability-card">

                <div className="card-header">

                  <div>
                    <span className="section-label">
                      YOUR STATUS
                    </span>

                    <h3>
                      Availability
                    </h3>
                  </div>

                </div>

                <div className="availability-status">

                  <div className="online-indicator"></div>

                  <div>
                    <strong>
                      Available for appointments
                    </strong>

                    <span>
                      Patients can book your available slots.
                    </span>
                  </div>

                </div>

                <div className="availability-info">

                  <div>
                    <span>Today's hours</span>
                    <strong>09:00 AM - 05:00 PM</strong>
                  </div>

                  <div>
                    <span>Next appointment</span>
                    <strong>09:00 AM</strong>
                  </div>

                </div>

                <button
                  className="schedule-button"
                  onClick={() =>
                    setActiveMenu("Schedule")
                  }
                >
                  Manage Schedule →
                </button>

              </div>

            </section>

            {/* QUICK ACTIONS */}

            <section className="quick-section">

              <div className="section-heading">

                <div>
                  <span>SHORTCUTS</span>
                  <h3>Quick Actions</h3>
                </div>

                <p>
                  Frequently used doctor tools
                </p>

              </div>

              <div className="quick-grid">

                <button
                  onClick={() =>
                    setActiveMenu("Appointments")
                  }
                >
                  <span className="quick-icon blue-bg">
                    ▣
                  </span>

                  <div>
                    <strong>
                      Appointments
                    </strong>

                    <small>
                      Manage today's visits
                    </small>
                  </div>

                  <span>→</span>
                </button>

                <button
                  onClick={() =>
                    setActiveMenu("Patients")
                  }
                >
                  <span className="quick-icon green-bg">
                    ♙
                  </span>

                  <div>
                    <strong>
                      My Patients
                    </strong>

                    <small>
                      View patient records
                    </small>
                  </div>

                  <span>→</span>
                </button>

                <button
                  onClick={() =>
                    setActiveMenu("Schedule")
                  }
                >
                  <span className="quick-icon purple-bg">
                    ◷
                  </span>

                  <div>
                    <strong>
                      Schedule
                    </strong>

                    <small>
                      Manage availability
                    </small>
                  </div>

                  <span>→</span>
                </button>

                <button
                  onClick={() =>
                    setActiveMenu("Messages")
                  }
                >
                  <span className="quick-icon orange-bg">
                    ✉
                  </span>

                  <div>
                    <strong>
                      Messages
                    </strong>

                    <small>
                      Patient conversations
                    </small>
                  </div>

                  <span>→</span>
                </button>

              </div>

            </section>

          </>
        )}

        {/* ================= APPOINTMENTS ================= */}

        {activeMenu === "Appointments" && (
          <section className="page-section">

            <div className="page-title-card">
              <span className="section-label">
                DOCTOR PORTAL
              </span>

              <h2>Appointments</h2>

              <p>
                Manage your upcoming and previous appointments.
              </p>
            </div>

            <div className="large-list-card">

              {appointments.map(
                (appointment, index) => (
                  <div
                    className="large-list-item"
                    key={index}
                  >

                    <div className="list-time">
                      {appointment.time}
                    </div>

                    <div className="appointment-avatar">
                      {appointment.patient.charAt(0)}
                    </div>

                    <div className="list-main">
                      <strong>
                        {appointment.patient}
                      </strong>

                      <span>
                        {appointment.type}
                      </span>
                    </div>

                    <span
                      className={
                        appointment.status ===
                        "Confirmed"
                          ? "status confirmed"
                          : "status pending"
                      }
                    >
                      {appointment.status}
                    </span>

                    <button
                      className="small-action"
                      onClick={() =>
                        alert(
                          `Opening ${appointment.patient}'s appointment`
                        )
                      }
                    >
                      Open
                    </button>

                  </div>
                )
              )}

            </div>

          </section>
        )}

        {/* ================= PATIENTS ================= */}

        {activeMenu === "Patients" && (
          <section className="page-section">

            <div className="page-title-card">
              <span className="section-label">
                DOCTOR PORTAL
              </span>

              <h2>My Patients</h2>

              <p>
                View and manage your patients.
              </p>
            </div>

            <div className="patient-grid">

              {[
                "Arun Kumar",
                "Priya Sharma",
                "Rahul Raj",
                "Ananya S",
                "Karthik M",
                "Divya R",
              ].map((patient) => (
                <div
                  className="patient-card"
                  key={patient}
                >

                  <div className="patient-avatar">
                    {patient.charAt(0)}
                  </div>

                  <div>
                    <strong>{patient}</strong>

                    <span>
                      Active Patient
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      alert(
                        `Patient profile: ${patient}`
                      )
                    }
                  >
                    View →
                  </button>

                </div>
              ))}

            </div>

          </section>
        )}

        {/* ================= SCHEDULE ================= */}

        {activeMenu === "Schedule" && (
          <section className="page-section">

            <div className="page-title-card">
              <span className="section-label">
                DOCTOR PORTAL
              </span>

              <h2>My Schedule</h2>

              <p>
                Manage your working hours and appointment availability.
              </p>
            </div>

            <div className="schedule-card">

              <div className="schedule-row">
                <strong>Monday</strong>
                <span>09:00 AM - 05:00 PM</span>
                <b>Available</b>
              </div>

              <div className="schedule-row">
                <strong>Tuesday</strong>
                <span>09:00 AM - 05:00 PM</span>
                <b>Available</b>
              </div>

              <div className="schedule-row">
                <strong>Wednesday</strong>
                <span>09:00 AM - 05:00 PM</span>
                <b>Available</b>
              </div>

              <div className="schedule-row">
                <strong>Thursday</strong>
                <span>09:00 AM - 05:00 PM</span>
                <b>Available</b>
              </div>

              <div className="schedule-row">
                <strong>Friday</strong>
                <span>09:00 AM - 05:00 PM</span>
                <b>Available</b>
              </div>

            </div>

          </section>
        )}

        {/* ================= MESSAGES ================= */}

        {activeMenu === "Messages" && (
          <section className="page-section">

            <div className="page-title-card">
              <span className="section-label">
                COMMUNICATION
              </span>

              <h2>Messages</h2>

              <p>
                Communicate securely with your patients.
              </p>
            </div>

            <div className="empty-state">

              <div className="empty-icon">
                ✉
              </div>

              <h3>
                No new messages
              </h3>

              <p>
                Your patient conversations will appear here.
              </p>

            </div>

          </section>
        )}

        {/* ================= PROFILE ================= */}

        {activeMenu === "Profile" && (
          <section className="page-section">

            <div className="page-title-card">
              <span className="section-label">
                ACCOUNT
              </span>

              <h2>Doctor Profile</h2>

              <p>
                Manage your CareLink account information.
              </p>
            </div>

            <div className="profile-card">

              <div className="profile-large-avatar">
                {doctorName.charAt(0).toUpperCase()}
              </div>

              <div className="profile-information">

                <h3>
                  Dr. {doctorName}
                </h3>

                <p>
                  {doctorEmail}
                </p>

                <span>
                  DOCTOR
                </span>

              </div>

            </div>

          </section>
        )}

      </main>

      {/* ================= STYLES ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .doctor-dashboard {
          min-height: 100vh;
          display: flex;
          background: #f4f9fc;
          color: #17324d;
          font-family: Arial, Helvetica, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* ANIMATED BACKGROUND */

        .background-shape {
          position: fixed;
          border: 1px solid rgba(16, 155, 211, 0.12);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          animation: floatingShape 10s ease-in-out infinite;
        }

        .shape-one {
          width: 420px;
          height: 420px;
          top: -180px;
          right: -100px;
        }

        .shape-two {
          width: 300px;
          height: 300px;
          bottom: -150px;
          left: 220px;
          animation-delay: 2s;
        }

        .shape-three {
          width: 180px;
          height: 180px;
          top: 40%;
          right: 30%;
          animation-delay: 4s;
        }

        @keyframes floatingShape {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }

          50% {
            transform: translate(20px, -18px) rotate(8deg);
          }
        }

        /* SIDEBAR */

        .doctor-sidebar {
          width: 245px;
          min-height: 100vh;
          background: rgba(255, 255, 255, 0.95);
          border-right: 1px solid #e1edf4;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 20;
        }

        .doctor-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 28px;
          padding-left: 7px;
        }

        .doctor-logo {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: linear-gradient(135deg, #08a5e5, #087fc0);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          font-weight: bold;
          box-shadow: 0 8px 20px rgba(8, 143, 202, .2);
        }

        .brand-name {
          font-size: 20px;
          font-weight: 800;
          color: #123451;
        }

        .brand-subtitle {
          font-size: 9px;
          color: #7a93a7;
          margin-top: 2px;
        }

        .doctor-profile-mini {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          background: #f4f9fc;
          border: 1px solid #e3edf3;
          border-radius: 13px;
          margin-bottom: 25px;
        }

        .doctor-avatar,
        .header-avatar {
          background: linear-gradient(135deg, #12a9df, #087dbd);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .doctor-avatar {
          width: 37px;
          height: 37px;
          border-radius: 50%;
        }

        .mini-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .mini-info strong {
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mini-info span {
          color: #7d96a9;
          font-size: 10px;
          margin-top: 3px;
        }

        .doctor-navigation {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .doctor-nav-item {
          width: 100%;
          border: 0;
          background: transparent;
          padding: 12px 13px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #597188;
          cursor: pointer;
          text-align: left;
          font-size: 13px;
          transition: .2s ease;
        }

        .doctor-nav-item:hover {
          background: #eff9fd;
          color: #058dc8;
          transform: translateX(3px);
        }

        .doctor-nav-item.active {
          background: linear-gradient(90deg, #dff6ff, #eefaff);
          color: #058dcc;
          font-weight: 700;
        }

        .nav-icon {
          width: 22px;
          text-align: center;
          font-size: 16px;
        }

        .sidebar-bottom {
          margin-top: auto;
        }

        .support-box {
          background: #eff9fd;
          border-radius: 13px;
          padding: 14px;
          margin-bottom: 14px;
        }

        .support-title {
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .support-text {
          font-size: 9px;
          color: #73899a;
          line-height: 1.5;
          margin-bottom: 8px;
        }

        .support-box button {
          border: 0;
          background: transparent;
          color: #008bc6;
          padding: 0;
          font-size: 10px;
          cursor: pointer;
          font-weight: 700;
        }

        .logout-button {
          width: 100%;
          border: 0;
          background: transparent;
          color: #71879a;
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          font-size: 12px;
          border-radius: 9px;
        }

        .logout-button:hover {
          background: #fff1f1;
          color: #e55353;
        }

        /* MAIN */

        .doctor-main {
          margin-left: 245px;
          width: calc(100% - 245px);
          min-height: 100vh;
          padding: 0 35px 50px;
          position: relative;
          z-index: 2;
        }

        .doctor-header {
          min-height: 86px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e4edf2;
          position: relative;
        }

        .breadcrumb {
          font-size: 9px;
          color: #7790a4;
          font-weight: 700;
          letter-spacing: .4px;
        }

        .breadcrumb span {
          margin: 0 8px;
        }

        .doctor-header h1 {
          font-size: 19px;
          margin: 5px 0 3px;
        }

        .doctor-header p {
          font-size: 10px;
          color: #7b91a3;
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }

        .notification-button {
          width: 37px;
          height: 37px;
          border: 1px solid #dfebf1;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          font-size: 16px;
          color: #527086;
        }

        .notification-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff7b35;
          top: 8px;
          right: 8px;
        }

        .notification-panel {
          position: absolute;
          right: 130px;
          top: 52px;
          width: 260px;
          background: white;
          padding: 18px;
          border-radius: 13px;
          box-shadow: 0 15px 40px rgba(30, 70, 100, .15);
          border: 1px solid #e2edf3;
          z-index: 50;
          font-size: 11px;
        }

        .notification-panel p {
          font-size: 10px;
          line-height: 1.5;
          margin-top: 12px;
        }

        .header-user {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .header-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 13px;
        }

        .header-user div:last-child {
          display: flex;
          flex-direction: column;
        }

        .header-user strong {
          font-size: 11px;
        }

        .header-user span {
          color: #8296a7;
          font-size: 9px;
          margin-top: 3px;
        }

        /* WELCOME */

        .doctor-welcome {
          margin-top: 30px;
          border-radius: 21px;
          min-height: 235px;
          padding: 35px 40px;
          background: linear-gradient(110deg, #e8f8ff, #f7fcff);
          border: 1px solid #dceef5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .doctor-welcome:after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(11, 157, 214, .12);
          border-radius: 50%;
          right: -100px;
          top: -80px;
          animation: rotateCircle 15s linear infinite;
        }

        @keyframes rotateCircle {
          to {
            transform: rotate(360deg);
          }
        }

        .welcome-content {
          position: relative;
          z-index: 3;
          max-width: 600px;
        }

        .welcome-label,
        .section-label {
          color: #0b9bda;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .7px;
        }

        .welcome-content h2 {
          font-size: 27px;
          margin: 10px 0 9px;
        }

        .welcome-content p {
          font-size: 11px;
          color: #698398;
          line-height: 1.7;
          max-width: 570px;
        }

        .welcome-buttons {
          display: flex;
          gap: 10px;
          margin-top: 22px;
        }

        .primary-button,
        .secondary-button {
          border-radius: 8px;
          padding: 11px 17px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          transition: .2s;
        }

        .primary-button {
          background: #078fcb;
          color: white;
          border: 1px solid #078fcb;
          box-shadow: 0 8px 20px rgba(7, 143, 203, .18);
        }

        .primary-button:hover {
          transform: translateY(-2px);
        }

        .secondary-button {
          background: white;
          color: #42617a;
          border: 1px solid #d9e8ef;
        }

        .secondary-button:hover {
          border-color: #0a9bd8;
          color: #078fcb;
        }

        .welcome-illustration {
          width: 210px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-right: 35px;
        }

        .pulse-circle {
          width: 95px;
          height: 95px;
          border-radius: 50%;
          background: white;
          color: #0795d0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 55px;
          font-weight: 300;
          box-shadow: 0 10px 35px rgba(7, 143, 203, .15);
          z-index: 3;
          animation: pulse 2.8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }
        }

        .pulse-ring {
          position: absolute;
          border: 1px solid rgba(8, 157, 215, .2);
          border-radius: 50%;
          animation: ringPulse 3s ease-in-out infinite;
        }

        .ring-one {
          width: 140px;
          height: 140px;
        }

        .ring-two {
          width: 190px;
          height: 190px;
          animation-delay: 1s;
        }

        @keyframes ringPulse {
          0%, 100% {
            opacity: .35;
            transform: scale(.95);
          }

          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* STATS */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-top: 18px;
        }

        .doctor-stat-card {
          background: white;
          border: 1px solid #e1ebf1;
          border-radius: 15px;
          padding: 17px;
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 105px;
          transition: .2s;
          position: relative;
        }

        .doctor-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 13px 30px rgba(30, 75, 105, .08);
        }

        .stat-icon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
        }

        .stat-icon.blue {
          background: #e4f6fd;
          color: #079bd8;
        }

        .stat-icon.green {
          background: #e5f9ee;
          color: #19a766;
        }

        .stat-icon.orange {
          background: #fff2e4;
          color: #ef8a26;
        }

        .stat-icon.purple {
          background: #f1eaff;
          color: #8c5ce6;
        }

        .stat-information {
          display: flex;
          flex-direction: column;
        }

        .stat-information span {
          color: #7790a2;
          font-size: 9px;
        }

        .stat-information strong {
          font-size: 21px;
          margin: 4px 0;
        }

        .stat-information small {
          color: #9aaab6;
          font-size: 8px;
        }

        .stat-arrow {
          margin-left: auto;
          color: #7a94a6;
          font-size: 13px;
        }

        /* CONTENT */

        .dashboard-content {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 16px;
          margin-top: 18px;
        }

        .content-card,
        .large-list-card,
        .schedule-card,
        .profile-card {
          background: white;
          border: 1px solid #e1ebf1;
          border-radius: 16px;
          padding: 20px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .card-header h3 {
          margin: 5px 0 0;
          font-size: 15px;
        }

        .view-all {
          border: 0;
          background: transparent;
          color: #078fcb;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        .appointment-list {
          display: flex;
          flex-direction: column;
        }

        .appointment-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 0;
          border-top: 1px solid #edf2f5;
        }

        .appointment-time {
          width: 67px;
          color: #607b90;
          font-size: 9px;
          font-weight: 700;
        }

        .appointment-avatar {
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #e7f7fc;
          color: #078fc8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 12px;
        }

        .appointment-details {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .appointment-details strong {
          font-size: 10px;
        }

        .appointment-details span {
          font-size: 8px;
          color: #91a1ae;
          margin-top: 3px;
        }

        .status {
          padding: 5px 8px;
          border-radius: 20px;
          font-size: 8px;
          font-weight: 700;
        }

        .status.confirmed {
          background: #e7f8ef;
          color: #15955a;
        }

        .status.pending {
          background: #fff2df;
          color: #d98219;
        }

        .appointment-action {
          border: 0;
          background: #f2f8fb;
          width: 25px;
          height: 25px;
          border-radius: 7px;
          cursor: pointer;
          color: #078fcb;
        }

        /* AVAILABILITY */

        .availability-status {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px;
          background: #effbf5;
          border-radius: 11px;
          margin-bottom: 15px;
        }

        .online-indicator {
          width: 9px;
          height: 9px;
          background: #21b66d;
          border-radius: 50%;
          box-shadow: 0 0 0 5px rgba(33, 182, 109, .1);
        }

        .availability-status div:last-child {
          display: flex;
          flex-direction: column;
        }

        .availability-status strong {
          font-size: 10px;
        }

        .availability-status span {
          font-size: 8px;
          color: #769080;
          margin-top: 4px;
        }

        .availability-info {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .availability-info div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 9px;
        }

        .availability-info span {
          color: #8397a6;
        }

        .availability-info strong {
          font-size: 9px;
        }

        .schedule-button {
          width: 100%;
          border: 1px solid #dbe9ef;
          background: #f8fcfe;
          color: #078fcb;
          padding: 10px;
          border-radius: 8px;
          margin-top: 17px;
          cursor: pointer;
          font-size: 9px;
          font-weight: 700;
        }

        /* QUICK */

        .quick-section {
          margin-top: 24px;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          margin-bottom: 11px;
        }

        .section-heading span {
          color: #7891a3;
          font-size: 8px;
          font-weight: 700;
        }

        .section-heading h3 {
          font-size: 15px;
          margin: 5px 0 0;
        }

        .section-heading p {
          color: #8ca0ae;
          font-size: 9px;
        }

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .quick-grid button {
          background: white;
          border: 1px solid #e2ecf1;
          border-radius: 13px;
          padding: 13px;
          display: flex;
          align-items: center;
          gap: 9px;
          text-align: left;
          cursor: pointer;
          transition: .2s;
        }

        .quick-grid button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(30, 75, 105, .08);
        }

        .quick-grid button > div {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .quick-grid strong {
          font-size: 10px;
        }

        .quick-grid small {
          font-size: 8px;
          color: #8799a7;
          margin-top: 3px;
        }

        .quick-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blue-bg {
          background: #e5f7fd;
          color: #079bd6;
        }

        .green-bg {
          background: #e6f9ef;
          color: #19a66a;
        }

        .purple-bg {
          background: #f0eaff;
          color: #8d5de3;
        }

        .orange-bg {
          background: #fff1df;
          color: #ec8b27;
        }

        /* OTHER PAGES */

        .page-section {
          padding-top: 30px;
          position: relative;
          z-index: 3;
        }

        .page-title-card {
          background: white;
          border: 1px solid #e0ebf1;
          border-radius: 18px;
          padding: 28px;
          margin-bottom: 18px;
        }

        .page-title-card h2 {
          margin: 8px 0;
          font-size: 25px;
        }

        .page-title-card p {
          color: #7a91a2;
          font-size: 11px;
        }

        .large-list-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 17px 5px;
          border-bottom: 1px solid #edf2f5;
        }

        .large-list-item:last-child {
          border-bottom: 0;
        }

        .list-time {
          width: 85px;
          font-size: 10px;
          font-weight: 700;
          color: #668196;
        }

        .list-main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .list-main strong {
          font-size: 12px;
        }

        .list-main span {
          color: #879aa8;
          font-size: 9px;
          margin-top: 4px;
        }

        .small-action {
          border: 0;
          background: #e9f8fd;
          color: #078fca;
          padding: 8px 13px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 9px;
          font-weight: 700;
        }

        .patient-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .patient-card {
          background: white;
          border: 1px solid #e0ebf1;
          border-radius: 15px;
          padding: 17px;
          display: flex;
          align-items: center;
          gap: 11px;
          transition: .2s;
        }

        .patient-card:hover {
          transform: translateY(-3px);
        }

        .patient-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e5f7fd;
          color: #078fca;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .patient-card > div:nth-child(2) {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .patient-card strong {
          font-size: 11px;
        }

        .patient-card span {
          font-size: 8px;
          color: #8499a8;
          margin-top: 4px;
        }

        .patient-card button {
          border: 0;
          background: transparent;
          color: #078fca;
          cursor: pointer;
          font-size: 9px;
          font-weight: 700;
        }

        .schedule-row {
          display: flex;
          align-items: center;
          padding: 17px 5px;
          border-bottom: 1px solid #edf2f5;
        }

        .schedule-row:last-child {
          border-bottom: 0;
        }

        .schedule-row strong {
          width: 130px;
          font-size: 11px;
        }

        .schedule-row span {
          flex: 1;
          color: #71899b;
          font-size: 10px;
        }

        .schedule-row b {
          color: #15965a;
          background: #e7f8ef;
          padding: 5px 9px;
          border-radius: 15px;
          font-size: 8px;
        }

        .empty-state {
          background: white;
          border: 1px solid #e1ebf1;
          border-radius: 18px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .empty-icon {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background: #e8f7fc;
          color: #078fca;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 27px;
        }

        .empty-state h3 {
          margin: 15px 0 6px;
        }

        .empty-state p {
          color: #8498a7;
          font-size: 10px;
        }

        .profile-card {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .profile-large-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10a9df, #087dbd);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-weight: bold;
        }

        .profile-information h3 {
          margin: 0 0 7px;
        }

        .profile-information p {
          color: #7890a1;
          font-size: 11px;
        }

        .profile-information span {
          display: inline-block;
          margin-top: 5px;
          background: #e7f7fc;
          color: #078fca;
          border-radius: 15px;
          padding: 5px 9px;
          font-size: 8px;
          font-weight: bold;
        }

        /* RESPONSIVE */

        @media (max-width: 1100px) {

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .quick-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-content {
            grid-template-columns: 1fr;
          }

          .patient-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 800px) {

          .doctor-sidebar {
            width: 75px;
            padding: 18px 10px;
          }

          .doctor-main {
            margin-left: 75px;
            width: calc(100% - 75px);
            padding: 0 18px 40px;
          }

          .doctor-brand {
            justify-content: center;
            padding: 0;
          }

          .brand-name,
          .brand-subtitle,
          .mini-info,
          .doctor-nav-item span:not(.nav-icon),
          .support-box,
          .logout-button span:last-child {
            display: none;
          }

          .doctor-profile-mini {
            justify-content: center;
          }

          .doctor-nav-item {
            justify-content: center;
          }

          .logout-button {
            justify-content: center;
          }

          .doctor-welcome {
            padding: 25px;
          }

          .welcome-illustration {
            display: none;
          }

          .patient-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .doctor-header {
            align-items: flex-start;
            padding: 18px 0;
          }

          .header-user {
            display: none;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .quick-grid {
            grid-template-columns: 1fr;
          }

          .doctor-welcome {
            margin-top: 18px;
          }

          .welcome-content h2 {
            font-size: 22px;
          }

          .appointment-item {
            flex-wrap: wrap;
          }

        }

      `}</style>

    </div>
  );
};

export default DoctorDashboard;