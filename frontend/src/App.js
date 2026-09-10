import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
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