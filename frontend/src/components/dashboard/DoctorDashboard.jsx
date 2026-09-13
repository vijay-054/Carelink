import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDoctorAppointments,
} from "../../store/slices/appointmentSlice";

import { logout } from "../../store/slices/authSlice";

import "./Dashboard.css";


const DoctorDashboard = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth || {}
  );

  const {
    items: appointments = [],
    isLoading,
    isError,
    error,
  } = useSelector(
    (state) => state.appointments || {}
  );

  useEffect(() => {
    dispatch(getDoctorAppointments());
  }, [dispatch]);

  const pendingAppointments =
    appointments.filter(
      (appointment) =>
        appointment?.status === "PENDING"
    );

  const totalPatients =
    new Set(
      appointments
        .map(
          (appointment) =>
            appointment?.patient?.id
        )
        .filter(Boolean)
    ).size;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth || {}
  );


  const userName =
    user?.fullName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Doctor";


const handleLogout = () => {

  dispatch(logout());

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("authToken");
  localStorage.removeItem("carelinkToken");
  localStorage.removeItem("carelinkUser");

  window.location.href = "/";
};


  return (

    <div className="care-dashboard doctor-dashboard">


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="dashboard-sidebar doctor-sidebar">

        <div className="dashboard-logo">

          <div className="logo-heart doctor-logo">
            ✚
          </div>

          <span>
            CareLink
          </span>

        </div>


        <nav className="dashboard-nav">


          <button className="dashboard-nav-item active">
            <span>⌂</span>
            Dashboard
          </button>


          <button
            className="dashboard-nav-item"
            onClick={() =>
              navigate("/schedule")
            }
          >
            <span>▣</span>
            Appointments
          </button>


          <button className="dashboard-nav-item">
            <span>♙</span>
            My Patients
          </button>


          <button
            className="dashboard-nav-item"
            onClick={() =>
              navigate("/schedule")
            }
          >
            <span>▣</span>
            Schedule
          </button>


          <button
            className="dashboard-nav-item"
            onClick={() =>
              navigate("/consultations")
            }
          >
            <span>▤</span>
            Consultations
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
          MAIN
      ===================================================== */}

      <main className="dashboard-main">


        {/* TOPBAR */}

        <header className="dashboard-topbar">

          <div />


          <div className="topbar-user">

            <button className="notification-button doctor-notification">
              ♧
              <span className="notification-dot" />
            </button>


            <div className="user-avatar doctor-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>


            <div className="user-info">

              <strong>
                Dr. {userName}
              </strong>

              <span>
                Doctor
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
              Welcome back, Dr. {userName}! <span>👋</span>
            </h1>

            <p>
              Manage your schedule, patients and consultations.
            </p>

          </section>


          {/* =================================================
              HERO
          ================================================= */}

          <section className="doctor-hero">

            <div className="doctor-hero-content">

              <h2>
                Healthcare
                <br />
                Makes a Difference
              </h2>

              <p>
                Your expertise brings healthier tomorrows.
                Keep up the great work!
              </p>

            </div>


            <div className="stethoscope">
              🩺
            </div>


            <div className="doctor-script">
              Care
              <br />
              Heal
              <br />
              Inspire
            </div>

          </section>


          {/* =================================================
              DOCTOR STATS
          ================================================= */}

          <section className="dashboard-stats">


            <DoctorStat
              icon="▣"
              title="Today's Appointments"
              value="8"
              change="+2 from yesterday"
              type="blue"
            />


            <DoctorStat
              icon="♙"
              title="Total Patients"
              value="124"
              change="+12 this month"
              type="purple"
            />


            <DoctorStat
              icon="▤"
              title="Consultations"
              value="56"
              change="+18% this month"
              type="mint"
            />


            <DoctorStat
              icon="↗"
              title="Earnings"
              value="₹28,500"
              change="+20% this month"
              type="green"
            />

          </section>


          {/* =================================================
              SCHEDULE + ACTIONS
          ================================================= */}

          <section className="doctor-middle-grid">


            {/* TODAY'S SCHEDULE */}

            <div className="dashboard-card schedule-card">

              <div className="card-heading">

                <h3>
                  Today's Schedule
                </h3>

                <button className="view-all">
                  View All
                </button>

              </div>


              <ScheduleRow
                time="09:00 AM"
                name="Neha Kapoor"
                type="Follow-up"
                dot="green"
              />

              <ScheduleRow
                time="10:00 AM"
                name="Ramesh Kumar"
                type="Consultation"
                dot="purple"
              />

              <ScheduleRow
                time="11:30 AM"
                name="Priya Sharma"
                type="New Patient"
                dot="orange"
              />

              <ScheduleRow
                time="01:00 PM"
                name="Arjun Verma"
                type="Consultation"
                dot="teal"
              />

              <ScheduleRow
                time="02:30 PM"
                name="Sneha Iyer"
                type="Follow-up"
                dot="blue"
              />

            </div>


            {/* QUICK ACTIONS */}

            <div className="dashboard-card">

              <div className="card-heading">

                <h3>
                  Quick Actions
                </h3>

              </div>


              <div className="quick-action-grid">


                <button
                  className="quick-action doctor-blue-action"
                  onClick={() =>
                    navigate("/schedule")
                  }
                >
                  <span>▣</span>
                  <small>
                    Manage Schedule
                  </small>
                </button>


                <button className="quick-action doctor-purple-action">
                  <span>◷</span>
                  <small>
                    Add Availability
                  </small>
                </button>


                <button className="quick-action doctor-green-action">
                  <span>♙</span>
                  <small>
                    View Patients
                  </small>
                </button>


                <button
                  className="quick-action doctor-mint-action"
                  onClick={() =>
                    navigate("/consultations")
                  }
                >
                  <span>▤</span>
                  <small>
                    Write Prescription
                  </small>
                </button>

              </div>

            </div>

          </section>


          {/* =================================================
              CHARTS
          ================================================= */}

          <section className="doctor-chart-grid">


            {/* PATIENT STATISTICS */}

            <div className="dashboard-card chart-card">

              <div className="card-heading">

                <h3>
                  Patient Statistics
                </h3>

                <select>
                  <option>
                    Last 6 Months
                  </option>
                  <option>
                    Last Year
                  </option>
                </select>

              </div>


              <div className="line-chart">

                <div className="chart-y-axis">
                  <span>80</span>
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                  <span>0</span>
                </div>


                <svg
                  viewBox="0 0 500 220"
                  className="chart-svg"
                >

                  <line
                    x1="40"
                    y1="20"
                    x2="480"
                    y2="20"
                    className="chart-grid-line"
                  />

                  <line
                    x1="40"
                    y1="65"
                    x2="480"
                    y2="65"
                    className="chart-grid-line"
                  />

                  <line
                    x1="40"
                    y1="110"
                    x2="480"
                    y2="110"
                    className="chart-grid-line"
                  />

                  <line
                    x1="40"
                    y1="155"
                    x2="480"
                    y2="155"
                    className="chart-grid-line"
                  />

                  <polyline
                    points="
                      45,160
                      125,125
                      205,105
                      285,120
                      365,75
                      455,45
                    "
                    fill="none"
                    className="chart-line"
                  />


                  <circle
                    cx="45"
                    cy="160"
                    r="5"
                    className="chart-point"
                  />

                  <circle
                    cx="125"
                    cy="125"
                    r="5"
                    className="chart-point"
                  />

                  <circle
                    cx="205"
                    cy="105"
                    r="5"
                    className="chart-point"
                  />

                  <circle
                    cx="285"
                    cy="120"
                    r="5"
                    className="chart-point"
                  />

                  <circle
                    cx="365"
                    cy="75"
                    r="5"
                    className="chart-point"
                  />

                  <circle
                    cx="455"
                    cy="45"
                    r="5"
                    className="chart-point"
                  />

                </svg>


                <div className="chart-months">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>

              </div>

            </div>


            {/* PATIENT DISTRIBUTION */}

            <div className="dashboard-card distribution-card">

              <div className="card-heading">

                <h3>
                  Patient Distribution
                </h3>

              </div>


              <div className="distribution-content">

                <div className="donut-chart">

                  <div className="donut-inner">
                    <strong>124</strong>
                    <span>Patients</span>
                  </div>

                </div>


                <div className="distribution-list">

                  <DistributionItem
                    label="General Checkup"
                    value="40%"
                    type="blue"
                  />

                  <DistributionItem
                    label="Follow-up"
                    value="25%"
                    type="purple"
                  />

                  <DistributionItem
                    label="Chronic Care"
                    value="20%"
                    type="teal"
                  />

                  <DistributionItem
                    label="New Patients"
                    value="15%"
                    type="violet"
                  />

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              BOTTOM
          ================================================= */}

          <section className="doctor-bottom-grid">


            {/* RECENT CONSULTATIONS */}

            <div className="dashboard-card">

              <div className="card-heading">

                <h3>
                  Recent Consultations
                </h3>

                <button className="view-all">
                  View All
                </button>

              </div>


              <ConsultationItem
                avatar="👨🏻"
                name="Rahul Mehta"
                type="General Checkup"
                time="2 hours ago"
              />

              <ConsultationItem
                avatar="👩🏻"
                name="Kavya Nair"
                type="Follow-up"
                time="4 hours ago"
              />

              <ConsultationItem
                avatar="👨🏻"
                name="Siddharth Rao"
                type="Consultation"
                time="6 hours ago"
              />

              <ConsultationItem
                avatar="👩🏻"
                name="Meera Joshi"
                type="Prescription"
                time="1 day ago"
              />

            </div>


            {/* MOTIVATIONAL CARD */}

            <div className="doctor-message-card">

              <div>

                <h3>
                  Great Doctors
                  <br />
                  Build Healthier
                  <br />
                  Communities
                </h3>

                <p>
                  Thank you for
                  making a difference!
                </p>

              </div>


              <div className="doctor-message-art">
                👨🏻‍⚕️
              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};


