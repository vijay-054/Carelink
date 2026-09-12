import React, { useState } from "react";
import "./App.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Physician",
    experience: "10 Years",
    fee: "₹500",
    status: "Available",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Dr. Michael Anderson",
    specialty: "Cardiologist",
    experience: "12 Years",
    fee: "₹800",
    status: "Available",
    initials: "MA",
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Dermatologist",
    experience: "8 Years",
    fee: "₹600",
    status: "Available",
    initials: "EW",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [toast, setToast] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState(2);

  const filteredDoctors = doctors.filter((doctor) => {
    const searchMatch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase());

    const specialtyMatch =
      specialty === "All Specialties" ||
      doctor.specialty === specialty;

    return searchMatch && specialtyMatch;
  });

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setMobileMenu(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const closeBooking = () => {
    setShowBooking(false);
    setSelectedDoctor(null);
  };

  const bookAppointment = () => {
    closeBooking();
    showToast("Appointment request submitted successfully!");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setNotifications(0);
  };

  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Find Doctors", icon: "♙" },
    { name: "Appointments", icon: "▣" },
    { name: "Health Records", icon: "▤" },
    { name: "Prescriptions", icon: "▥" },
    { name: "Messages", icon: "◯" },
    { name: "Profile", icon: "♙" },
    { name: "Settings", icon: "⚙" },
  ];

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>

        <div className="logo">
          <div className="logo-icon">+</div>

          <span>
            Care<span>Link</span>
          </span>
        </div>

        <div className="patient-mini">

          <div className="avatar">
            V
          </div>

          <div>
            <strong>Vijay Raj</strong>
            <small>Patient</small>
          </div>

        </div>

        <nav className="sidebar-nav">

          {menuItems.map((item) => (

            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => navigateTo(item.name)}
            >

              <span className="nav-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

              {activePage === item.name && (
                <span className="nav-active-dot">
                  •
                </span>
              )}

            </button>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-help">
            <div className="help-icon">
              ?
            </div>

            <div>
              <strong>Need help?</strong>
              <small>Contact support</small>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={() => showToast("Logout clicked")}
          >
            <span>↪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="main">

        {/* ================= TOPBAR ================= */}

        <header className="topbar">

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>

          <div className="topbar-title">

            <span className="topbar-label">
              PATIENT PORTAL
            </span>

            <h2>
              {activePage}
            </h2>

            <p>
              Manage your healthcare with CareLink
            </p>

          </div>

          <div className="top-actions">

            <button
              className={`notification-btn ${
                showNotifications ? "notification-active" : ""
              }`}
              onClick={toggleNotifications}
              aria-label="Notifications"
            >

              🔔

              {notifications > 0 && (
                <span className="notification-dot">
                  {notifications}
                </span>
              )}

            </button>

            <div className="profile-top">

              <div className="avatar small">
                V
              </div>

              <div>
                <strong>Vijay Raj</strong>
                <small>Patient</small>
              </div>

              <span>
                ⌄
              </span>

            </div>

          </div>

          {showNotifications && (

            <div className="notification-panel">

              <div className="notification-header">

                <div>
                  <h3>Notifications</h3>
                  <span>Stay updated</span>
                </div>

                <button
                  onClick={() => setShowNotifications(false)}
                >
                  ×
                </button>

              </div>

              <div className="notification">

                <span className="notification-circle success">
                  ✓
                </span>

                <div>
                  <strong>Welcome to CareLink</strong>

                  <p>
                    Your account is ready to use.
                  </p>

                  <small>
                    Just now
                  </small>
                </div>

              </div>

              <div className="notification">

                <span className="notification-circle warning">
                  !
                </span>

                <div>
                  <strong>Health reminder</strong>

                  <p>
                    Keep your medical records updated.
                  </p>

                  <small>
                    Today
                  </small>
                </div>

              </div>

            </div>

          )}

        </header>

        {/* ================= CONTENT ================= */}

        <section className="content">

          {/* =====================================================
              DASHBOARD
          ===================================================== */}

          {activePage === "Dashboard" && (

            <>

              {/* WELCOME */}

              <div className="welcome-card">

                <div className="welcome-glow"></div>

                <div className="welcome-content">

                  <span className="welcome-tag">
                    <span className="status-dot"></span>
                    CARELINK HEALTHCARE
                  </span>

                  <h1>
                    Good morning,
                    <span> Vijay!</span>
                  </h1>

                  <p>
                    Take control of your healthcare journey.
                    Book appointments, manage records and stay
                    connected with your doctors.
                  </p>

                  <div className="welcome-buttons">

                    <button
                      className="primary-btn"
                      onClick={() => navigateTo("Find Doctors")}
                    >
                      Find a Doctor
                      <span>→</span>
                    </button>

                    <button
                      className="secondary-btn"
                      onClick={() => navigateTo("Appointments")}
                    >
                      View Appointments
                    </button>

                  </div>

                  <div className="welcome-trust">

                    <div>
                      <span>✓</span>
                      Verified Doctors
                    </div>

                    <div>
                      <span>✓</span>
                      Secure Records
                    </div>

                    <div>
                      <span>✓</span>
                      Easy Booking
                    </div>

                  </div>

                </div>

                <div className="medical-art">

                  <div className="medical-ring ring-one"></div>
                  <div className="medical-ring ring-two"></div>

                  <div className="pulse-circle">
                    +
                  </div>

                  <div className="pulse-line"></div>

                  <div className="floating-card floating-card-one">
                    <span>♥</span>
                    <div>
                      <strong>Healthcare</strong>
                      <small>Made simple</small>
                    </div>
                  </div>

                  <div className="floating-card floating-card-two">
                    <span>✓</span>
                    <div>
                      <strong>Secure</strong>
                      <small>Your data is safe</small>
                    </div>
                  </div>

                </div>

              </div>

              {/* STATS */}

              <div className="stats-grid">

                <div className="stat-card">

                  <div className="stat-icon blue">
                    ▣
                  </div>

                  <div>
                    <span>Appointments</span>
                    <strong>0</strong>
                    <small>Total appointments</small>
                  </div>

                  <div className="stat-arrow">
                    →
                  </div>

                </div>

                <div className="stat-card">

                  <div className="stat-icon green">
                    ✓
                  </div>

                  <div>
                    <span>Completed</span>
                    <strong>0</strong>
                    <small>Completed visits</small>
                  </div>

                  <div className="stat-arrow">
                    →
                  </div>

                </div>

                <div className="stat-card">

                  <div className="stat-icon purple">
                    ♡
                  </div>

                  <div>
                    <span>Prescriptions</span>
                    <strong>0</strong>
                    <small>Active prescriptions</small>
                  </div>

                  <div className="stat-arrow">
                    →
                  </div>

                </div>

                <div className="stat-card">

                  <div className="stat-icon orange">
                    ♥
                  </div>

                  <div>
                    <span>Health Records</span>
                    <strong>0</strong>
                    <small>Medical records</small>
                  </div>

                  <div className="stat-arrow">
                    →
                  </div>

                </div>

              </div>

              {/* QUICK ACTIONS */}

              <div className="section-heading">

                <div>
                  <span className="section-label">
                    SHORTCUTS
                  </span>

                  <h2>
                    Quick Actions
                  </h2>

                  <p>
                    Everything you need in one place
                  </p>
                </div>

              </div>

              <div className="quick-grid">

                <button
                  className="quick-card"
                  onClick={() => navigateTo("Find Doctors")}
                >

                  <div className="quick-icon blue-bg">
                    ♙
                  </div>

                  <div>
                    <h3>Find a Doctor</h3>
                    <p>
                      Browse specialists and doctors
                    </p>
                  </div>

                  <span className="quick-arrow">
                    →
                  </span>

                </button>

                <button
                  className="quick-card"
                  onClick={() => navigateTo("Appointments")}
                >

                  <div className="quick-icon green-bg">
                    ▣
                  </div>

                  <div>
                    <h3>My Appointments</h3>
                    <p>
                      View and manage appointments
                    </p>
                  </div>

                  <span className="quick-arrow">
                    →
                  </span>

                </button>

                <button
                  className="quick-card"
                  onClick={() => navigateTo("Health Records")}
                >

                  <div className="quick-icon purple-bg">
                    ▤
                  </div>

                  <div>
                    <h3>Health Records</h3>
                    <p>
                      Access your medical history
                    </p>
                  </div>

                  <span className="quick-arrow">
                    →
                  </span>

                </button>

                <button
                  className="quick-card"
                  onClick={() => navigateTo("Prescriptions")}
                >

                  <div className="quick-icon orange-bg">
                    ▥
                  </div>

                  <div>
                    <h3>Prescriptions</h3>
                    <p>
                      Check your prescriptions
                    </p>
                  </div>

                  <span className="quick-arrow">
                    →
                  </span>

                </button>

              </div>

              {/* DOCTORS */}

              <div className="section-heading doctors-heading">

                <div>
                  <span className="section-label">
                    OUR SPECIALISTS
                  </span>

                  <h2>
                    Recommended Doctors
                  </h2>

                  <p>
                    Connect with trusted healthcare professionals
                  </p>
                </div>

                <button
                  className="view-all"
                  onClick={() => navigateTo("Find Doctors")}
                >
                  View all
                  <span>→</span>
                </button>

              </div>

              <div className="doctor-grid">

                {doctors.map((doctor) => (

                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBook={openBooking}
                  />

                ))}

              </div>

            </>

          )}

          {/* =====================================================
              FIND DOCTORS
          ===================================================== */}

          {activePage === "Find Doctors" && (

            <div className="page-card">

              <div className="page-title">

                <span className="page-tag">
                  CARELINK / DOCTORS
                </span>

                <h1>
                  Find Your Doctor
                </h1>

                <p>
                  Choose the right specialist for your healthcare needs.
                </p>

              </div>

              <div className="search-area">

                <div className="search-box">

                  <span>
                    🔍
                  </span>

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search doctors or specialties..."
                  />

                  {search && (
                    <button
                      className="clear-search"
                      onClick={() => setSearch("")}
                    >
                      ×
                    </button>
                  )}

                </div>

                <select
                  value={specialty}
                  onChange={(e) =>
                    setSpecialty(e.target.value)
                  }
                >
                  <option>
                    All Specialties
                  </option>

                  <option>
                    General Physician
                  </option>

                  <option>
                    Cardiologist
                  </option>

                  <option>
                    Dermatologist
                  </option>

                </select>

              </div>

              <div className="results-info">

                <span>
                  Showing{" "}
                  <strong>
                    {filteredDoctors.length}
                  </strong>{" "}
                  doctors
                </span>

                {(search ||
                  specialty !== "All Specialties") && (

                  <button
                    onClick={() => {
                      setSearch("");
                      setSpecialty("All Specialties");
                    }}
                  >
                    Clear filters
                  </button>

                )}

              </div>

              <div className="doctor-grid">

                {filteredDoctors.length > 0 ? (

                  filteredDoctors.map((doctor) => (

                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onBook={openBooking}
                    />

                  ))

                ) : (

                  <div className="empty-state">

                    <div className="empty-state-icon">
                      🔍
                    </div>

                    <h2>
                      No doctors found
                    </h2>

                    <p>
                      Try another doctor name or specialty.
                    </p>

                    <button
                      className="primary-btn"
                      onClick={() => {
                        setSearch("");
                        setSpecialty("All Specialties");
                      }}
                    >
                      Reset Search
                    </button>

                  </div>

                )}

              </div>

            </div>

          )}

          {/* =====================================================
              APPOINTMENTS
          ===================================================== */}

          {activePage === "Appointments" && (

            <div className="page-card">

              <div className="page-title">

                <span className="page-tag">
                  CARELINK / APPOINTMENTS
                </span>

                <h1>
                  My Appointments
                </h1>

                <p>
                  View and manage your upcoming appointments.
                </p>

              </div>

              <div className="appointment-empty">

                <div className="empty-icon">
                  ▣
                </div>

                <span className="empty-small-label">
                  YOUR SCHEDULE
                </span>

                <h2>
                  No appointments yet
                </h2>

                <p>
                  You haven't booked any appointments.
                  Find a doctor and schedule your first visit.
                </p>

                <button
                  className="primary-btn"
                  onClick={() => navigateTo("Find Doctors")}
                >
                  Find a Doctor
                  <span>→</span>
                </button>

              </div>

            </div>

          )}

          {/* =====================================================
              HEALTH RECORDS
          ===================================================== */}

          {activePage === "Health Records" && (

            <SimplePage
              icon="▤"
              title="Health Records"
              description="Keep your medical history organized and accessible."
              action="Add Health Record"
              onAction={() =>
                showToast("Health record feature selected")
              }
            />

          )}

          {/* =====================================================
              PRESCRIPTIONS
          ===================================================== */}

          {activePage === "Prescriptions" && (

            <SimplePage
              icon="▥"
              title="Prescriptions"
              description="View and manage your current prescriptions."
              action="View Prescriptions"
              onAction={() =>
                showToast("No prescriptions available")
              }
            />

          )}

          {/* =====================================================
              MESSAGES
          ===================================================== */}

          {activePage === "Messages" && (

            <SimplePage
              icon="◯"
              title="Messages"
              description="Stay connected with your healthcare providers."
              action="Start a Conversation"
              onAction={() =>
                showToast("Messaging feature selected")
              }
            />

          )}

          {/* =====================================================
              PROFILE
          ===================================================== */}

          {activePage === "Profile" && (

            <div className="page-card profile-page">

              <div className="profile-header">

                <div className="large-avatar">
                  V
                </div>

                <div>

                  <span className="page-tag">
                    PATIENT PROFILE
                  </span>

                  <h1>
                    Vijay Raj
                  </h1>

                  <p>
                    Manage your personal information
                  </p>

                </div>

              </div>

              <div className="profile-details">

                <div>
                  <label>Full Name</label>
                  <strong>Vijay Raj</strong>
                </div>

                <div>
                  <label>Email</label>
                  <strong>vijay@example.com</strong>
                </div>

                <div>
                  <label>Phone</label>
                  <strong>+91 XXXXX XXXXX</strong>
                </div>

                <div>
                  <label>Account Type</label>
                  <strong>Patient</strong>
                </div>

              </div>

              <button
                className="primary-btn"
                onClick={() =>
                  showToast("Profile editing selected")
                }
              >
                Edit Profile
              </button>

            </div>

          )}

          {/* =====================================================
              SETTINGS
          ===================================================== */}

          {activePage === "Settings" && (

            <div className="page-card">

              <div className="page-title">

                <span className="page-tag">
                  SETTINGS
                </span>

                <h1>
                  Account Settings
                </h1>

                <p>
                  Manage your CareLink preferences.
                </p>

              </div>

              <div className="settings-list">

                <Setting
                  title="Notifications"
                  description="Receive appointment and health reminders."
                  active
                />

                <Setting
                  title="Appointment Reminders"
                  description="Get reminders before scheduled visits."
                  active
                />

                <div className="setting-item">

                  <div>
                    <h3>
                      Privacy
                    </h3>

                    <p>
                      Manage your account privacy settings.
                    </p>
                  </div>

                  <button
                    className="small-action"
                    onClick={() =>
                      showToast(
                        "Privacy settings selected"
                      )
                    }
                  >
                    Manage
                  </button>

                </div>

              </div>

            </div>

          )}

        </section>

      </main>

      {/* =====================================================
          BOOKING MODAL
      ===================================================== */}

      {showBooking && selectedDoctor && (

        <div
          className="modal-overlay"
          onClick={closeBooking}
        >

          <div
            className="booking-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-modal"
              onClick={closeBooking}
            >
              ×
            </button>

            <span className="page-tag">
              APPOINTMENT
            </span>

            <h2>
              Book an Appointment
            </h2>

            <p className="modal-subtitle">
              Schedule a consultation with your selected doctor.
            </p>

            <div className="selected-doctor">

              <div className="doctor-avatar">
                {selectedDoctor.initials}
              </div>

              <div>
                <strong>
                  {selectedDoctor.name}
                </strong>

                <span>
                  {selectedDoctor.specialty}
                </span>

                <small>
                  {selectedDoctor.experience} experience
                </small>
              </div>

            </div>

            <label>
              Select Date
            </label>

            <input type="date" />

            <label>
              Select Time
            </label>

            <select>

              <option>
                10:00 AM
              </option>

              <option>
                11:00 AM
              </option>

              <option>
                02:00 PM
              </option>

              <option>
                04:00 PM
              </option>

              <option>
                06:00 PM
              </option>

            </select>

            <label>
              Reason for Visit
            </label>

            <textarea
              placeholder="Briefly describe your symptoms or reason for consultation..."
            ></textarea>

            <div className="booking-note">
              <span>🔒</span>
              Your appointment information is kept secure.
            </div>

            <button
              className="confirm-btn"
              onClick={bookAppointment}
            >
              Confirm Appointment
              <span>→</span>
            </button>

          </div>

        </div>

      )}

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toast && (

        <div className="toast">

          <span>
            ✓
          </span>

          <div>
            <strong>
              Success
            </strong>

            <p>
              {toast}
            </p>
          </div>

          <button
            onClick={() => setToast("")}
          >
            ×
          </button>

        </div>

      )}

    </div>
  );
}

