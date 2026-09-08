import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment, clearAppointmentError } from "../../store/slices/appointmentSlice";

const AppointmentForm = ({ doctor, onClose }) => {
  const dispatch = useDispatch();

  const {
    isLoading = false,
    isError = false,
    error = null,
  } = useSelector((state) => state.appointments || {});

  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");

  /*
   * Show API error
   */
  useEffect(() => {
    if (isError) {
      alert(error || "Failed to book appointment");
      dispatch(clearAppointmentError());
    }
  }, [isError, error, dispatch]);

  /*
   * Handle appointment submission
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // T26
    if (!slot) {
      alert("Please select a time slot.");
      return;
    }

    const appointmentData = {
      doctorId: doctor?.id,
      slot: slot,
      reasonForVisit: reason,
    };

    dispatch(bookAppointment(appointmentData));
  };

  return (
    <div className="modal-overlay">

      <div className="appointment-modal">

        {/* Close button */}
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="appointment-header">
          <h2>Book Appointment</h2>

          {doctor && (
            <>
              <p className="doctor-name">
                {doctor.name}
              </p>

              <p className="doctor-email">
                {doctor.email}
              </p>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit}>

          {/* Time Slot */}
          <div className="form-group">

            <label htmlFor="slot">
              Select Time Slot *
            </label>

            <select
              id="slot"
              name="slot"
              value={slot}
              onChange={(event) =>
                setSlot(event.target.value)
              }
            >
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

              <option value="16:00">
                04:00 PM
              </option>
            </select>

          </div>

          {/* Reason */}
          <div className="form-group">

            <label htmlFor="reasonForVisit">
              Reason for Visit *
            </label>

            <textarea
              id="reasonForVisit"
              name="reasonForVisit"
              value={reason}
              onChange={(event) =>
                setReason(event.target.value)
              }
              placeholder="Enter reason for visit..."
              rows="4"
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="submit-btn"
            disabled={!slot || isLoading}
          >
            {isLoading
              ? "Booking..."
              : "Book Appointment"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AppointmentForm;