/* =========================================================
   DOCTOR STAT
========================================================= */

const DoctorStat = ({
  icon,
  title,
  value,
  change,
  type,
}) => (

  <div className="dashboard-stat">

    <div className={`stat-icon ${type}`}>
      {icon}
    </div>

    <div>

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

      <small className="positive-change">
        {change}
      </small>

    </div>

  </div>
);


/* =========================================================
   SCHEDULE ROW
========================================================= */

const ScheduleRow = ({
  time,
  name,
  type,
  dot,
}) => (

  <div className="schedule-row">

    <span className="schedule-time">
      {time}
    </span>

    <span className={`schedule-dot ${dot}`} />

    <strong>
      {name}
    </strong>

    <small>
      {type}
    </small>

  </div>
);


/* =========================================================
   DISTRIBUTION
========================================================= */

const DistributionItem = ({
  label,
  value,
  type,
}) => (

  <div className="distribution-item">

    <span>
      <i className={`distribution-dot ${type}`} />
      {label}
    </span>

    <strong>
      {value}
    </strong>

  </div>
);


/* =========================================================
   CONSULTATION
========================================================= */

const ConsultationItem = ({
  avatar,
  name,
  type,
  time,
}) => (

  <div className="consultation-item">

    <div className="consultation-avatar">
      {avatar}
    </div>

    <strong>
      {name}
    </strong>

    <span>
      {type}
    </span>

    <small>
      {time}
    </small>

  </div>
);


export default DoctorDashboard;