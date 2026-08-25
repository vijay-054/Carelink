import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAppointments, getAllAppointments, cancelAppointment, setFilterStatus, setSearchQuery } from '../../store/slices/appointmentSlice';
import EmptyState from '../common/EmptyState';
import SearchFilterBar from '../common/SearchFilterBar';

const AppointmentList = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { items, isLoading, filterStatus, searchQuery } = useSelector((state) => state.appointments);

    useEffect(() => {
        if (user && user.role === 'CLINIC_ADMIN') {
            dispatch(getAllAppointments());
        } else {
            dispatch(getMyAppointments());
        }
    }, [dispatch, user]);

    const handleCancel = (id) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            dispatch(cancelAppointment(id));
        }
    };

    const filteredItems = items.filter((item) => {
        const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
        const matchesSearch = searchQuery === '' || item.reasonForVisit?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="appointment-list">
            <h2>Appointment List</h2>
            <SearchFilterBar
                placeholder="Search by reason..."
                filterOptions={['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED', 'COMPLETED']}
                onSearch={(q) => dispatch(setSearchQuery(q))}
                onFilter={(f) => dispatch(setFilterStatus(f))}
            />
            {filteredItems.length === 0 && !isLoading ? (
                <EmptyState message="No appointments found." />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Reason for Visit</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((apt) => (
                            <tr key={apt.id}>
                                <td>{apt.reasonForVisit}</td>
                                <td>{apt.status}</td>
                                <td>
                                    {apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED' && (
                                        <button onClick={() => handleCancel(apt.id)}>Cancel</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AppointmentList;