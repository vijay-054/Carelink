import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Login from "./components/Login";
import Register from "./components/Register";

import Dashboard from "./components/dashboard/Dashboard";

import AppointmentList from "./components/appointments/AppointmentList";
import AppointmentForm from "./components/appointments/AppointmentForm";

import DoctorList from "./components/doctors/DoctorList";
import DoctorSchedule from "./components/doctors/DoctorSchedule";
import DoctorConsultations from "./components/doctors/DoctorConsultations";

import ManageDoctors from "./components/admin/ManageDoctors";
import ManagePatients from "./components/admin/ManagePatients";


const Home = () => (

  <div className="home-page">

    <section className="hero-section">

      <div className="hero-content">

        <div className="hero-text">

          <span className="hero-badge">
            CARELINK HEALTHCARE
          </span>

          <h1>
            Hospital Appointment
            <br />
            Management System
          </h1>

          <p>
            CareLink helps you easily book,
            manage, and track your hospital
            appointments in one place.
          </p>

          <div className="hero-actions">

            <Link
              to="/login"
              className="primary-btn"
            >
              Get Started
            </Link>

            <Link
              to="/register"
              className="secondary-btn"
            >
              Create Account
            </Link>

          </div>

        </div>


        <div className="hero-illustration">

          <div className="hospital-card">

            <div className="hospital-cross">
              +
            </div>

            <div className="hospital-building">

              <div className="hospital-roof"></div>

              <div className="hospital-body">

                <h3>
                  HOSPITAL
                </h3>

                <div className="hospital-windows">

                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>

                </div>

                <div className="hospital-door"></div>

              </div>

            </div>

            <div className="doctor-illustration">
              👩‍⚕️
            </div>

          </div>

        </div>

      </div>

    </section>


    <section className="feature-section">

      <div className="section-heading">

        <span>
          OUR SERVICES
        </span>

        <h2>
          Everything You Need
        </h2>

        <p>
          Simple and convenient healthcare
          appointment management.
        </p>

      </div>


      <div className="feature-grid">

        <div className="feature-card">
          <div className="feature-icon">
            📅
          </div>

          <h3>
            Easy Appointments
          </h3>

          <p>
            Book and manage your
            appointments easily.
          </p>
        </div>


        <div className="feature-card">
          <div className="feature-icon">
            👨‍⚕️
          </div>

          <h3>
            Find Doctors
          </h3>

          <p>
            Browse doctors and select
            the right specialist.
          </p>
        </div>


        <div className="feature-card">
          <div className="feature-icon">
            ⏰
          </div>

          <h3>
            Schedule Management
          </h3>

          <p>
            View available schedules
            and time slots.
          </p>
        </div>


        <div className="feature-card">
          <div className="feature-icon">
            🔒
          </div>

          <h3>
            Secure Access
          </h3>

          <p>
            Role-based access for patients,
            doctors and admins.
          </p>
        </div>

      </div>

    </section>

  </div>
);


const App = () => (

  <BrowserRouter>

    <Navbar />

    <main>

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
          element={<Dashboard />}
        />

        <Route
          path="/appointments"
          element={<AppointmentList />}
        />

        <Route
          path="/book-appointment"
          element={<AppointmentForm />}
        />

        <Route
          path="/doctor-list"
          element={<DoctorList />}
        />

        <Route
          path="/schedule"
          element={<DoctorSchedule />}
        />

        <Route
          path="/consultations"
          element={<DoctorConsultations />}
        />

        <Route
          path="/doctors"
          element={<ManageDoctors />}
        />

        <Route
          path="/patients"
          element={<ManagePatients />}
        />

      </Routes>

    </main>

  </BrowserRouter>
);


export default App;