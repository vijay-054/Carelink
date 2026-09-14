import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  bookAppointment,
} from "../../store/slices/appointmentSlice";


const AppointmentForm = ({
  doctor,
  onClose,
}) => {

  const dispatch = useDispatch();

  const {
    isLoading = false,
    isError = false,
    isSuccess = false,
    message = "",
    error = "",
    slots = [],
  } = useSelector(
    (state) => state.appointments || {}
  );


  const [selectedSlot, setSelectedSlot] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");


  /* =====================================================
     DOCTOR INFORMATION
  ===================================================== */

  const doctorEmail =
    doctor?.account?.email ||
    doctor?.email ||
    "Doctor";


  const doctorName =
    doctor?.fullName ||
    doctor?.name ||
    doctorEmail;


  /* =====================================================
     ERROR / SUCCESS HANDLING
  ===================================================== */

  useEffect(() => {

    if (isError) {

      const errorMessage =
        error ||
        message ||
        "Something went wrong";

      alert(
        typeof errorMessage === "string"
          ? errorMessage
          : errorMessage?.message ||
            "Something went wrong"
      );

      return;
    }


    if (isSuccess) {

      alert(
        "Appointment booked successfully"
      );

      if (onClose) {
        onClose();
      }
    }

  }, [
    isError,
    isSuccess,
    error,
    message,
    onClose,
  ]);


  /* =====================================================
     SUBMIT APPOINTMENT
  ===================================================== */

  const handleSubmit = (event) => {

    event.preventDefault();


    if (!selectedSlot) {

      alert(
        "Please select a time slot"
      );

      return;
    }


    const appointmentData = {

      doctorId:
        doctor?.id ||
        doctor?.account?.id,

      slotId:
        Number(selectedSlot),

      reasonForVisit:
        reasonForVisit.trim(),
    };


    dispatch(
      bookAppointment(
        appointmentData
      )
    );
  };


  /* =====================================================
     SLOT CHANGE
  ===================================================== */

  const handleSlotChange = (event) => {

    setSelectedSlot(
      event.target.value
    );
  };


  /* =====================================================
     CLOSE
  ===================================================== */

  const handleClose = () => {

    if (onClose) {
      onClose();
    }
  };


  /* =====================================================
     NORMALIZE SLOTS
  ===================================================== */

  const normalizedSlots =
    Array.isArray(slots)
      ? slots
      : [];


  /* =====================================================
     FORMAT SLOT
  ===================================================== */

  const formatSlot = (slot) => {

    if (!slot) {
      return "Available Slot";
    }


    if (slot.startTime) {

      const date =
        new Date(
          slot.startTime
        );


      if (
        !Number.isNaN(
          date.getTime()
        )
      ) {

        return date.toLocaleString(
          [],
          {
            dateStyle: "medium",
            timeStyle: "short",
          }
        );
      }
    }


    return (
      slot.label ||
      slot.time ||
      `Slot ${slot.id}`
    );
  };


  /* =====================================================
     UI
  ===================================================== */

  return (

    <div
      className="appointment-modal-overlay"
    >

      <div
        className="appointment-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-title"
      >


        {/* ================================
            HEADER
        ================================= */}

        <div
          className="appointment-modal-header"
        >

          <div>

            <span className="modal-eyebrow">
              APPOINTMENT
            </span>


            <h2 id="appointment-title">
              Book with Dr. {doctorEmail}
            </h2>


            <p>
              Choose a suitable time and tell
              the doctor why you need a
              consultation.
            </p>

          </div>


          <button
            type="button"
            className="appointment-close-btn"
            aria-label="Close appointment form"
            onClick={handleClose}
          >
            ×
          </button>

        </div>


        {/* ================================
            DOCTOR CARD
        ================================= */}

        <div
          className="appointment-doctor-card"
        >

          <div
            className="appointment-doctor-avatar"
          >
            {String(
              doctorName
            )
              .charAt(0)
              .toUpperCase()}
          </div>


          <div
            className="appointment-doctor-info"
          >

            <h3>
              Dr. {doctorName}
            </h3>


            <p>
              {doctorEmail}
            </p>


            {doctor?.specialization && (
              <p>
                {doctor.specialization}
              </p>
            )}


            {doctor?.consultationFee !==
              undefined && (

              <span>
                Consultation Fee: ₹
                {doctor.consultationFee}
              </span>

            )}

          </div>

        </div>


        {/* ================================
            FORM
        ================================= */}

        <form
          onSubmit={handleSubmit}
        >


          {/* TIME SLOT */}

          <div
            className="appointment-form-group"
          >

            <label
              htmlFor="appointment-slot"
            >
              Select Time Slot
            </label>


            <select
              id="appointment-slot"
              name="slot"
              value={selectedSlot}
              onChange={handleSlotChange}
              required
            >

              <option value="">
                Choose an available time
              </option>


              {normalizedSlots.length > 0 ? (

                normalizedSlots.map(
                  (slot) => (

                    <option
                      key={slot.id}
                      value={String(slot.id)}
                    >
                      {formatSlot(slot)}
                    </option>

                  )
                )

              ) : (

                <option value="1">
                  Available Slot
                </option>

              )}

            </select>


            {normalizedSlots.length === 0 && (
              <small className="form-help">
                Select an available slot
                to continue.
              </small>
            )}

          </div>


          {/* REASON */}

          <div
            className="appointment-form-group"
          >

            <label
              htmlFor="appointment-reason"
            >
              Reason for Visit
            </label>


            <textarea
              id="appointment-reason"
              name="reasonForVisit"
              value={reasonForVisit}
              onChange={(event) =>
                setReasonForVisit(
                  event.target.value
                )
              }
              placeholder="Describe your symptoms"
              rows={4}
              maxLength={500}
            />


            <div
              className="character-count"
            >
              {reasonForVisit.length}/500
            </div>

          </div>


          {/* ACTION BUTTONS */}

          <div
            className="appointment-form-actions"
          >

            <button
              type="button"
              className="appointment-cancel-btn"
              onClick={handleClose}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="appointment-submit-btn"
              disabled={
                !selectedSlot ||
                isLoading
              }
            >
              {isLoading
                ? "Booking..."
                : "Confirm Booking"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};


export default AppointmentForm;