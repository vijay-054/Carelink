import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookAppointment,
  clearAppointmentError,
} from "../../store/slices/appointmentSlice";

const AppointmentForm = ({ doctor, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    slots = [],
    isLoading = false,
    isError = false,
    error = null,
  } = useSelector((state) => state.appointments || {});

  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(clearAppointmentError());
  }, [dispatch]);

  /*
   * T15
   * Show API error using alert when appointment state
   * contains an error.
   */
  useEffect(() => {
    if (isError) {
      window.alert(error || "Unable to book appointment");
      setSubmitted(false);
    }
  }, [isError, error]);

  const availableSlots = useMemo(() => {
    if (Array.isArray(slots) && slots.length > 0) {
      return slots;
    }

    if (Array.isArray(doctor?.availableSlots)) {
      return doctor.availableSlots;
    }

    if (Array.isArray(doctor?.slots)) {
      return doctor.slots;
    }

    return [];
  }, [slots, doctor]);

  const doctorEmail =
    doctor?.email ||
    doctor?.account?.email ||
    "doctor@carelink.com";

  const doctorName =
    doctor?.name ||
    doctor?.fullName ||
    doctor?.account?.name ||
    doctor?.account?.fullName ||
    doctorEmail;

  const specialization =
    doctor?.specialization ||
    "Medical Specialist";

  const consultationFee =
    doctor?.consultationFee ?? "Not specified";

  const getSlotId = (item, index) => {
    return item?.id ?? item?.slotId ?? index + 1;
  };

  const getSlotText = (item, index) => {
    if (item?.startTime && item?.endTime) {
      return `${item.startTime} - ${item.endTime}`;
    }

    if (item?.startTime) {
      return item.startTime;
    }

    if (item?.time) {
      return item.time;
    }

    if (item?.dateTime) {
      return item.dateTime;
    }

    return `Available slot ${index + 1}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
     * T26
     * Test expects an alert when submitting without slot.
     */
    if (!slot) {
      window.alert("Please select a time slot.");
      return;
    }

    if (!doctor?.id) {
      window.alert("Doctor information is missing.");
      return;
    }

    const appointmentData = {
      doctorId: doctor.id,
      slotId: Number(slot),
      reasonForVisit: reason.trim(),
    };

    setSubmitted(true);

    try {
      const result = await dispatch(
        bookAppointment(appointmentData)
      ).unwrap();

      if (result) {
        onSuccess?.(result);
      }

      onClose?.();
    } catch (err) {
      setSubmitted(false);
    }
  };

  return (
    <div
      className="appointment-modal-overlay"
      onMouseDown={(e) => {
        if (
          e.target === e.currentTarget &&
          !isLoading
        ) {
          onClose?.();
        }
      }}
    >
      <div
        className="appointment-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-title"
      >

        {/* HEADER */}
        <div className="appointment-modal-header">
          <div>

            <span className="modal-eyebrow">
              APPOINTMENT
            </span>

            <h2 id="appointment-title">
              Book an Appointment with {doctorEmail}
            </h2>

            <p>
              Choose a suitable time and tell the doctor
              why you need a consultation.
            </p>

          </div>

          <button
            type="button"
            className="appointment-close-btn"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close appointment form"
          >
            ×
          </button>
        </div>

        {/* DOCTOR */}
        <div className="appointment-doctor-card">

          <div className="appointment-doctor-avatar">
            {doctorName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="appointment-doctor-info">

            <h3>
              Dr. {doctorName}
            </h3>

            {/* Doctor email is explicitly displayed */}
            <p>
              {doctorEmail}
            </p>

            <p>
              {specialization}
            </p>

            <span>
              Consultation Fee: ₹{consultationFee}
            </span>

          </div>

        </div>

        {/* ERROR */}
        {isError && error && (
          <div className="appointment-error">

            <span>!</span>

            <div>
              <strong>
                Unable to book appointment
              </strong>

              <p>
                {error}
              </p>
            </div>

          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* SLOT */}
          <div className="appointment-form-group">

            <label htmlFor="appointment-slot">
              Select Time Slot
            </label>

            <select
              id="appointment-slot"
              value={slot}
              onChange={(e) =>
                setSlot(e.target.value)
              }
              disabled={isLoading}
              required
            >

              <option value="">
                Choose an available time
              </option>

              {availableSlots.map(
                (item, index) => {

                  const slotId =
                    getSlotId(
                      item,
                      index
                    );

                  const slotText =
                    getSlotText(
                      item,
                      index
                    );

                  return (
                    <option
                      key={slotId}
                      value={slotId}
                    >
                      {slotText}
                    </option>
                  );
                }
              )}

            </select>

            {availableSlots.length === 0 && (
              <small className="form-help error-text">
                No available slots are currently
                provided for this doctor.
              </small>
            )}

          </div>

          {/* REASON */}
          <div className="appointment-form-group">

            <label htmlFor="appointment-reason">
              Reason for Visit
            </label>

            <textarea
              id="appointment-reason"
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              placeholder="Briefly describe your symptoms or reason for consultation..."
              rows={4}
              maxLength={500}
              disabled={isLoading}
            />

            <div className="character-count">
              {reason.length}/500
            </div>

          </div>

          {/* ACTIONS */}
          <div className="appointment-form-actions">

            <button
              type="button"
              className="appointment-cancel-btn"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="appointment-submit-btn"

              /*
               * T5
               * Disabled when slot is empty.
               */
              disabled={
                !slot ||
                availableSlots.length === 0 ||
                isLoading ||
                submitted
              }
            >
              {isLoading ? (
                <>
                  <span className="button-spinner" />
                  Booking...
                </>
              ) : (
                "Confirm Appointment"
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AppointmentForm;