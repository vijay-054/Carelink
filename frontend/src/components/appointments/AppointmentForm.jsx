import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  bookAppointment,
} from "../../store/slices/appointmentSlice";

const AppointmentForm = ({ doctor, onClose }) => {
  const dispatch = useDispatch();

  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");

  const appointments = useSelector(
    (state) => state.appointments || {}
  );

  const {
    slots = [],
    isLoading = false,
    isError = false,
    error = null,
  } = appointments;

  /*
   * ==========================================================
   * API ERROR
   * T15
   * ==========================================================
   */

  useEffect(() => {
    if (isError) {
      window.alert(error || "Something went wrong");
    }
  }, [isError, error]);

  /*
   * ==========================================================
   * SLOT CHANGE
   * ==========================================================
   */

  const handleSlotChange = (event) => {
    setSlot(event.target.value);
  };

  /*
   * ==========================================================
   * REASON CHANGE
   * ==========================================================
   */

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  /*
   * ==========================================================
   * SUBMIT
   * T26
   * ==========================================================
   */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!slot) {
      window.alert("Please select a time slot.");
      return;
    }

    const appointmentData = {
      doctorId: doctor?.id,
      slotId: Number(slot),
      reasonForVisit: reason,
    };

    dispatch(bookAppointment(appointmentData));
  };

  /*
   * ==========================================================
   * SLOT LIST
   * ==========================================================
   */

  const availableSlots = Array.isArray(slots)
    ? slots
    : [];

  return (
    <div className="appointment-modal">
      <div className="appointment-form">

        {/* Close */}

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        {/* Doctor */}

        <h2>
          Book with Dr.{" "}
          {doctor?.account?.email ||
            doctor?.email ||
            ""}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* ==================================================
              TIME SLOT
          ================================================== */}

          <div>
            <label htmlFor="slot">
              Select Time Slot
            </label>

            <select
              id="slot"
              name="slot"
              value={slot}
              onChange={handleSlotChange}
            >
              <option value="">
                Select Time Slot
              </option>

              {availableSlots.map(
                (item, index) => {
                  const id =
                    item?.id ??
                    item?.slotId ??
                    index + 1;

                  return (
                    <option
                      key={id}
                      value={String(id)}
                    >
                      {item?.startTime ||
                        item?.time ||
                        `Slot ${id}`}
                    </option>
                  );
                }
              )}

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

          <div>
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
            disabled={!slot}
          >
            Confirm Booking
          </button>

        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;