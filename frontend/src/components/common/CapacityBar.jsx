import React from 'react';

const CapacityBar = ({ current, total }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    
    // Threshold colors as per specs: green < 70%, amber 70%-90%, red >= 90%
    let backgroundColor = '#22c55e'; 
    if (percentage >= 90) {
        backgroundColor = '#ef4444'; 
    } else if (percentage >= 70) {
        backgroundColor = '#f59e0b'; 
    }

    return (
        <div className="capacity-bar-container" style={{ width: '100%', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
            <div
                className="capacity-bar-fill"
                style={{
                    width: `${Math.min(percentage, 100)}%`,
                    height: '16px',
                    backgroundColor,
                    transition: 'width 0.3s ease',
                }}
            />
        </div>
    );
};

export default CapacityBar;