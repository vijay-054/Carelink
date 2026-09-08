import React, { useState } from "react";

const DoctorList = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Temporary UI data.
  // Backend data can be connected later.
  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@carelink.com",
      specialty: "General Physician",
      experience: "8 years",
    },
    {
      id: 2,
      name: "Dr. Sarah Williams",
      email: "sarah.williams@carelink.com",
      specialty: "Cardiologist",
      experience: "10 years",
    },
    {
      id: 3,
      name: "Dr. Michael Brown",
      email: "michael.brown@carelink.com",
      specialty: "Dermatologist",
      experience: "6 years",
    },
  ];

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Find a Doctor</h1>
          <p>
            Browse available doctors and book an appointment.
          </p>
        </div>
      </div>

      <div className="doctor-grid">

        {doctors.map((doctor) => (
          <div
            className="doctor-card"
            key={doctor.id}
          >

            <div className="doctor-avatar">
              👨‍⚕️
            </div>

            <h3>
              {doctor.name}
            </h3>

            <div className="doctor-specialty">
              {doctor.specialty}
            </div>

            <p className="doctor-email">
              {doctor.email}
            </p>

            <p>
              <strong>Experience:</strong>{" "}
              {doctor.experience}
            </p>

            <button
              type="button"
              className="primary-btn"
              onClick={() =>
                handleBookAppointment(doctor)
              }
            >
              Book Appointment
            </button>

          </div>
        ))}

      </div>

      {showForm && (
        <div className="modal-overlay">

          <div className="modal">

            <button
              type="button"
              className="modal-close"
              onClick={handleClose}
            >
              ×
            </button>

            <h2>
              Book Appointment
            </h2>

            <p className="doctor-heading">
              Doctor: {selectedDoctor?.name}
            </p>

            <div className="form-group">

              <label>
                Select Time Slot
              </label>

              <select>
                <option value="">
                  -- Select Time Slot --
                </option>

                <option value="09:00">
                  09:00 AM
                </option>

                <option value="10:00">
                  10:00 AM
                </option>

                <option value="11:00">
                  11:00 AM
                </option>

                <option value="14:00">
                  02:00 PM
                </option>

                <option value="15:00">
                  03:00 PM
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Reason for Visit
              </label>

              <textarea
                placeholder="Enter reason for visit..."
              />

            </div>

            <button
              type="button"
              className="submit-btn"
              onClick={handleClose}
            >
              Book Appointment
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default DoctorList;