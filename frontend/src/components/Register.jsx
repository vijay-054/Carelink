import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    register,
    reset,
} from '../store/slices/authSlice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        bloodGroup: '',
        emergencyContact: '',
    });

    const {
        fullName,
        email,
        password,
        bloodGroup,
        emergencyContact,
    } = formData;

    useEffect(() => {
        if (isError) {
            alert(message);
            dispatch(reset());
        }

        if (isSuccess) {
            navigate('/login');
            dispatch(reset());
        }
    }, [
        isError,
        isSuccess,
        message,
        navigate,
        dispatch,
    ]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(
            register({
                fullName,
                email,
                password,
                bloodGroup,
                emergencyContact,
            })
        );
    };

    return (
        <div className="register-container">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">
                    Full Name *
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">
                    Email *
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">
                    Password *
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="bloodGroup">
                    Blood Group *
                </label>
                <input
                    id="bloodGroup"
                    name="bloodGroup"
                    value={bloodGroup}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="emergencyContact">
                    Emergency Contact *
                </label>
                <input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={emergencyContact}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;