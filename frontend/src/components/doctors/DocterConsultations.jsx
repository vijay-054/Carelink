import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAppointments, cancelAppointment } from '../../store/slices/appointmentSlice';
import consultationService from '../../services/consultationService';
import EmptyState from '../common/EmptyState';
import API from '../../services/api';

const DoctorConsultations = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.appointments);
    const [finalizeModal, setFinalizeModal] = useState(null);
    const [diagnosis, setDiagnosis] = useState('');
    const [medicationsJson, setMedicationsJson] = useState('');

    useEffect(() => {
        dispatch(getMyAppointments());
    }, [dispatch]);

    const handleApprove = async (id) => {
        try {
            await API.post(`/consultations/${id}/approve`);
            dispatch(getMyAppointments());
        } catch (err) {
            alert(err.response?.data?.error || 'Error approving appointment');
        }
    };

    const handleStart = async (id) => {
        try {
            await consultationService.startConsultation(id);
            dispatch(getMyAppointments());
        } catch (err) {
            alert(err.response?.data?.error || 'Error starting session');
        }
    };

    const handleFinalizeSubmit = async (e) => {
        e.preventDefault();
        try {
            await consultationService.finalizeConsultation(finalizeModal, { diagnosis, medicationsJson });
            setFinalizeModal(null);
            setDiagnosis('');
            setMedicationsJson('');
            dispatch(getMyAppointments());
        } catch (err) {
            alert(err.response?.data?.error || 'Error finalizing consultation');
        }
    };

    const handleCancel = (id) => {
        if (window.confirm('Cancel this appointment?')) {
            dispatch(cancelAppointment(id));
        }
    };

    return (
        <div className="consultation-management">
            <h2>Consultation Management</h2>
            {items.length === 0 ? (
                <EmptyState message="No appointments scheduled" />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((apt) => (
                            <tr key={apt.id}>
                                <td>{apt.patient?.fullName}</td>
                                <td>{apt.status}</td>
                                <td>
                                    {apt.status === 'PENDING' && (
                                        <>
                                            <button onClick={() => handleApprove(apt.id)}>Approve</button>
                                            <button onClick={() => handleCancel(apt.id)}>Cancel</button>
                                        </>
                                    )}
                                    {apt.status === 'CONFIRMED' && (
                                        <>
                                            <button onClick={() => handleStart(apt.id)}>Start Session</button>
                                            <button onClick={() => handleCancel(apt.id)}>Cancel</button>
                                        </>
                                    )}
                                    {apt.status === 'IN_PROGRESS' && (
                                        <button onClick={() => setFinalizeModal(apt.id)}>Finalize</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {finalizeModal && (
                <div className="modal">
                    <form onSubmit={handleFinalizeSubmit} className="modal-content">
                        <h3>Finalize Consultation</h3>
                        <textarea
                            placeholder="Diagnosis..."
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Medications (JSON/Text)..."
                            value={medicationsJson}
                            onChange={(e) => setMedicationsJson(e.target.value)}
                            required
                        />
                        <button type="submit">Finalize Consultation</button>
                        <button type="button" onClick={() => setFinalizeModal(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default DoctorConsultations;