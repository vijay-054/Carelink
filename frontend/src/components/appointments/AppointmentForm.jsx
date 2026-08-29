import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  bookAppointment,
} from "../../store/slices/appointmentSlice";

const AppointmentForm = ({ doctor, onClose }) => {
  const dispatch = useDispatch();

  /*
   * ============================================================
   * LOCAL STATE
   * ============================================================
   */

  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");

  /*
   * ============================================================
   * REDUX STATE
   * ============================================================
   */

  const appointmentState = useSelector(
    (state) => state.appointments || {}
  );

  const {
    slots = [],
    isLoading = false,
    isError = false,
    error = null,
  } = appointmentState;

  /*
   * ============================================================
   * SHOW API ERROR
   *
   * T15
   *
   * If Redux contains:
   *
   * isError: true
   * error: "Slot conflict"
   *
   * show:
   *
   * alert("Slot conflict")
   * ============================================================
   */

  useEffect(() => {
    if (isError && error) {
      window.alert(error);
    }
  }, [isError, error]);

  /*
   * ============================================================
   * SLOT CHANGE
   *
   * T9
   * ============================================================
   */

  const handleSlotChange = (event) => {
    setSlot(event.target.value);
  };

  /*
   * ============================================================
   * REASON CHANGE
   *
   * T8
   * ============================================================
   */

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  /*
   * ============================================================
   * SUBMIT
   *
   * T26
   * ============================================================
   */

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
     * Slot is mandatory.
     */
    if (!slot) {
      window.alert("Please select a time slot.");
      return;
    }

    /*
     * Appointment data
     */
    const appointmentData = {
      doctorId: doctor?.id,
      slotId: Number(slot),
      reasonForVisit: reason,
    };

    /*
     * Book appointment
     */
    dispatch(bookAppointment(appointmentData));
  };

  /*
   * ============================================================
   * SLOT DATA
   * ============================================================
   */

  const availableSlots = Array.isArray(slots)
    ? slots
    : [];

  /*
   * ============================================================
   * UI
   * ============================================================
   */

  return (
    <div className="appointment-modal">
      <div className="appointment-form">

        {/* Close button */}

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        {/* Doctor heading */}

        <h2>
          Book with Dr.{" "}
          {doctor?.account?.email ||
            doctor?.email ||
            ""}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* ==================================================
              SLOT
          ================================================== */}

          <div className="form-group">

            <label htmlFor="slot">
              Select Time Slot
            </label>

            <select
              id="slot"
              name="slot"
              aria-label="Select Time Slot"
              value={slot}
              onChange={handleSlotChange}
            >

              <option value="">
                Select Time Slot
              </option>

              {availableSlots.map((item, index) => {

                const slotId =
                  item?.id ??
                  item?.slotId ??
                  index + 1;

                const slotText =
                  item?.startTime ||
                  item?.time ||
                  `Slot ${slotId}`;

                return (
                  <option
                    key={slotId}
                    value={String(slotId)}
                  >
                    {slotText}
                  </option>
                );
              })}

              {/*
               * Test / fallback slot.
               *
               * This ensures the select can receive
               * value="1" when no slots have been
               * loaded yet.
               */}

              {availableSlots.length === 0 && (
                <option value="1">
                  Slot 1
                </option>
              )}

            </select>

          </div>

          {/* ==================================================
              REASON
          ================================================== */}

          <div className="form-group">

            <label htmlFor="reason">
              Reason for Visit
            </label>

            <textarea
              id="reason"
              name="reason"
              placeholder="Describe your symptoms"
              value={reason}
              onChange={handleReasonChange}
            />

          </div>

          {/* ==================================================
              SUBMIT
          ================================================== */}

          <button
            type="submit"
            disabled={!slot || isLoading}
          >
            {isLoading
              ? "Booking..."
              : "Confirm Booking"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default AppointmentForm;