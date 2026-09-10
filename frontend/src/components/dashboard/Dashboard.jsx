import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import DomainChart from "./DomainChart";
import RecentActivity from "./RecentActivity";
import StatCards from "./StatsCard";

const Dashboard = () => {
  const { user } = useSelector(
    (state) => state.auth || {}
  );

  const role = user?.role || "PATIENT";

  /* =====================================================
     PATIENT DASHBOARD DATA
  ===================================================== */

  const patientStats = [
    {
      label: "Appointments",
      value: "0",
    },
    {
      label: "Upcoming",
      value: "0",
    },
    {
      label: "Completed",
      value: "0",
    },
    {
      label: "Doctors",
      value: "0",
    },
  ];

  const patientChartData = [
    {
      label: "Mon",
      value: 2,
    },
    {
      label: "Tue",
      value: 4,
    },
    {
      label: "Wed",
      value: 3,
    },
    {
      label: "Thu",
      value: 5,
    },
    {
      label: "Fri",
      value: 2,
    },
    {
      label: "Sat",
      value: 3,
    },
  ];

  const patientActivities = [
    {
      title: "Welcome to CareLink",
      date: "Today",
    },
    {
      title: "Patient account created",
      date: "Today",
    },
  ];


  /* =====================================================
     DOCTOR DASHBOARD DATA
  ===================================================== */

  const doctorStats = [
    {
      label: "Today's Appointments",
      value: "0",
    },
    {
      label: "Consultations",
      value: "0",
    },
    {
      label: "Available Slots",
      value: "0",
    },
    {
      label: "Patients",
      value: "0",
    },
  ];

  const doctorChartData = [
    {
      label: "Mon",
      value: 5,
    },
    {
      label: "Tue",
      value: 7,
    },
    {
      label: "Wed",
      value: 4,
    },
    {
      label: "Thu",
      value: 8,
    },
    {
      label: "Fri",
      value: 6,
    },
    {
      label: "Sat",
      value: 3,
    },
  ];

  const doctorActivities = [
    {
      title: "Doctor account created",
      date: "Today",
    },
    {
      title: "CareLink doctor portal accessed",
      date: "Today",
    },
  ];


  /* =====================================================
     PATIENT DASHBOARD
  ===================================================== */

  if (role === "PATIENT") {
    return (
      <div className="dashboard-page">

        <div className="dashboard-container">

          {/* Header */}
          <div className="dashboard-header">

            <div>
              <span className="dashboard-label">
                PATIENT DASHBOARD
              </span>

              <h1>
                Welcome, {user?.fullName || "Patient"} 👋
              </h1>

              <p>
                Manage your appointments and healthcare
                activities from one place.
              </p>
            </div>

            <div className="dashboard-avatar">
              {user?.fullName
                ? user.fullName.charAt(0).toUpperCase()
                : "P"}
            </div>

          </div>


          {/* Statistics */}
          <div className="dashboard-stat-section">

            <StatCards
              stats={patientStats}
            />

          </div>


          {/* Quick Actions */}
          <div className="dashboard-section">

            <div className="section-title">

              <span>
                QUICK ACTIONS
              </span>

              <h2>
                Manage Your Healthcare
              </h2>

            </div>


            <div className="dashboard-action-grid">

              <Link
                to="/doctor-list"
                className="dashboard-action-card"
              >

                <div className="action-icon">
                  👨‍⚕️
                </div>

                <div>
                  <h3>
                    Find a Doctor
                  </h3>

                  <p>
                    Browse doctors and find the
                    right specialist for you.
                  </p>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </Link>


              <Link
                to="/appointments"
                className="dashboard-action-card"
              >

                <div className="action-icon">
                  📅
                </div>

                <div>
                  <h3>
                    My Appointments
                  </h3>

                  <p>
                    View and manage your hospital
                    appointments.
                  </p>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </Link>


              <Link
                to="/doctor-list"
                className="dashboard-action-card"
              >

                <div className="action-icon">
                  ➕
                </div>

                <div>
                  <h3>
                    Book Appointment
                  </h3>

                  <p>
                    Schedule a consultation with
                    a doctor.
                  </p>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </Link>


              <div className="dashboard-action-card">

                <div className="action-icon">
                  ❤️
                </div>

                <div>
                  <h3>
                    Health Profile
                  </h3>

                  <p>
                    View your personal healthcare
                    information.
                  </p>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </div>

            </div>

          </div>


          {/* Chart + Activity */}
          <div className="dashboard-bottom-grid">

            <DomainChart
              data={patientChartData}
              title="Appointment Activity"
            />

            <RecentActivity
              activities={patientActivities}
            />

          </div>

        </div>

      </div>
    );
  }


  /* =====================================================
     DOCTOR DASHBOARD
  ===================================================== */

  if (role === "DOCTOR") {
    return (
      <div className="dashboard-page">

        <div className="dashboard-container">

          {/* Header */}
          <div className="dashboard-header">

            <div>

              <span className="dashboard-label">
                DOCTOR DASHBOARD
              </span>

              <h1>
                Welcome, Dr.{" "}
                {user?.fullName || "Doctor"} 👋
              </h1>

              <p>
                Manage your schedule, consultations
                and patients from one place.
              </p>

            </div>

            <div className="dashboard-avatar doctor-avatar">

              {user?.fullName
                ? user.fullName.charAt(0).toUpperCase()
                : "D"}

            </div>

          </div>


          {/* Statistics */}
          <div className="dashboard-stat-section">

            <StatCards
              stats={doctorStats}
            />

          </div>


          {/* Doctor Actions */}
          <div className="dashboard-section">

            <div className="section-title">

              <span>
                DOCTOR SERVICES
              </span>

              <h2>
                Manage Your Practice
              </h2>

            </div>


            <div className="dashboard-action-grid">

              <Link
                to="/schedule"
                className="dashboard-action-card"
              >

                <div className="action-icon">
                  📅
                </div>

                <div>
                  <h3>
                    My Schedule
                  </h3>

                  <p>
                    View and manage your available
                    consultation slots.
                  </p>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </Link>


              <Link
                to="/consultations"
                className="dashboard-action-card"
              >

                <div className="action-icon">
                  🩺
                </div>

                <div>
                  <h3>
                    Consultations
                  </h3>

                  <p>
                    View your patient consultations
                    and appointment details.
                  </p>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </Link>


              <div className="dashboard-action-card">

                <div className="action-icon">
                  👥
                </div>

                <div>
                  <h3>
                    My Patients
                  </h3>

                  <p>
                    View patients associated with
                    your consultations.
                  </p>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </div>


              <div className="dashboard-action-card">

                <div className="action-icon">
                  👨‍⚕️
                </div>

                <div>
                  <h3>
                    Doctor Profile
                  </h3>

                  <p>
                    View your specialization,
                    experience and profile.
                  </p>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </div>

            </div>

          </div>


          {/* Chart + Activity */}
          <div className="dashboard-bottom-grid">

            <DomainChart
              data={doctorChartData}
              title="Weekly Consultation Activity"
            />

            <RecentActivity
              activities={doctorActivities}
            />

          </div>

        </div>

      </div>
    );
  }


  /* =====================================================
     DEFAULT DASHBOARD
  ===================================================== */

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        <div className="dashboard-header">

          <div>

            <span className="dashboard-label">
              CARELINK
            </span>

            <h1>
              Welcome to CareLink 👋
            </h1>

            <p>
              Your healthcare management system.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;