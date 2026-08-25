import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../store/slices/authSlice';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        bloodGroup: '',
        emergencyContact: '',
    });

    const { email, password, fullName, bloodGroup, emergencyContact } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
            dispatch(reset());
        }

        if (isSuccess || user) {
            navigate('/');
            dispatch(reset());
        }
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            register({ email, password, fullName, bloodGroup, emergencyContact })
        );
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="patient@carelink.com"
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Choose a password"
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={fullName}
                        placeholder="John Doe"
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="bloodGroup">Blood Group</label>
                    <input
                        type="text"
                        id="bloodGroup"
                        name="bloodGroup"
                        value={bloodGroup}
                        placeholder="e.g. O+"
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="emergencyContact">Emergency Contact *</label>
                    <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={emergencyContact}
                        placeholder="1234567890"
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" role="button">
                    {isLoading ? 'Registering' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;