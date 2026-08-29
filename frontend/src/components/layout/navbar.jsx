import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Login from "./components/Login";
import Register from "./components/Register";

import AppointmentList from "./components/appointments/AppointmentList";
import DoctorList from "./components/doctors/DoctorList";
import DoctorConsultations from "./components/doctors/DoctorConsultations";
import DoctorSchedule from "./components/doctors/DoctorSchedule";

import ManageDoctors from "./components/admin/ManageDoctors";
import ManagePatients from "./components/admin/ManagePatients";

function Home() {
  return (
    <div className="home-page">
      <h1>Hospital Appointment Management System</h1>

      <p>
        Welcome to the Hospital Appointment Management System.
      </p>

      <p>
        Use the navigation menu to access your available
        features.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <Navbar />

        {/* ==================================================
            APPLICATION ROUTES
        ================================================== */}

        <main className="main-content">
          <Routes>

            {/* Home */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* Authentication */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* Patient */}

            <Route
              path="/appointments"
              element={<AppointmentList />}
            />

            {/* Doctor */}

            <Route
              path="/doctors"
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

            {/* Clinic Admin */}

            <Route
              path="/patients"
              element={<ManagePatients />}
            />

            {/* Fallback */}

            <Route
              path="*"
              element={<Home />}
            />

          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;