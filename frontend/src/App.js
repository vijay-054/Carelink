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

const Home = () => {
  return (
    <div>
      <h1>Hospital Appointment Management System</h1>

      <p>
        Welcome to CareLink.
      </p>

      <p>
        Please use the navigation menu to access
        the available features.
      </p>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* AUTHENTICATION */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* APPOINTMENTS */}
          <Route
            path="/appointments"
            element={<AppointmentList />}
          />

          {/* DOCTOR */}
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

          {/* ADMIN */}
          <Route
            path="/doctors"
            element={<ManageDoctors />}
          />

          <Route
            path="/patients"
            element={<ManagePatients />}
          />

          {/* FALLBACK */}
          <Route
            path="*"
            element={<Home />}
          />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;