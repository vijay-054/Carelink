import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

const doctors = [
  {
    id: 1,
    name: "Dr. Emily Watson",
    specialty: "Cardiologist",
    experience: "12 Years",
    fee: "₹800",
    initials: "EW",
  },
  {
    id: 2,
    name: "Dr. Aris Patel",
    specialty: "Dermatologist",
    experience: "9 Years",
    fee: "₹600",
    initials: "AP",
  },
  {
    id: 3,
    name: "Dr. Sarah Jenkins",
    specialty: "Pediatrician",
    experience: "15 Years",
    fee: "₹700",
    initials: "SJ",
  },
  {
    id: 4,
    name: "Dr. Marcus Vance",
    specialty: "Neurologist",
    experience: "11 Years",
    fee: "₹900",
    initials: "MV",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth || {});

  const [showNotifications, setShowNotifications] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [toast, setToast] = useState("");

  const patientName =
    user?.fullName ||
    user?.name ||
    "Vijay Raj";

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const openBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const confirmBooking = () => {
    setShowBooking(false);
    showToast("Appointment request submitted successfully!");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="patient-dashboard">

      {/* Animated background */}
      <div className="dashboard-bg">
        <div className="bg-orb orb-one"></div>
        <div className="bg-orb orb-two"></div>
        <div className="bg-orb orb-three"></div>
      </div>

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        <div className="brand">
          <div className="brand-icon">+</div>

          <div>
            <h2>CareLink</h2>
            <span>Patient Portal</span>
          </div>
        </div>

        <div className="user-card">
          <div className="user-avatar">
            {patientName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{patientName}</strong>
            <span>Patient</span>
          </div>
        </div>

        <nav className="dashboard-nav">

          <button className="nav-link active">
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="nav-link"
            onClick={() => navigate("/patient-dashboard")}
          >
            <span>♙</span>
            Find Doctors
          </button>

          <button
            className="nav-link"
            onClick={() =>
              showToast("You have no upcoming appointments.")
            }
          >
            <span>▣</span>
            Appointments
          </button>

          <button
            className="nav-link"
            onClick={() =>
              showToast("No health records available yet.")
            }
          >
            <span>▤</span>
            Health Records
          </button>

          <button
            className="nav-link"
            onClick={() =>
              showToast("No active prescriptions.")
            }
          >
            <span>▥</span>
            Prescriptions
          </button>

          <button
            className="nav-link"
            onClick={() =>
              showToast("Messaging will be available soon.")
            }
          >
            <span>◯</span>
            Messages
          </button>

          <button
            className="nav-link"
            onClick={() =>
              showToast("Profile section selected.")
            }
          >
            <span>♙</span>
            Profile
          </button>

          <button
            className="nav-link"
            onClick={() =>
              showToast("Settings section selected.")
            }
          >
            <span>⚙</span>
            Settings
          </button>

        </nav>

        <button
          className="logout-link"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">

          <div>
            <span className="breadcrumb">
              CareLink / Overview
            </span>

            <h1>Dashboard</h1>

            <p>
              Manage your healthcare journey from one place.
            </p>
          </div>

          <div className="header-actions">

            <button
              className="notification-button"
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
            >
              🔔
              <span className="notification-dot"></span>
            </button>

            <div className="header-user">
              <div className="small-avatar">
                {patientName.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{patientName}</strong>
                <span>Patient</span>
              </div>
            </div>

          </div>

          {showNotifications && (
            <div className="notification-box">

              <h3>Notifications</h3>

              <div className="notification-item">
                <span>✓</span>

                <div>
                  <strong>Welcome to CareLink</strong>
                  <p>Your account is ready.</p>
                </div>
              </div>

              <div className="notification-item">
                <span>!</span>

                <div>
                  <strong>Health reminder</strong>
                  <p>Keep your health records updated.</p>
                </div>
              </div>

            </div>
          )}

        </header>


        {/* WELCOME HERO */}
        <section className="welcome-section">

          <div className="welcome-text">

            <span className="section-label">
              CARELINK HEALTHCARE
            </span>

            <h2>
              Good morning,{" "}
              <span>{patientName.split(" ")[0]}!</span>
            </h2>

            <p>
              Take control of your healthcare journey.
              Book appointments, connect with trusted
              doctors and manage your health information
              easily.
            </p>

            <div className="welcome-actions">

              <button
                className="primary-action"
                onClick={() =>
                  document
                    .getElementById("doctors-section")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Find a Doctor →
              </button>

              <button
                className="secondary-action"
                onClick={() =>
                  showToast(
                    "You have no upcoming appointments."
                  )
                }
              >
                View Appointments
              </button>

            </div>

          </div>

          <div className="medical-visual">

            <div className="pulse-ring ring-one"></div>
            <div className="pulse-ring ring-two"></div>

            <div className="medical-cross">
              +
            </div>

            <div className="heartbeat">
              ──╱╲──╱╲────
            </div>

          </div>

        </section>


        {/* TRUST STRIP */}
        <section className="trust-strip">

          <div>
            <span className="trust-icon">✓</span>
            <strong>Verified Doctors</strong>
            <small>Trusted professionals</small>
          </div>

          <div>
            <span className="trust-icon">▣</span>
            <strong>Secure Records</strong>
            <small>Your data stays protected</small>
          </div>

          <div>
            <span className="trust-icon">⚡</span>
            <strong>Easy Booking</strong>
            <small>Book in a few clicks</small>
          </div>

        </section>


        {/* STATISTICS */}
        <section className="statistics-grid">

          <div className="dashboard-stat">
            <div className="stat-symbol blue-symbol">
              ▣
            </div>

            <div>
              <span>Total appointments</span>
              <strong>0</strong>
            </div>
          </div>

          <div className="dashboard-stat">
            <div className="stat-symbol green-symbol">
              ✓
            </div>

            <div>
              <span>Completed visits</span>
              <strong>0</strong>
            </div>
          </div>

          <div className="dashboard-stat">
            <div className="stat-symbol purple-symbol">
              ♡
            </div>

            <div>
              <span>Active prescriptions</span>
              <strong>0</strong>
            </div>
          </div>

          <div className="dashboard-stat">
            <div className="stat-symbol orange-symbol">
              ♥
            </div>

            <div>
              <span>Medical records</span>
              <strong>0</strong>
            </div>
          </div>

        </section>


        {/* QUICK ACTIONS */}
        <section className="dashboard-section">

          <div className="section-heading">

            <div>
              <span className="section-label">
                GET STARTED
              </span>

              <h2>Quick Actions</h2>

              <p>
                Everything you need in one place.
              </p>
            </div>

          </div>


          <div className="quick-actions-grid">

            <button
              className="quick-action-card"
              onClick={() =>
                document
                  .getElementById("doctors-section")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              <div className="quick-icon blue">
                ♙
              </div>

              <div>
                <h3>Find a Doctor</h3>
                <p>
                  Browse specialists and doctors
                </p>
              </div>

              <span>→</span>
            </button>


            <button
              className="quick-action-card"
              onClick={() =>
                showToast(
                  "You have no upcoming appointments."
                )
              }
            >
              <div className="quick-icon green">
                ▣
              </div>

              <div>
                <h3>My Appointments</h3>
                <p>
                  Schedule or manage appointments
                </p>
              </div>

              <span>→</span>
            </button>


            <button
              className="quick-action-card"
              onClick={() =>
                showToast(
                  "No health records available yet."
                )
              }
            >
              <div className="quick-icon purple">
                ▤
              </div>

              <div>
                <h3>Health Records</h3>
                <p>
                  Access your medical history
                </p>
              </div>

              <span>→</span>
            </button>


            <button
              className="quick-action-card"
              onClick={() =>
                showToast(
                  "No active prescriptions available."
                )
              }
            >
              <div className="quick-icon orange">
                ▥
              </div>

              <div>
                <h3>Prescriptions</h3>
                <p>
                  Check your prescriptions
                </p>
              </div>

              <span>→</span>
            </button>

          </div>

        </section>


        {/* DOCTORS */}
        <section
          className="dashboard-section"
          id="doctors-section"
        >

          <div className="section-heading doctors-heading">

            <div>
              <span className="section-label">
                OUR SPECIALISTS
              </span>

              <h2>Recommended Doctors</h2>

              <p>
                Top-rated specialists available for consultation.
              </p>
            </div>

            <button
              className="view-all-button"
              onClick={() =>
                showToast(
                  "Doctor search will be available soon."
                )
              }
            >
              View all →
            </button>

          </div>


          <div className="doctor-grid">

            {doctors.map((doctor) => (

              <div
                className="doctor-card"
                key={doctor.id}
              >

                <div className="doctor-card-top">

                  <div className="doctor-avatar">
                    {doctor.initials}
                  </div>

                  <span className="doctor-available">
                    ● Available
                  </span>

                </div>

                <h3>{doctor.name}</h3>

                <p className="doctor-specialty">
                  {doctor.specialty}
                </p>

                <div className="doctor-rating">
                  ★ 4.9
                  <span>
                    Highly rated
                  </span>
                </div>

                <div className="doctor-details">

                  <div>
                    <span>Experience</span>
                    <strong>
                      {doctor.experience}
                    </strong>
                  </div>

                  <div>
                    <span>Consultation</span>
                    <strong>
                      {doctor.fee}
                    </strong>
                  </div>

                </div>

                <button
                  className="book-doctor-button"
                  onClick={() =>
                    openBooking(doctor)
                  }
                >
                  Book Appointment →
                </button>

              </div>

            ))}

          </div>

        </section>


        {/* SUPPORT */}
        <section className="support-card">

          <div className="support-icon">
            ?
          </div>

          <div>
            <span className="section-label">
              NEED HELP?
            </span>

            <h2>
              We're here for you
            </h2>

            <p>
              Our CareLink support team is available
              to help you with your healthcare journey.
            </p>
          </div>

          <button
            className="support-button"
            onClick={() =>
              showToast(
                "Support team contact feature coming soon."
              )
            }
          >
            Contact Support
          </button>

        </section>


        {/* FOOTER */}
        <footer className="dashboard-footer">
          <span>© 2026 CareLink</span>
          <span>Secure Healthcare Platform</span>
        </footer>

      </main>


      {/* BOOKING MODAL */}
      {showBooking && selectedDoctor && (

        <div
          className="booking-overlay"
          onClick={() =>
            setShowBooking(false)
          }
        >

          <div
            className="booking-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setShowBooking(false)
              }
            >
              ×
            </button>

            <span className="section-label">
              APPOINTMENT
            </span>

            <h2>
              Book an Appointment
            </h2>

            <p>
              Schedule a consultation with{" "}
              {selectedDoctor.name}.
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
              </div>

            </div>

            <label>Select Date</label>

            <input type="date" />

            <label>Select Time</label>

            <select defaultValue="">
              <option value="" disabled>
                Choose a time
              </option>

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
              placeholder="Briefly describe your reason for consultation..."
            />

            <button
              className="confirm-booking"
              onClick={confirmBooking}
            >
              Confirm Appointment
            </button>

          </div>

        </div>

      )}


      {/* TOAST */}
      {toast && (

        <div className="dashboard-toast">

          <span>✓</span>

          {toast}

        </div>

      )}

    </div>
  );
};

export default Dashboard;