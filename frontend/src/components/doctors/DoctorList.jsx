import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getDoctors,
} from "../../store/slices/doctorSlice";

import AppointmentForm from "../appointments/AppointmentForm";

const DoctorList = () => {
  const dispatch = useDispatch();

  const {
    items: doctors = [],
    isLoading,
    isError,
    error,
  } = useSelector(
    (state) => state.doctors || {}
  );

  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  return (
    <div className="doctor-list">
      <h2>Doctors</h2>

      {isLoading && (
        <p>Loading doctors...</p>
      )}

      {isError && (
        <p>
          {error || "Unable to load doctors"}
        </p>
      )}

      {!isLoading &&
        !isError &&
        doctors.length === 0 && (
          <p>No doctors found.</p>
        )}

      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <div
            className="doctor-card"
            key={doctor.id}
          >
            <h3>
              Dr.{" "}
              {doctor.account?.email ||
                doctor.email}
            </h3>

            <p>
              Specialization:{" "}
              {doctor.specialization}
            </p>

            <p>
              Experience:{" "}
              {doctor.yearsOfExperience} years
            </p>

            <p>
              Consultation Fee: ₹
              {doctor.consultationFee}
            </p>

            <button
              type="button"
              onClick={() =>
                setSelectedDoctor(doctor)
              }
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <AppointmentForm
          doctor={selectedDoctor}
          onClose={() =>
            setSelectedDoctor(null)
          }
        />
      )}
    </div>
  );
};

export default DoctorList;