import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySlots, createSlot } from '../../store/slices/scheduleSlice';

const DoctorSchedule = () => {
    const dispatch = useDispatch();
    const { slots, isLoading } = useSelector((state) => state.schedule);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        dispatch(getMySlots());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let formattedStart = startTime;
        let formattedEnd = endTime;

        if (formattedStart.length === 16) formattedStart += ':00';
        if (formattedEnd.length === 16) formattedEnd += ':00';

        dispatch(createSlot({ start: formattedStart, end: formattedEnd })).then(() => {
            dispatch(getMySlots());
        });
    };

    return (
        <div className="doctor-schedule">
            <h2>My Availability Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Start Time</label>
                    <input
                        type="datetime-local"
                        min="2024-01-01T00:00"
                        max="2100-12-31T23:59"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Time</label>
                    <input
                        type="datetime-local"
                        min="2024-01-01T00:00"
                        max="2100-12-31T23:59"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    Add Slot
                </button>
            </form>

            <h3>Existing Slots</h3>
            <ul>
                {slots && slots.map((slot) => (
                    <li key={slot.id}>
                        {slot.startTime} to {slot.endTime} [{slot.booked ? 'Booked' : 'Available'}]
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorSchedule;