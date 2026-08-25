import React from 'react';

const ErrorHandler = ({ error }) => {
    if (!error) return null;
    return <div className="error-message">{error}</div>;
};

export default ErrorHandler;