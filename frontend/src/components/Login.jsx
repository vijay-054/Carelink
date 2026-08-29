import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, reset } from '../store/slices/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        user,
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isError) {
            alert(message);
            dispatch(reset());
        }

        if (isSuccess || user) {
            navigate('/');
            dispatch(reset());
        }
    }, [
        isError,
        isSuccess,
        user,
        message,
        navigate,
        dispatch,
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(
            login({
                email,
                password,
            })
        );
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        Email *
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password *
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;