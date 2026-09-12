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
    rating: "4.9",
    reviews: "128",
    initials: "EW",
    next: "Tomorrow, 10:00 AM",
  },
  {
    id: 2,
    name: "Dr. Aris Patel",
    specialty: "Dermatologist",
    experience: "9 Years",
    fee: "₹600",
    rating: "4.8",
    reviews: "94",
    initials: "AP",
    next: "Wednesday, 2:30 PM",
  },
  {
    id: 3,
    name: "Dr. Sarah Jenkins",
    specialty: "Pediatrician",
    experience: "15 Years",
    fee: "₹700",
    rating: "5.0",
    reviews: "210",
    initials: "SJ",
    next: "Friday, 9:00 AM",
  },
  {
    id: 4,
    name: "Dr. Marcus Vance",
    specialty: "Neurologist",
    experience: "11 Years",
    fee: "₹900",
    rating: "4.7",
    reviews: "88",
    initials: "MV",
    next: "Next Monday, 11:15 AM",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth || {});

  const [activeSection, setActiveSection] = useState("Overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const openBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const confirmBooking = () => {
    setShowBooking(false);
    showToast("Appointment request submitted successfully!");
  };

  const handleNavigation = (section) => {
    setActiveSection(section);

    if (section === "Find Doctors") {
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="patient-dashboard">

      {/* Animated background */}
      <div className="dashboard-background">
        <div className="dashboard-orb orb-one"></div>
        <div className="dashboard-orb orb-two"></div>
        <div className="dashboard-orb orb-three"></div>
      </div>

      {/* SIDEBAR */}
      <aside className="patient-sidebar">

        <div className="brand">
          <div className="brand-icon">+</div>

          <div>
            <h2>CareLink</h2>
            <span>Patient Portal</span>
          </div>
        </div>

        <div className="portal-user">
          <div className="user-avatar">
            {patientName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{patientName}</strong>
            <span>Patient</span>
          </div>
        </div>

        <nav className="dashboard-nav">

          <button
            className={activeSection === "Overview" ? "active" : ""}
            onClick={() => setActiveSection("Overview")}
          >
            <span>⌂</span>
            Overview
          </button>

          <button
            className={activeSection === "Find Doctors" ? "active" : ""}
            onClick={() => handleNavigation("Find Doctors")}
          >
            <span>♙</span>
            Find Doctors
          </button>

          <button
            onClick={() =>
              showToast("No appointments available yet")
            }
          >
            <span>▣</span>
            Appointments
          </button>

          <button
            onClick={() =>
              showToast("No health records available yet")
            }
          >
            <span>▤</span>
            Health Records
          </button>

          <button
            onClick={() =>
              showToast("No prescriptions available yet")
            }
          >
            <span>▥</span>
            Prescriptions
          </button>

          <button
            onClick={() =>
              showToast("No messages available yet")
            }
          >
            <span>◯</span>
            Messages
          </button>

          <button
            onClick={() =>
              showToast("Profile settings selected")
            }
          >
            <span>♙</span>
            Profile
          </button>

          <button
            onClick={() =>
              showToast("Settings selected")
            }
          >
            <span>⚙</span>
            Settings
          </button>

        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>

      {/* MAIN */}
      <main className="patient-main">

        {/* TOPBAR */}
        <header className="patient-topbar">

          <div>
            <div className="breadcrumb">
              CareLink <span>/</span> Overview
            </div>

            <h2>Dashboard</h2>
          </div>

          <div className="topbar-right">

            <button
              className="notification-button"
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
            >
              🔔
              <span></span>
            </button>

            <div className="top-user">

              <div className="user-avatar small">
                {patientName.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{patientName}</strong>
                <span>Patient</span>
              </div>

            </div>

          </div>

          {showNotifications && (
            <div className="notification-dropdown">

              <h3>Notifications</h3>

              <div className="notification-item">
                <div>✓</div>
                <section>
                  <strong>Welcome to CareLink</strong>
                  <p>Your healthcare portal is ready.</p>
                </section>
              </div>

              <div className="notification-item">
                <div>!</div>
                <section>
                  <strong>Health reminder</strong>
                  <p>Keep your medical records updated.</p>
                </section>
              </div>

            </div>
          )}

        </header>

        {/* CONTENT */}
        <div className="patient-content">

          {/* HERO */}
          <section className="patient-hero">

            <div className="hero-content">

              <span className="hero-label">
                CARELINK HEALTHCARE
              </span>

              <h1>
                Good morning,{" "}
                <span>{patientName.split(" ")[0]}!</span>
              </h1>

              <p>
                Take control of your healthcare journey.
                Book appointments, manage records and stay
                connected with your doctors.
              </p>

              <div className="hero-actions">

                <button
                  className="primary-action"
                  onClick={() =>
                    setActiveSection("Find Doctors")
                  }
                >
                  Find a Doctor →
                </button>

                <button
                  className="secondary-action"
                  onClick={() =>
                    showToast("You don't have any appointments yet")
                  }
                >
                  View Appointments
                </button>

              </div>

            </div>

            <div className="hero-visual">

              <div className="heartbeat-circle">
                <div>+</div>
              </div>

              <div className="heartbeat-line">
                <span></span>
              </div>

              <div className="floating-medical-card">
                <strong>♥</strong>
                <div>
                  <b>Healthcare</b>
                  <small>Made simpler</small>
                </div>
              </div>

            </div>

          </section>

          {/* FEATURES */}
          <section className="feature-strip">

            <div>
              <span>✓</span>
              <div>
                <strong>Verified Doctors</strong>
                <small>Trusted professionals</small>
              </div>
            </div>

            <div>
              <span>▣</span>
              <div>
                <strong>Secure Records</strong>
                <small>Your data stays protected</small>
              </div>
            </div>

            <div>
              <span>⚡</span>
              <div>
                <strong>Easy Booking</strong>
                <small>Book in a few clicks</small>
              </div>
            </div>

          </section>

          {/* STATS */}
          <section className="stats-section">

            <div className="stat-box">
              <div className="stat-symbol blue">▣</div>

              <div>
                <span>Total appointments</span>
                <strong>0</strong>
                <small>No data</small>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-symbol green">✓</div>

              <div>
                <span>Completed visits</span>
                <strong>0</strong>
                <small>No data</small>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-symbol purple">♡</div>

              <div>
                <span>Active prescriptions</span>
                <strong>0</strong>
                <small>No data</small>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-symbol orange">♥</div>

              <div>
                <span>Medical records</span>
                <strong>0</strong>
                <small>No data</small>
              </div>
            </div>

          </section>

          {/* QUICK ACTIONS */}
          <section className="dashboard-section">

            <div className="section-header">

              <div>
                <span>CARE AT YOUR FINGERTIPS</span>
                <h2>Quick Actions</h2>
                <p>Everything you need in one place</p>
              </div>

            </div>

            <div className="quick-actions">

              <button
                onClick={() =>
                  setActiveSection("Find Doctors")
                }
              >
                <div className="quick-icon blue-icon">
                  ♙
                </div>

                <div>
                  <h3>Find a Doctor</h3>
                  <p>Browse specialists and doctors</p>
                </div>

                <span>→</span>
              </button>

              <button
                onClick={() =>
                  showToast("No appointments yet")
                }
              >
                <div className="quick-icon green-icon">
                  ▣
                </div>

                <div>
                  <h3>My Appointments</h3>
                  <p>Schedule or manage appointments</p>
                </div>

                <span>→</span>
              </button>

              <button
                onClick={() =>
                  showToast("No health records yet")
                }
              >
                <div className="quick-icon purple-icon">
                  ▤
                </div>

                <div>
                  <h3>Health Records</h3>
                  <p>Access clinical files and history</p>
                </div>

                <span>→</span>
              </button>

              <button
                onClick={() =>
                  showToast("No prescriptions yet")
                }
              >
                <div className="quick-icon orange-icon">
                  ▥
                </div>

                <div>
                  <h3>Prescriptions</h3>
                  <p>Check medicines and prescriptions</p>
                </div>

                <span>→</span>
              </button>

            </div>

          </section>

          {/* DOCTORS */}
          <section className="dashboard-section">

            <div className="section-header doctors-header">

              <div>
                <span>HEALTHCARE PROFESSIONALS</span>
                <h2>Recommended Doctors</h2>
                <p>Top-rated specialists near you</p>
              </div>

              <button
                className="view-all-button"
                onClick={() =>
                  setActiveSection("Find Doctors")
                }
              >
                View all →
              </button>

            </div>

            <div className="doctor-grid">

              {doctors.map((doctor) => (

                <div
                  className="modern-doctor-card"
                  key={doctor.id}
                >

                  <div className="doctor-card-top">

                    <div className="doctor-profile">
                      {doctor.initials}
                    </div>

                    <span className="doctor-status">
                      ● Available
                    </span>

                  </div>

                  <h3>{doctor.name}</h3>

                  <p className="doctor-specialty">
                    {doctor.specialty}
                  </p>

                  <div className="doctor-rating">
                    ★ {doctor.rating}
                    <span>
                      ({doctor.reviews} reviews)
                    </span>
                  </div>

                  <div className="doctor-details">

                    <div>
                      <span>Experience</span>
                      <strong>{doctor.experience}</strong>
                    </div>

                    <div>
                      <span>Consultation</span>
                      <strong>{doctor.fee}</strong>
                    </div>

                  </div>

                  <div className="doctor-next">
                    <span>Next Available</span>
                    <strong>{doctor.next}</strong>
                  </div>

                  <button
                    className="doctor-book-button"
                    onClick={() => openBooking(doctor)}
                  >
                    Book Appointment
                    <span>→</span>
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
              <span>NEED HELP?</span>
              <h2>We're here for you.</h2>
              <p>
                Our support team is available to help
                you with your healthcare journey.
              </p>
            </div>

            <button
              onClick={() =>
                showToast("Support team contacted")
              }
            >
              Contact Support →
            </button>

          </section>

        </div>

      </main>

      {/* BOOKING MODAL */}
      {showBooking && selectedDoctor && (

        <div
          className="booking-overlay"
          onClick={() => setShowBooking(false)}
        >

          <div
            className="booking-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() => setShowBooking(false)}
            >
              ×
            </button>

            <span className="hero-label">
              APPOINTMENT
            </span>

            <h2>Book an Appointment</h2>

            <p>
              Schedule your consultation with{" "}
              <strong>{selectedDoctor.name}</strong>.
            </p>

            <div className="selected-doctor">

              <div className="doctor-profile">
                {selectedDoctor.initials}
              </div>

              <div>
                <strong>{selectedDoctor.name}</strong>
                <span>{selectedDoctor.specialty}</span>
              </div>

            </div>

            <label>Date</label>

            <input type="date" />

            <label>Time</label>

            <select>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>02:00 PM</option>
              <option>04:00 PM</option>
              <option>06:00 PM</option>
            </select>

            <label>Reason for Visit</label>

            <textarea
              placeholder="Briefly describe your reason for consultation..."
            ></textarea>

            <button
              className="confirm-booking"
              onClick={confirmBooking}
            >
              Confirm Appointment →
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