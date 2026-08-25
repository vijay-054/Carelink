import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients, deletePatient } from '../../store/slices/patientSlice';
import EmptyState from '../common/EmptyState';

const ManagePatients = () => {
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.patients);

    useEffect(() => {
        dispatch(getPatients());
    }, [dispatch]);

    const handleRemove = (id) => {
        if (window.confirm('Are you sure you want to remove this patient?')) {
            dispatch(deletePatient(id));
        }
    };

    return (
        <div className="manage-patients">
            <h2>Manage Patients</h2>
            {items.length === 0 && !isLoading ? (
                <EmptyState message="No patients found." />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Blood Group</th>
                            <th>Emergency Contact</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.fullName}</td>
                                <td>{patient.bloodGroup}</td>
                                <td>{patient.emergencyContact}</td>
                                <td>
                                    <button onClick={() => handleRemove(patient.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManagePatients;