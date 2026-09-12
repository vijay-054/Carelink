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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [toast, setToast] = useState("");

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const openBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const bookAppointment = () => {
    setShowBooking(false);
    showToast("Appointment request submitted successfully!");
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

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">+</div>
          <span>Care<span>Link</span></span>
        </div>

        <div className="patient-mini">
          <div className="avatar">V</div>
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
              onClick={() => setActivePage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="logout-btn"
            onClick={() => showToast("Logout clicked")}
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* TOP BAR */}
        <header className="topbar">
          <div>
            <h2>{activePage}</h2>
            <p>Manage your healthcare with CareLink</p>
          </div>

          <div className="top-actions">
            <button
              className="notification-btn"
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
            >
              🔔
              <span className="notification-dot"></span>
            </button>

            <div className="profile-top">
              <div className="avatar small">V</div>
              <div>
                <strong>Vijay Raj</strong>
                <small>Patient</small>
              </div>
              <span>⌄</span>
            </div>
          </div>

          {showNotifications && (
            <div className="notification-panel">
              <h3>Notifications</h3>

              <div className="notification">
                <span className="notification-circle">✓</span>
                <div>
                  <strong>Welcome to CareLink</strong>
                  <p>Your account is ready to use.</p>
                </div>
              </div>

              <div className="notification">
                <span className="notification-circle">!</span>
                <div>
                  <strong>Health reminder</strong>
                  <p>Keep your medical records updated.</p>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* CONTENT */}
        <section className="content">

          {activePage === "Dashboard" && (
            <>
              {/* WELCOME */}
              <div className="welcome-card">
                <div className="welcome-content">
                  <span className="welcome-tag">
                    CARELINK HEALTHCARE
                  </span>

                  <h1>
                    Good morning, <span>Vijay!</span>
                  </h1>

                  <p>
                    Take control of your healthcare journey.
                    Book appointments, manage records and stay
                    connected with your doctors.
                  </p>

                  <div className="welcome-buttons">
                    <button
                      className="primary-btn"
                      onClick={() => setActivePage("Find Doctors")}
                    >
                      Find a Doctor →
                    </button>

                    <button
                      className="secondary-btn"
                      onClick={() => setActivePage("Appointments")}
                    >
                      View Appointments
                    </button>
                  </div>
                </div>

                <div className="medical-art">
                  <div className="pulse-circle">
                    +
                  </div>
                  <div className="pulse-line"></div>
                </div>
              </div>

              {/* STATISTICS */}
              <div className="stats-grid">

                <div className="stat-card">
                  <div className="stat-icon blue">▣</div>
                  <div>
                    <span>Appointments</span>
                    <strong>0</strong>
                    <small>Total appointments</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon green">✓</div>
                  <div>
                    <span>Completed</span>
                    <strong>0</strong>
                    <small>Completed visits</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon purple">♡</div>
                  <div>
                    <span>Prescriptions</span>
                    <strong>0</strong>
                    <small>Active prescriptions</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon orange">♥</div>
                  <div>
                    <span>Health Records</span>
                    <strong>0</strong>
                    <small>Medical records</small>
                  </div>
                </div>

              </div>

              {/* QUICK ACTIONS */}
              <div className="section-heading">
                <div>
                  <h2>Quick Actions</h2>
                  <p>Everything you need in one place</p>
                </div>
              </div>

              <div className="quick-grid">

                <button
                  className="quick-card"
                  onClick={() => setActivePage("Find Doctors")}
                >
                  <div className="quick-icon blue-bg">♙</div>
                  <div>
                    <h3>Find a Doctor</h3>
                    <p>Browse specialists and doctors</p>
                  </div>
                  <span>→</span>
                </button>

                <button
                  className="quick-card"
                  onClick={() => setActivePage("Appointments")}
                >
                  <div className="quick-icon green-bg">▣</div>
                  <div>
                    <h3>My Appointments</h3>
                    <p>View and manage appointments</p>
                  </div>
                  <span>→</span>
                </button>

                <button
                  className="quick-card"
                  onClick={() => setActivePage("Health Records")}
                >
                  <div className="quick-icon purple-bg">▤</div>
                  <div>
                    <h3>Health Records</h3>
                    <p>Access your medical history</p>
                  </div>
                  <span>→</span>
                </button>

                <button
                  className="quick-card"
                  onClick={() => setActivePage("Prescriptions")}
                >
                  <div className="quick-icon orange-bg">▥</div>
                  <div>
                    <h3>Prescriptions</h3>
                    <p>Check your prescriptions</p>
                  </div>
                  <span>→</span>
                </button>

              </div>

              {/* DOCTORS */}
              <div className="section-heading doctors-heading">
                <div>
                  <h2>Recommended Doctors</h2>
                  <p>Connect with trusted healthcare professionals</p>
                </div>

                <button
                  className="view-all"
                  onClick={() => setActivePage("Find Doctors")}
                >
                  View all →
                </button>
              </div>

              <div className="doctor-grid">
                {doctors.map((doctor) => (
                  <div className="doctor-card" key={doctor.id}>

                    <div className="doctor-top">
                      <div className="doctor-avatar">
                        {doctor.initials}
                      </div>

                      <span className="available">
                        ● Available
                      </span>
                    </div>

                    <h3>{doctor.name}</h3>
                    <p className="specialty">{doctor.specialty}</p>

                    <div className="doctor-info">
                      <span>Experience</span>
                      <strong>{doctor.experience}</strong>
                    </div>

                    <div className="doctor-info">
                      <span>Consultation</span>
                      <strong>{doctor.fee}</strong>
                    </div>

                    <button
                      className="book-btn"
                      onClick={() => openBooking(doctor)}
                    >
                      Book Appointment →
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activePage === "Find Doctors" && (
            <div className="page-card">

              <div className="page-title">
                <div>
                  <span className="page-tag">CARELINK</span>
                  <h1>Find Your Doctor</h1>
                  <p>
                    Choose the right specialist for your healthcare needs.
                  </p>
                </div>
              </div>

              <div className="search-area">
                <div className="search-box">
                  🔍
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search doctors or specialties..."
                  />
                </div>

                <select>
                  <option>All Specialties</option>
                  <option>General Physician</option>
                  <option>Cardiologist</option>
                  <option>Dermatologist</option>
                </select>
              </div>

              <div className="doctor-grid">

                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <div className="doctor-card" key={doctor.id}>

                      <div className="doctor-top">
                        <div className="doctor-avatar">
                          {doctor.initials}
                        </div>

                        <span className="available">
                          ● Available
                        </span>
                      </div>

                      <h3>{doctor.name}</h3>
                      <p className="specialty">
                        {doctor.specialty}
                      </p>

                      <div className="doctor-info">
                        <span>Experience</span>
                        <strong>{doctor.experience}</strong>
                      </div>

                      <div className="doctor-info">
                        <span>Consultation</span>
                        <strong>{doctor.fee}</strong>
                      </div>

                      <button
                        className="book-btn"
                        onClick={() => openBooking(doctor)}
                      >
                        Book Appointment →
                      </button>

                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div>🔍</div>
                    <h2>No doctors found</h2>
                    <p>Try another doctor or specialty.</p>
                  </div>
                )}

              </div>
            </div>
          )}

          {activePage === "Appointments" && (
            <div className="page-card">

              <div className="page-title">
                <span className="page-tag">APPOINTMENTS</span>
                <h1>My Appointments</h1>
                <p>
                  View and manage your upcoming appointments.
                </p>
              </div>

              <div className="appointment-empty">
                <div className="empty-icon">▣</div>
                <h2>No appointments yet</h2>
                <p>
                  You haven't booked any appointments.
                  Find a doctor and schedule your first visit.
                </p>

                <button
                  className="primary-btn"
                  onClick={() => setActivePage("Find Doctors")}
                >
                  Find a Doctor →
                </button>
              </div>

            </div>
          )}

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

          {activePage === "Profile" && (
            <div className="page-card profile-page">

              <div className="profile-header">
                <div className="large-avatar">V</div>
                <div>
                  <span className="page-tag">PATIENT PROFILE</span>
                  <h1>Vijay Raj</h1>
                  <p>Manage your personal information</p>
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
                onClick={() => showToast("Profile editing selected")}
              >
                Edit Profile
              </button>

            </div>
          )}

          {activePage === "Settings" && (
            <div className="page-card">

              <div className="page-title">
                <span className="page-tag">SETTINGS</span>
                <h1>Account Settings</h1>
                <p>Manage your CareLink preferences.</p>
              </div>

              <div className="settings-list">

                <div className="setting-item">
                  <div>
                    <h3>Notifications</h3>
                    <p>Receive appointment and health reminders.</p>
                  </div>
                  <div className="toggle active-toggle"></div>
                </div>

                <div className="setting-item">
                  <div>
                    <h3>Appointment Reminders</h3>
                    <p>Get reminders before scheduled visits.</p>
                  </div>
                  <div className="toggle active-toggle"></div>
                </div>

                <div className="setting-item">
                  <div>
                    <h3>Privacy</h3>
                    <p>Manage your account privacy settings.</p>
                  </div>
                  <button
                    className="small-action"
                    onClick={() => showToast("Privacy settings selected")}
                  >
                    Manage
                  </button>
                </div>

              </div>
            </div>
          )}

        </section>
      </main>

      {/* BOOKING MODAL */}
      {showBooking && selectedDoctor && (
        <div
          className="modal-overlay"
          onClick={() => setShowBooking(false)}
        >
          <div
            className="booking-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={() => setShowBooking(false)}
            >
              ×
            </button>

            <span className="page-tag">APPOINTMENT</span>

            <h2>Book an Appointment</h2>
            <p className="modal-subtitle">
              Schedule a consultation with your selected doctor.
            </p>

            <div className="selected-doctor">
              <div className="doctor-avatar">
                {selectedDoctor.initials}
              </div>

              <div>
                <strong>{selectedDoctor.name}</strong>
                <span>{selectedDoctor.specialty}</span>
              </div>
            </div>

            <label>Select Date</label>
            <input type="date" />

            <label>Select Time</label>
            <select>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>02:00 PM</option>
              <option>04:00 PM</option>
              <option>06:00 PM</option>
            </select>

            <label>Reason for Visit</label>
            <textarea
              placeholder="Briefly describe your symptoms or reason for consultation..."
            ></textarea>

            <button
              className="confirm-btn"
              onClick={bookAppointment}
            >
              Confirm Appointment
            </button>

          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="toast">
          <span>✓</span>
          {toast}
        </div>
      )}

    </div>
  );
}

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
        <span className="page-tag">CARELINK</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="appointment-empty">
        <div className="empty-icon">{icon}</div>
        <h2>Nothing here yet</h2>
        <p>
          Your {title.toLowerCase()} will appear here
          when information becomes available.
        </p>

        <button className="primary-btn" onClick={onAction}>
          {action}
        </button>
      </div>

    </div>
  );
}

export default App;