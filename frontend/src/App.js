import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";

/* =========================================================
   DOCTORS
========================================================= */

const doctors = [
  {
    id: 1,
    name: "Dr. Emily Watson",
    specialty: "Cardiologist",
    experience: "12 Years",
    fee: "₹800",
    rating: "4.9",
    reviews: "128 reviews",
    available: "Tomorrow, 10:00 AM",
    initials: "EW",
  },
  {
    id: 2,
    name: "Dr. Aris Patel",
    specialty: "Dermatologist",
    experience: "9 Years",
    fee: "₹600",
    rating: "4.8",
    reviews: "94 reviews",
    available: "Wednesday, 2:30 PM",
    initials: "AP",
  },
  {
    id: 3,
    name: "Dr. Sarah Jenkins",
    specialty: "Pediatrician",
    experience: "15 Years",
    fee: "₹700",
    rating: "5.0",
    reviews: "210 reviews",
    available: "Friday, 9:00 AM",
    initials: "SJ",
  },
  {
    id: 4,
    name: "Dr. Marcus Vance",
    specialty: "Neurologist",
    experience: "11 Years",
    fee: "₹900",
    rating: "4.7",
    reviews: "88 reviews",
    available: "Next Monday, 11:15 AM",
    initials: "MV",
  },
];

/* =========================================================
   AUTH HELPERS
========================================================= */

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("carelinkUser"));
  } catch {
    return null;
  }
};

const isLoggedIn = () => {
  return Boolean(localStorage.getItem("carelinkToken"));
};

/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      <div className="floating-shape shape-one"></div>
      <div className="floating-shape shape-two"></div>
      <div className="floating-shape shape-three"></div>

      <header className="landing-navbar">
        <Link to="/" className="landing-logo">
          <span className="landing-logo-icon">+</span>
          Care<span>Link</span>
        </Link>

        <div className="landing-nav-actions">
          <Link to="/login" className="landing-login">
            Login
          </Link>

          <Link to="/register" className="landing-register">
            Register
          </Link>
        </div>
      </header>

      <main className="landing-content">

        <div className="landing-text">

          <span className="hero-badge">
            CARELINK HEALTHCARE
          </span>

          <h1>
            Your Health.
            <br />
            <span>Connected.</span>
          </h1>

          <p>
            Book appointments, connect with trusted doctors,
            manage your medical records and stay in control
            of your healthcare journey.
          </p>

          <div className="landing-buttons">

            <button
              className="primary-btn large-btn"
              onClick={() => navigate("/register")}
            >
              Get Started →
            </button>

            <button
              className="secondary-btn large-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>

          </div>

          <div className="hero-features">
            <span>✓ Verified Doctors</span>
            <span>✓ Secure Records</span>
            <span>✓ Easy Booking</span>
          </div>

        </div>

        <div className="landing-art">

          <div className="medical-orbit orbit-one"></div>
          <div className="medical-orbit orbit-two"></div>

          <div className="medical-heart">
            +
          </div>

          <div className="floating-card card-one">
            <span>✓</span>
            <div>
              <strong>Secure Records</strong>
              <small>Your data is protected</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <span>♥</span>
            <div>
              <strong>Trusted Care</strong>
              <small>Top healthcare professionals</small>
            </div>
          </div>

          <div className="floating-card card-three">
            <span>▣</span>
            <div>
              <strong>Easy Booking</strong>
              <small>Book in a few clicks</small>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

/* =========================================================
   REGISTER
========================================================= */

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const user = {
      name: form.name,
      email: form.email,
      role: "PATIENT",
    };

    localStorage.setItem(
      "carelinkRegisteredUser",
      JSON.stringify({
        ...user,
        password: form.password,
      })
    );

    navigate("/login", {
      state: {
        registered: true,
      },
    });
  };

  return (
    <div className="auth-page">

      <div className="auth-background">
        <div className="auth-circle circle-one"></div>
        <div className="auth-circle circle-two"></div>
        <div className="auth-circle circle-three"></div>
      </div>

      <Link to="/" className="auth-brand">
        <span>+</span>
        Care<span>Link</span>
      </Link>

      <div className="auth-card">

        <div className="auth-side">

          <div className="auth-side-content">

            <span className="hero-badge">
              CARELINK HEALTHCARE
            </span>

            <h1>
              Start your
              <br />
              <span>health journey.</span>
            </h1>

            <p>
              Create your CareLink account and manage
              appointments, doctors and health records
              from one simple platform.
            </p>

            <div className="auth-points">
              <div>✓ Easy appointment booking</div>
              <div>✓ Trusted healthcare professionals</div>
              <div>✓ Secure medical information</div>
            </div>

          </div>

        </div>

        <div className="auth-form-container">

          <div className="auth-heading">
            <span className="page-tag">
              CREATE ACCOUNT
            </span>

            <h2>Create your account</h2>

            <p>
              Join CareLink and take control of your healthcare.
            </p>
          </div>

          <form onSubmit={handleRegister}>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
            />

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />

            <button
              type="submit"
              className="auth-submit"
            >
              Create Account →
            </button>

          </form>

          <div className="auth-footer">
            Already have an account?
            <Link to="/login"> Sign in</Link>
          </div>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const registeredUser = JSON.parse(
      localStorage.getItem("carelinkRegisteredUser")
    );

    if (!registeredUser) {
      setError("No account found. Please register first.");
      return;
    }

    if (
      email !== registeredUser.email ||
      password !== registeredUser.password
    ) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem(
      "carelinkUser",
      JSON.stringify({
        name: registeredUser.name,
        email: registeredUser.email,
        role: "PATIENT",
      })
    );

    localStorage.setItem(
      "carelinkToken",
      "carelink-demo-token"
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-background">
        <div className="auth-circle circle-one"></div>
        <div className="auth-circle circle-two"></div>
        <div className="auth-circle circle-three"></div>
      </div>

      <Link to="/" className="auth-brand">
        <span>+</span>
        Care<span>Link</span>
      </Link>

      <div className="login-wrapper">

        <div className="login-visual">

          <span className="hero-badge">
            PATIENT PORTAL
          </span>

          <h1>
            Welcome
            <br />
            <span>back.</span>
          </h1>

          <p>
            Continue your healthcare journey with
            CareLink. Manage your appointments,
            records and doctors in one place.
          </p>

          <div className="login-medical-animation">
            <div className="login-pulse-ring"></div>
            <div className="login-pulse-ring second"></div>

            <div className="login-plus">
              +
            </div>
          </div>

        </div>

        <div className="login-card">

          <div className="auth-heading">

            <span className="page-tag">
              WELCOME BACK
            </span>

            <h2>Sign in to CareLink</h2>

            <p>
              Enter your details to access your dashboard.
            </p>

          </div>

          <form onSubmit={handleLogin}>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <label>Email Address</label>

            <div className="input-wrapper">
              <span>✉</span>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
              />
            </div>

            <label>Password</label>

            <div className="input-wrapper">
              <span>●</span>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              Sign In →
            </button>

          </form>

          <div className="auth-footer">
            Don't have an account?
            <Link to="/register"> Create account</Link>
          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard() {

  const navigate = useNavigate();

  const storedUser = getStoredUser();

  const userName =
    storedUser?.name || "Vijay Raj";

  const [activePage, setActivePage] =
    useState("Dashboard");

  const [search, setSearch] =
    useState("");

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showBooking, setShowBooking] =
    useState(false);

  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  const [toast, setToast] =
    useState("");

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [appointments, setAppointments] =
    useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("carelinkAppointments")
      ) || [];

    setAppointments(saved);
  }, []);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleLogout = () => {

    localStorage.removeItem("carelinkToken");
    localStorage.removeItem("carelinkUser");

    showToast("Logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const openBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const bookAppointment = () => {

    if (!selectedDoctor) return;

    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: "Tomorrow",
      time: selectedDoctor.available,
    };

    const updated = [
      ...appointments,
      newAppointment,
    ];

    setAppointments(updated);

    localStorage.setItem(
      "carelinkAppointments",
      JSON.stringify(updated)
    );

    setShowBooking(false);

    showToast(
      "Appointment booked successfully!"
    );
  };

  const filteredDoctors =
    doctors.filter(
      (doctor) =>
        doctor.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        doctor.specialty
          .toLowerCase()
          .includes(search.toLowerCase())
    );

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

  const goTo = (page) => {
    setActivePage(page);
    setMobileMenu(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="dashboard-app">

      {/* MOBILE OVERLAY */}

      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`sidebar ${
          mobileMenu ? "sidebar-open" : ""
        }`}
      >

        <div className="logo">

          <div className="logo-icon">
            +
          </div>

          <span>
            Care<span>Link</span>
          </span>

        </div>

        <div className="patient-mini">

          <div className="avatar">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{userName}</strong>
            <small>Patient</small>
          </div>

        </div>

        <nav className="sidebar-nav">

          {menuItems.map((item) => (

            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name
                  ? "active"
                  : ""
              }`}
              onClick={() => goTo(item.name)}
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
            <strong>Need help?</strong>

            <p>
              Our support team is available
              24/7 for you.
            </p>

            <button
              onClick={() =>
                showToast(
                  "Support team will contact you."
                )
              }
            >
              Contact Support
            </button>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="main">

        {/* TOPBAR */}

        <header className="topbar">

          <button
            className="mobile-menu-btn"
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
          >
            ☰
          </button>

          <div className="topbar-title">

            <span>
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
              className="notification-btn"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
            >
              🔔

              <span className="notification-dot"></span>

            </button>

            <div className="profile-top">

              <div className="avatar small">
                {userName.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{userName}</strong>
                <small>Patient</small>
              </div>

              <span>⌄</span>

            </div>

          </div>

          {showNotifications && (

            <div className="notification-panel">

              <h3>Notifications</h3>

              <div className="notification">

                <span className="notification-circle">
                  ✓
                </span>

                <div>
                  <strong>
                    Welcome to CareLink
                  </strong>

                  <p>
                    Your account is ready to use.
                  </p>
                </div>

              </div>

              <div className="notification">

                <span className="notification-circle">
                  !
                </span>

                <div>
                  <strong>
                    Health reminder
                  </strong>

                  <p>
                    Keep your medical records updated.
                  </p>
                </div>

              </div>

            </div>

          )}

        </header>

        {/* CONTENT */}

        <section className="content">

          {/* ================= DASHBOARD ================= */}

          {activePage === "Dashboard" && (

            <>

              <div className="breadcrumb">
                Patient Portal <span>/</span> Overview
              </div>

              {/* WELCOME */}

              <div className="welcome-card">

                <div className="welcome-content">

                  <span className="welcome-tag">
                    CARELINK HEALTHCARE
                  </span>

                  <h1>
                    Good morning,{" "}
                    <span>{userName}!</span>
                  </h1>

                  <p>
                    Take control of your healthcare
                    journey. Book appointments,
                    manage records and stay connected
                    with your doctors.
                  </p>

                  <div className="welcome-buttons">

                    <button
                      className="primary-btn"
                      onClick={() =>
                        goTo("Find Doctors")
                      }
                    >
                      Find a Doctor →
                    </button>

                    <button
                      className="secondary-btn"
                      onClick={() =>
                        goTo("Appointments")
                      }
                    >
                      View Appointments
                    </button>

                  </div>

                  <div className="welcome-checks">

                    <span>✓ Verified Doctors</span>
                    <span>✓ Secure Records</span>
                    <span>✓ Easy Booking</span>

                  </div>

                </div>

                <div className="medical-art">

                  <div className="art-ring ring-one"></div>

                  <div className="art-ring ring-two"></div>

                  <div className="pulse-circle">
                    +
                  </div>

                  <div className="pulse-wave">
                    ~
                  </div>

                  <div className="art-badge badge-safe">
                    <span>✓</span>
                    Secure
                  </div>

                  <div className="art-badge badge-care">
                    <span>♥</span>
                    Healthcare
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
                    <strong>{appointments.length}</strong>
                    <small>Total appointments</small>
                  </div>

                  <b>→</b>

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

                  <b>→</b>

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

                  <b>→</b>

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

                  <b>→</b>

                </div>

              </div>

              {/* QUICK ACTIONS */}

              <div className="section-heading">

                <div>
                  <span className="section-label">
                    SHORTCUTS
                  </span>

                  <h2>Quick Actions</h2>

                  <p>
                    Everything you need in one place
                  </p>
                </div>

              </div>

              <div className="quick-grid">

                <QuickAction
                  icon="♙"
                  title="Find a Doctor"
                  description="Browse specialists and doctors"
                  className="blue-bg"
                  onClick={() =>
                    goTo("Find Doctors")
                  }
                />

                <QuickAction
                  icon="▣"
                  title="My Appointments"
                  description="Schedule or manage appointments"
                  className="green-bg"
                  onClick={() =>
                    goTo("Appointments")
                  }
                />

                <QuickAction
                  icon="▤"
                  title="Health Records"
                  description="Access medical history"
                  className="purple-bg"
                  onClick={() =>
                    goTo("Health Records")
                  }
                />

                <QuickAction
                  icon="▥"
                  title="Prescriptions"
                  description="Check your prescriptions"
                  className="orange-bg"
                  onClick={() =>
                    goTo("Prescriptions")
                  }
                />

              </div>

              {/* DOCTORS */}

              <div className="section-heading doctors-heading">

                <div>
                  <span className="section-label">
                    OUR SPECIALISTS
                  </span>

                  <h2>Recommended Doctors</h2>

                  <p>
                    Top-rated specialists near you
                  </p>
                </div>

                <button
                  className="view-all"
                  onClick={() =>
                    goTo("Find Doctors")
                  }
                >
                  View all →
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

          {/* ================= FIND DOCTORS ================= */}

          {activePage === "Find Doctors" && (

            <div className="page-card">

              <div className="page-title">

                <span className="page-tag">
                  CARELINK
                </span>

                <h1>Find Your Doctor</h1>

                <p>
                  Choose the right specialist for your
                  healthcare needs.
                </p>

              </div>

              <div className="search-area">

                <div className="search-box">

                  🔍

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search doctors or specialties..."
                  />

                </div>

                <select>
                  <option>
                    All Specialties
                  </option>
                  <option>
                    Cardiologist
                  </option>
                  <option>
                    Dermatologist
                  </option>
                  <option>
                    Pediatrician
                  </option>
                  <option>
                    Neurologist
                  </option>
                </select>

              </div>

              <div className="doctor-grid">

                {filteredDoctors.map(
                  (doctor) => (

                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onBook={openBooking}
                    />

                  )
                )}

              </div>

            </div>

          )}

          {/* ================= APPOINTMENTS ================= */}

          {activePage === "Appointments" && (

            <div className="page-card">

              <div className="page-title">

                <span className="page-tag">
                  APPOINTMENTS
                </span>

                <h1>My Appointments</h1>

                <p>
                  View and manage your upcoming
                  appointments.
                </p>

              </div>

              {appointments.length === 0 ? (

                <div className="appointment-empty">

                  <div className="empty-icon">
                    ▣
                  </div>

                  <h2>
                    No appointments yet
                  </h2>

                  <p>
                    You haven't booked any appointments.
                    Find a doctor and schedule your
                    first visit.
                  </p>

                  <button
                    className="primary-btn"
                    onClick={() =>
                      goTo("Find Doctors")
                    }
                  >
                    Find a Doctor →
                  </button>

                </div>

              ) : (

                <div className="appointment-list">

                  {appointments.map(
                    (appointment) => (

                      <div
                        className="appointment-card"
                        key={appointment.id}
                      >

                        <div className="doctor-avatar">
                          {appointment.doctor
                            .split(" ")
                            .slice(1)
                            .map((x) =>
                              x[0]
                            )
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div className="appointment-info">

                          <strong>
                            {appointment.doctor}
                          </strong>

                          <span>
                            {appointment.specialty}
                          </span>

                        </div>

                        <div className="appointment-time">

                          <strong>
                            {appointment.date}
                          </strong>

                          <span>
                            {appointment.time}
                          </span>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          )}

          {/* ================= OTHER PAGES ================= */}

          {activePage === "Health Records" && (

            <SimplePage
              icon="▤"
              title="Health Records"
              description="Keep your medical history organized and accessible."
              action="Add Health Record"
              onAction={() =>
                showToast(
                  "Health record feature selected"
                )
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
                showToast(
                  "No prescriptions available"
                )
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
                showToast(
                  "Messaging feature selected"
                )
              }
            />

          )}

          {activePage === "Profile" && (

            <div className="page-card">

              <div className="profile-header">

                <div className="large-avatar">
                  {userName.charAt(0).toUpperCase()}
                </div>

                <div>

                  <span className="page-tag">
                    PATIENT PROFILE
                  </span>

                  <h1>{userName}</h1>

                  <p>
                    Manage your personal information
                  </p>

                </div>

              </div>

              <div className="profile-details">

                <div>
                  <label>Full Name</label>
                  <strong>{userName}</strong>
                </div>

                <div>
                  <label>Email</label>
                  <strong>
                    {storedUser?.email ||
                      "Not available"}
                  </strong>
                </div>

                <div>
                  <label>Account Type</label>
                  <strong>Patient</strong>
                </div>

                <div>
                  <label>Appointments</label>
                  <strong>
                    {appointments.length}
                  </strong>
                </div>

              </div>

            </div>

          )}

          {activePage === "Settings" && (

            <div className="page-card">

              <div className="page-title">

                <span className="page-tag">
                  SETTINGS
                </span>

                <h1>Account Settings</h1>

                <p>
                  Manage your CareLink preferences.
                </p>

              </div>

              <div className="settings-list">

                <div className="setting-item">

                  <div>
                    <h3>Notifications</h3>
                    <p>
                      Receive appointment and health reminders.
                    </p>
                  </div>

                  <div className="toggle active-toggle"></div>

                </div>

                <div className="setting-item">

                  <div>
                    <h3>Appointment Reminders</h3>
                    <p>
                      Get reminders before scheduled visits.
                    </p>
                  </div>

                  <div className="toggle active-toggle"></div>

                </div>

                <div className="setting-item">

                  <div>
                    <h3>Privacy</h3>
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

      {/* BOOKING MODAL */}

      {showBooking && selectedDoctor && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowBooking(false)
          }
        >

          <div
            className="booking-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-modal"
              onClick={() =>
                setShowBooking(false)
              }
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
              Schedule a consultation with your
              selected doctor.
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
            />

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

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon,
  title,
  description,
  className,
  onClick,
}) {
  return (
    <button
      className="quick-card"
      onClick={onClick}
    >

      <div
        className={`quick-icon ${className}`}
      >
        {icon}
      </div>

      <div>

        <h3>{title}</h3>

        <p>{description}</p>

      </div>

      <span>→</span>

    </button>
  );
}

/* =========================================================
   DOCTOR CARD
========================================================= */

function DoctorCard({ doctor, onBook }) {
  return (
    <div className="doctor-card">

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

      <div className="doctor-rating">
        ★ {doctor.rating}
        <span>
          ({doctor.reviews})
        </span>
      </div>

      <div className="doctor-info">

        <span>Experience</span>
        <strong>{doctor.experience}</strong>

      </div>

      <div className="doctor-info">

        <span>Consultation</span>
        <strong>{doctor.fee}</strong>

      </div>

      <div className="doctor-available">

        <span>Next Available</span>

        <strong>
          {doctor.available}
        </strong>

      </div>

      <button
        className="book-btn"
        onClick={() => onBook(doctor)}
      >
        Book Appointment →
      </button>

    </div>
  );
}

/* =========================================================
   SIMPLE PAGE
========================================================= */

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

        <h1>{title}</h1>

        <p>{description}</p>

      </div>

      <div className="appointment-empty">

        <div className="empty-icon">
          {icon}
        </div>

        <h2>
          Nothing here yet
        </h2>

        <p>
          Your {title.toLowerCase()} will
          appear here when information
          becomes available.
        </p>

        <button
          className="primary-btn"
          onClick={onAction}
        >
          {action}
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   APP ROUTER
========================================================= */

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;