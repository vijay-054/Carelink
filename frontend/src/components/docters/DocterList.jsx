import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '../../store/slices/doctorSlice';
import EmptyState from '../common/EmptyState';
import AppointmentForm from '../appointments/AppointmentForm';

const DoctorList = () => {
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.doctors);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        dispatch(getDoctors());
    }, [dispatch]);

    return (
        <div className="doctor-list">
            <h2>Available Doctors</h2>
            {items.length === 0 && !isLoading ? (
                <EmptyState message="No doctors available at the moment" />
            ) : (
                <div className="doctor-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {items.map((doc) => (
                        <div key={doc.id} className="doctor-card" style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
                            <h3>Dr. {doc.account?.email}</h3>
                            <p>Specialization: {doc.specialization}</p>
                            <p>Experience: {doc.yearsOfExperience} years</p>
                            <button onClick={() => setSelectedDoctor(doc)}>Book Appointment</button>
                        </div>
                    ))}
                </div>
            )}
            {selectedDoctor && (
                <AppointmentForm doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
            )}
        </div>
    );
};

export default DoctorList;