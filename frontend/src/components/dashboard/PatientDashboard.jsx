import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/slices/authSlice";

import "./Dashboard.css";


const PatientDashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth || {}
  );


  const userName =
    user?.fullName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Patient";


  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/");
  };


  return (
    <div className="care-dashboard patient-dashboard">


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          <div className="logo-heart">
            ✚
          </div>

          <span>CareLink</span>
        </div>


        <nav className="dashboard-nav">

          <button className="dashboard-nav-item active">
            <span>⌂</span>
            Dashboard
          </button>


          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/doctor-list")}
          >
            <span>♙</span>
            Find Doctors
          </button>


          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/book-appointment")}
          >
            <span>▣</span>
            Book Appointment
          </button>


          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/appointments")}
          >
            <span>▣</span>
            My Appointments
          </button>


          <button className="dashboard-nav-item">
            <span>▤</span>
            Health Records
          </button>


          <button className="dashboard-nav-item">
            <span>▧</span>
            Prescriptions
          </button>


          <button className="dashboard-nav-item">
            <span>◯</span>
            Messages
          </button>


          <button className="dashboard-nav-item">
            <span>♙</span>
            Profile
          </button>


          <button className="dashboard-nav-item">
            <span>⚙</span>
            Settings
          </button>

        </nav>


        <button
          className="dashboard-logout"
          onClick={handleLogout}
        >
          <span>⇥</span>
          Logout
        </button>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="dashboard-main">


        {/* TOP BAR */}

        <header className="dashboard-topbar">

          <div />

          <div className="topbar-user">

            <button className="notification-button">
              ♧
              <span className="notification-dot" />
            </button>


            <div className="user-avatar patient-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>


            <div className="user-info">

              <strong>
                {userName}
              </strong>

              <span>
                Patient
              </span>

            </div>

          </div>

        </header>


        <div className="dashboard-content">


          {/* =================================================
              WELCOME
          ================================================= */}

          <section className="dashboard-heading">

            <h1>
              Hi, {userName}! <span>👋</span>
            </h1>

            <p>
              Take charge of your health with CareLink.
            </p>

          </section>


          {/* =================================================
              HERO BANNER
          ================================================= */}

          <section className="patient-hero">

            <div className="patient-hero-content">

              <h2>
                Better Health
                <br />
                Brighter Tomorrow
              </h2>

              <p>
                Book appointments, manage your
                health records and stay connected
                with your doctors.
              </p>

              <button
                className="hero-button patient-button"
                onClick={() =>
                  navigate("/book-appointment")
                }
              >
                <span>▣</span>
                Book an Appointment
              </button>

            </div>


            <div className="patient-hero-art">

              <div className="leaf leaf-one">
                🌿
              </div>

              <div className="patient-woman">
                👩🏻
              </div>

              <div className="heart-shape">
                ♥
              </div>

            </div>


            <div className="hero-script">
              Your Health
              <br />
              Matters
            </div>

          </section>


          {/* =================================================
              STATS
          ================================================= */}

          <section className="dashboard-stats">


            <div className="dashboard-stat">

              <div className="stat-icon mint">
                ▣
              </div>

              <div>
                <span>Appointments</span>
                <strong>3</strong>
                <small>Upcoming</small>
              </div>

            </div>


            <div className="dashboard-stat">

              <div className="stat-icon teal">
                ▤
              </div>

              <div>
                <span>Health Records</span>
                <strong>5</strong>
                <small>Total Records</small>
              </div>

            </div>


            <div className="dashboard-stat">

              <div className="stat-icon orange">
                ▧
              </div>

              <div>
                <span>Prescriptions</span>
                <strong>2</strong>
                <small>Active</small>
              </div>

            </div>


            <div className="dashboard-stat">

              <div className="stat-icon coral">
                ◯
              </div>

              <div>
                <span>Messages</span>
                <strong>1</strong>
                <small>Unread</small>
              </div>

            </div>

          </section>


          {/* =================================================
              APPOINTMENT + QUICK ACTIONS
          ================================================= */}

          <section className="two-column-grid">


            {/* NEXT APPOINTMENT */}

            <div className="dashboard-card appointment-card">

              <div className="card-heading">

                <h3>
                  Next Appointment
                </h3>

              </div>


              <div className="doctor-appointment">

                <div className="doctor-photo">
                  👩🏻‍⚕️
                </div>

                <div className="appointment-doctor">

                  <strong>
                    Dr. Ananya Sharma
                  </strong>

                  <span>
                    Cardiologist
                  </span>

                  <small>
                    ▣ &nbsp; Mon, 15 Sep 2025
                  </small>

                  <small>
                    ◷ &nbsp; 10:00 AM
                  </small>

                  <small>
                    ♧ &nbsp; City Care Hospital
                  </small>

                </div>

              </div>


              <div className="appointment-actions">

                <button className="outline-button">
                  View Details
                </button>

                <button className="green-button">
                  Reschedule
                </button>

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="dashboard-card">

              <div className="card-heading">
                <h3>Quick Actions</h3>
              </div>


              <div className="quick-action-grid">


                <button
                  className="quick-action green-action"
                  onClick={() =>
                    navigate("/book-appointment")
                  }
                >
                  <span>▣</span>
                  <small>Book Appointment</small>
                </button>


                <button
                  className="quick-action blue-action"
                  onClick={() =>
                    navigate("/doctor-list")
                  }
                >
                  <span>⌕</span>
                  <small>Find Doctors</small>
                </button>


                <button className="quick-action orange-action">
                  <span>▤</span>
                  <small>View Prescriptions</small>
                </button>


                <button className="quick-action sky-action">
                  <span>☁</span>
                  <small>Upload Health Record</small>
                </button>

              </div>

            </div>

          </section>


          {/* =================================================
              RECOMMENDED DOCTORS
          ================================================= */}

          <section className="dashboard-card">

            <div className="card-heading">

              <h3>
                Recommended Doctors
              </h3>

              <button className="view-all">
                View All
              </button>

            </div>


            <div className="recommended-doctors">


              <DoctorMiniCard
                avatar="👨🏻‍⚕️"
                name="Dr. Rohan Mehta"
                specialty="General Physician"
                rating="4.8"
                reviews="120"
                onClick={() =>
                  navigate("/doctor-list")
                }
              />


              <DoctorMiniCard
                avatar="👩🏻‍⚕️"
                name="Dr. Priya Nair"
                specialty="Dermatologist"
                rating="4.7"
                reviews="98"
                onClick={() =>
                  navigate("/doctor-list")
                }
              />


              <DoctorMiniCard
                avatar="👨🏻‍⚕️"
                name="Dr. Arjun Patel"
                specialty="Orthopedic"
                rating="4.6"
                reviews="76"
                onClick={() =>
                  navigate("/doctor-list")
                }
              />

            </div>

          </section>


          {/* =================================================
              BOTTOM
          ================================================= */}

          <section className="patient-bottom-grid">


            {/* RECENT ACTIVITY */}

            <div className="dashboard-card">

              <div className="card-heading">

                <h3>
                  Recent Activity
                </h3>

              </div>


              <ActivityItem
                icon="▣"
                text="Appointment booked with Dr. Ananya Sharma"
                time="2 days ago"
              />

              <ActivityItem
                icon="▤"
                text="Prescription updated"
                time="5 days ago"
              />

              <ActivityItem
                icon="▧"
                text="Health record uploaded"
                time="1 week ago"
              />

              <ActivityItem
                icon="▣"
                text="Appointment completed with Dr. Karan Singh"
                time="2 weeks ago"
              />

            </div>


            {/* WELLNESS CARD */}

            <div className="wellness-card">

              <div className="wellness-icon">
                🍎
              </div>

              <h3>
                Small Steps
                <br />
                Big Changes
              </h3>

              <p>
                Stay consistent, stay healthy!
              </p>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};


/* =========================================================
   DOCTOR MINI CARD
========================================================= */

const DoctorMiniCard = ({
  avatar,
  name,
  specialty,
  rating,
  reviews,
  onClick,
}) => (

  <div className="recommended-doctor">

    <div className="recommended-avatar">
      {avatar}
    </div>

    <strong>
      {name}
    </strong>

    <span>
      {specialty}
    </span>

    <div className="doctor-rating">
      ★ {rating}
      <small>
        ({reviews} reviews)
      </small>
    </div>

    <button onClick={onClick}>
      Book Now
    </button>

  </div>
);


/* =========================================================
   ACTIVITY
========================================================= */

const ActivityItem = ({
  icon,
  text,
  time,
}) => (

  <div className="activity-item">

    <div className="activity-icon">
      {icon}
    </div>

    <div>

      <strong>
        {text}
      </strong>

      <span>
        {time}
      </span>

    </div>

  </div>
);


export default PatientDashboard;