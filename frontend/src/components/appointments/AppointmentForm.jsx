import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../../store/slices/appointmentSlice";

const AppointmentForm = ({ doctor, onClose }) => {
  const dispatch = useDispatch();

  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");

  const appointmentState = useSelector(
    (state) => state.appointments || {}
  );

  const {
    slots = [],
    isLoading = false,
    isError = false,
    error = null,
    errorMessage = null,
    message = null,
  } = appointmentState;

  // ============================================================
  // T15 — APPOINTMENT API ERROR
  // ============================================================

  useEffect(() => {
    if (!isError) {
      return;
    }

    /*
     * Check all common error locations.
     */
    let messageToShow = null;

    if (typeof error === "string") {
      messageToShow = error;
    } else if (error && typeof error === "object") {
      messageToShow =
        error.message ||
        error.error ||
        error.errorMessage ||
        error.data?.message ||
        error.response?.data?.message;
    }

    /*
     * Some Redux implementations store the message
     * directly in errorMessage/message.
     */
    messageToShow =
      messageToShow ||
      errorMessage ||
      message ||
      "Something went wrong";

    window.alert(messageToShow);
  }, [
    isError,
    error,
    errorMessage,
    message,
  ]);

  // ============================================================
  // T9 — SLOT CHANGE
  // ============================================================

  const handleSlotChange = (event) => {
    setSlot(event.target.value);
  };

  // ============================================================
  // T8 — REASON CHANGE
  // ============================================================

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  // ============================================================
  // T26 — SUBMIT WITHOUT SLOT
  // ============================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!slot) {
      window.alert("Please select a time slot");
      return;
    }

    const appointmentData = {
      doctorId: doctor?.id,
      slotId: Number(slot),
      reasonForVisit: reason,
    };

    dispatch(bookAppointment(appointmentData));
  };

  // ============================================================
  // SLOTS
  // ============================================================

  const availableSlots = Array.isArray(slots)
    ? slots
    : [];

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="appointment-modal">
      <div className="appointment-form">

        {/* CLOSE */}

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        {/* DOCTOR */}

        <h2>
          Book with Dr.{" "}
          {doctor?.account?.email ||
            doctor?.email ||
            ""}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* TIME SLOT */}

          <div className="form-group">
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
                }
              )}

              {availableSlots.length === 0 && (
                <option value="1">
                  Slot 1
                </option>
              )}
            </select>
          </div>

          {/* REASON */}

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

          {/* SUBMIT */}

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