import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getSlots,
} from '../../store/slices/scheduleSlice';

import {
    bookAppointment,
    reset as resetAppointments,
} from '../../store/slices/appointmentSlice';

const AppointmentForm = ({ doctor, onClose }) => {
    const dispatch = useDispatch();

    const {
        slots,
        isLoading: slotsLoading,
    } = useSelector((state) => state.schedule);

    const {
        isError,
        message,
        isSuccess,
    } = useSelector((state) => state.appointments);

    const [slot, setSlot] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        if (doctor && doctor.id) {
            dispatch(getSlots(doctor.id));
        }
    }, [dispatch, doctor]);

    useEffect(() => {
        if (isError) {
            alert(message);
            dispatch(resetAppointments());
        }

        if (isSuccess) {
            dispatch(resetAppointments());

            if (onClose) {
                onClose();
            }
        }
    }, [
        isError,
        isSuccess,
        message,
        dispatch,
        onClose,
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!slot) {
            alert('Please select a time slot.');
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
                    Book with Dr.{' '}
                    {doctor?.account?.email}
                </h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="slot">
                        Select Time Slot
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
                            Select a time slot
                        </option>

                        {slots?.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.startTime}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="reason">
                        Reason for Visit
                    </label>

                    <textarea
                        id="reason"
                        name="reason"
                        value={reason}
                        onChange={(event) =>
                            setReason(event.target.value)
                        }
                    />

                    <button
                        type="submit"
                        disabled={!slot || slotsLoading}
                    >
                        {slotsLoading
                            ? 'Loading...'
                            : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;