import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  bookAppointment,
  clearAppointmentError,
} from "../../store/slices/appointmentSlice";

const AppointmentForm = ({
  doctor,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const {
    slots = [],
    isLoading = false,
    isError = false,
    error = null,
  } = useSelector(
    (state) => state.appointments || {}
  );

  /* =====================================================
     STATE
  ===================================================== */

  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /* =====================================================
     CLEAR OLD ERROR
  ===================================================== */

  useEffect(() => {
    dispatch(clearAppointmentError());
  }, [dispatch]);

  /* =====================================================
     API ERROR
     T15
  ===================================================== */

  useEffect(() => {
    if (isError && error) {
      setSubmitted(false);

      alert(
        typeof error === "string"
          ? error
          : "Unable to book appointment"
      );
    }
  }, [isError, error]);

  /* =====================================================
     AVAILABLE SLOTS
  ===================================================== */

  const availableSlots = useMemo(() => {
    if (
      Array.isArray(slots) &&
      slots.length > 0
    ) {
      return slots;
    }

    if (
      Array.isArray(doctor?.availableSlots)
    ) {
      return doctor.availableSlots;
    }

    if (
      Array.isArray(doctor?.slots)
    ) {
      return doctor.slots;
    }

    return [];
  }, [slots, doctor]);

  /* =====================================================
     DOCTOR DETAILS
  ===================================================== */

  const doctorEmail =
    doctor?.email ||
    doctor?.account?.email ||
    doctor?.doctorEmail ||
    "doctor@carelink.com";

  const doctorName =
    doctor?.name ||
    doctor?.fullName ||
    doctor?.account?.name ||
    doctor?.account?.fullName ||
    doctorEmail;

  const specialization =
    doctor?.specialization ||
    doctor?.specialty ||
    "Medical Specialist";

  const consultationFee =
    doctor?.consultationFee ??
    doctor?.fee ??
    "Not specified";

  /* =====================================================
     SLOT ID
  ===================================================== */

  const getSlotId = (
    item,
    index
  ) => {
    if (
      item &&
      typeof item === "object"
    ) {
      return (
        item.id ??
        item.slotId ??
        index + 1
      );
    }

    return item ?? index + 1;
  };

  /* =====================================================
     SLOT DISPLAY TEXT
  ===================================================== */

  const getSlotText = (
    item,
    index
  ) => {
    if (
      item &&
      typeof item === "object"
    ) {
      if (
        item.startTime &&
        item.endTime
      ) {
        return `${item.startTime} - ${item.endTime}`;
      }

      if (item.startTime) {
        return item.startTime;
      }

      if (item.time) {
        return item.time;
      }

      if (item.dateTime) {
        return item.dateTime;
      }

      if (item.label) {
        return item.label;
      }
    }

    if (
      typeof item === "string" ||
      typeof item === "number"
    ) {
      return String(item);
    }

    return `Available slot ${index + 1}`;
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    /* ---------------------------------------------
       T26
       No slot selected
    --------------------------------------------- */

    if (!slot) {
      alert(
        "Please select a time slot."
      );
      return;
    }

    /* ---------------------------------------------
       Doctor validation
    --------------------------------------------- */

    if (!doctor?.id) {
      alert(
        "Doctor information is missing."
      );
      return;
    }

    /* ---------------------------------------------
       Appointment payload
    --------------------------------------------- */

    const appointmentData = {
      doctorId: doctor.id,
      slotId: Number(slot),
      reasonForVisit:
        reason.trim(),
    };

    setSubmitted(true);

    try {
      const result =
        await dispatch(
          bookAppointment(
            appointmentData
          )
        ).unwrap();

      /* -------------------------------------------
         SUCCESS
      ------------------------------------------- */

      if (result) {
        onSuccess?.(result);
      }

      onClose?.();

    } catch (submitError) {

      setSubmitted(false);

      /*
       * The Redux isError effect will
       * display the API error when available.
       *
       * This fallback handles rejected
       * requests that don't populate
       * the Redux error field.
       */

      if (!isError) {
        const message =
          typeof submitError ===
          "string"
            ? submitError
            : "Unable to book appointment.";

        alert(message);
      }
    }
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div
      className="appointment-modal-overlay"
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
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

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="appointment-modal-header">

          <div>

            <span className="modal-eyebrow">
              APPOINTMENT
            </span>

            <h2 id="appointment-title">
              Book an Appointment
            </h2>

            {/* T3 - Doctor email */}
            <p>
              Appointment with{" "}
              <strong>
                {doctorEmail}
              </strong>
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

        {/* =========================================
            DOCTOR CARD
        ========================================= */}

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

            <p>
              {specialization}
            </p>

            <span>
              Consultation Fee: ₹
              {consultationFee}
            </span>

            <small>
              {doctorEmail}
            </small>

          </div>

        </div>

        {/* =========================================
            ERROR
        ========================================= */}

        {isError && error && (
          <div className="appointment-error">

            <span>!</span>

            <div>

              <strong>
                Unable to book appointment
              </strong>

              <p>
                {typeof error ===
                "string"
                  ? error
                  : "Something went wrong."}
              </p>

            </div>

          </div>
        )}

        {/* =========================================
            FORM
        ========================================= */}

        <form
          onSubmit={handleSubmit}
        >

          {/* =====================================
              SLOT
          ===================================== */}

          <div className="appointment-form-group">

            <label htmlFor="appointment-slot">
              Select Time Slot
            </label>

            <select
              id="appointment-slot"
              name="slot"
              value={slot}
              onChange={(event) =>
                setSlot(
                  event.target.value
                )
              }
              disabled={isLoading}
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

            {availableSlots.length ===
              0 && (
              <small className="form-help error-text">
                No available slots are
                currently provided for
                this doctor.
              </small>
            )}

          </div>

          {/* =====================================
              REASON
          ===================================== */}

          <div className="appointment-form-group">

            <label htmlFor="appointment-reason">
              Reason for Visit
            </label>

            <textarea
              id="appointment-reason"
              name="reason"
              value={reason}
              onChange={(event) =>
                setReason(
                  event.target.value
                )
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

          {/* =====================================
              ACTIONS
          ===================================== */}

          <div className="appointment-form-actions">

            <button
              type="button"
              className="appointment-cancel-btn"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>

            {/* T5 */}
            <button
              type="submit"
              className="appointment-submit-btn"
              disabled={
                !slot ||
                availableSlots.length ===
                  0 ||
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