/* ============================================================
   DOCTOR CARD
============================================================ */

function DoctorCard({ doctor, onBook }) {
  return (
    <div className="doctor-card">

      <div className="doctor-card-glow"></div>

      <div className="doctor-top">

        <div className="doctor-avatar">
          {doctor.initials}
        </div>

        <span className="available">
          <span></span>
          {doctor.status}
        </span>

      </div>

      <h3>
        {doctor.name}
      </h3>

      <p className="specialty">
        {doctor.specialty}
      </p>

      <div className="doctor-info">

        <span>
          Experience
        </span>

        <strong>
          {doctor.experience}
        </strong>

      </div>

      <div className="doctor-info">

        <span>
          Consultation
        </span>

        <strong>
          {doctor.fee}
        </strong>

      </div>

      <button
        className="book-btn"
        onClick={() => onBook(doctor)}
      >
        Book Appointment
        <span>→</span>
      </button>

    </div>
  );
}

/* ============================================================
   SIMPLE PAGE
============================================================ */

function SimplePage({
  icon,
  title,
  description,
  action,
  onAction,
}) {
  return (
    <div className="page-card">

      <div className="page-title">

        <span className="page-tag">
          CARELINK
        </span>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>

      </div>

      <div className="appointment-empty">

        <div className="empty-icon">
          {icon}
        </div>

        <span className="empty-small-label">
          CARELINK
        </span>

        <h2>
          Nothing here yet
        </h2>

        <p>
          Your {title.toLowerCase()} will appear here
          when information becomes available.
        </p>

        <button
          className="primary-btn"
          onClick={onAction}
        >
          {action}
          <span>→</span>
        </button>

      </div>

    </div>
  );
}

/* ============================================================
   SETTING
============================================================ */

function Setting({
  title,
  description,
  active,
}) {
  const [enabled, setEnabled] = useState(active);

  return (
    <div className="setting-item">

      <div>
        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>
      </div>

      <button
        type="button"
        className={`toggle ${
          enabled ? "active-toggle" : ""
        }`}
        onClick={() => setEnabled(!enabled)}
        aria-label={`Toggle ${title}`}
      >
        <span></span>
      </button>

    </div>
  );
}

export default App;