import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors, deleteDoctor } from '../../store/slices/doctorSlice';
import EmptyState from '../common/EmptyState';

const ManageDoctors = () => {
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.doctors);

    useEffect(() => {
        dispatch(getDoctors());
    }, [dispatch]);

    const handleRemove = (id) => {
        if (window.confirm('Are you sure you want to remove this doctor?')) {
            dispatch(deleteDoctor(id));
        }
    };

    return (
        <div className="manage-doctors">
            <h2>Manage Doctors</h2>
            {items.length === 0 && !isLoading ? (
                <EmptyState message="No doctors found" />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Specialization</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((doc) => (
                            <tr key={doc.id}>
                                <td>{doc.account?.email}</td>
                                <td>{doc.specialization}</td>
                                <td>
                                    <button onClick={() => handleRemove(doc.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageDoctors;