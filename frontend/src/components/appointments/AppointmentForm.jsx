import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  bookAppointment,
  getAvailableSlots,
} from "../../store/slices/appointmentSlice";

const AppointmentForm = ({ doctor, onClose }) => {
  const dispatch = useDispatch();

  const {
    slots = [],
    isLoading,
    isError,
    error,
  } = useSelector((state) => state.appointments || {});

  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (doctor?.id) {
      dispatch(getAvailableSlots(doctor.id));
    }
  }, [dispatch, doctor]);

  useEffect(() => {
    if (isError && error) {
      window.alert(error);
    }
  }, [isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!slot) {
      window.alert("Please select a time slot");
      return;
    }

    dispatch(
      bookAppointment({
        doctorId: doctor.id,
        slotId: Number(slot),
        reasonForVisit: reason,
      })
    );
  };

  return (
    <div className="appointment-modal">
      <div className="appointment-form">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <h2>
          Book with Dr. {doctor?.account?.email}
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="slot">
              Select Time Slot
            </label>

            <select
              id="slot"
              name="slot"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
            >
              <option value="">
                Select a time slot
              </option>

              {slots.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.startTime}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="reason">
              Reason for Visit
            </label>

            <textarea
              id="reason"
              name="reason"
              placeholder="Describe your symptoms"
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
            />
          </div>

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