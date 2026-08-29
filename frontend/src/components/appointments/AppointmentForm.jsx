import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookAppointment, reset } from '../../store/slices/appointmentSlice';
import { getSlots } from '../../store/slices/scheduleSlice';

const AppointmentForm = ({ doctor, onClose }) => {
    const [slotId, setSlotId] = useState('');
    const [reasonForVisit, setReasonForVisit] = useState('');

    const dispatch = useDispatch();
    const { slots } = useSelector((state) => state.schedule);
    const { isError, isSuccess, message } = useSelector((state) => state.appointments);

    useEffect(() => {
        if (doctor && doctor.id) {
            dispatch(getSlots(doctor.id));
        }
    }, [dispatch, doctor]);

    useEffect(() => {
        if (isError) {
            alert(message);
            dispatch(reset());
        }
        if (isSuccess) {
            alert('Appointment booked successfully!');
            dispatch(reset());
            onClose();
        }
    }, [isError, isSuccess, message, dispatch, onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!slotId) {
            alert('Please select a time slot');
            return;
        }
        dispatch(bookAppointment({ slotId: Number(slotId), reasonForVisit }));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>x</button>
                <h3>Book with Dr. {doctor?.account?.email}</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="slotId">Select Time Slot</label>
                        <select
                            id="slotId"
                            value={slotId}
                            onChange={(e) => setSlotId(e.target.value)}
                        >
                            <option value="">-- Select Slot --</option>
                            {slots && slots.map((slot) => (
                                <option key={slot.id} value={slot.id}>
                                    {slot.startTime} to {slot.endTime}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="reasonForVisit">Reason for Visit *</label>
                        <textarea
                            id="reasonForVisit"
                            placeholder="Describe your symptoms..."
                            value={reasonForVisit}
                            onChange={(e) => setReasonForVisit(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={!slotId}>
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;