import React from 'react';

const StatCards = ({ stats }) => {
    return (
        <div className="stat-cards-container" style={{ display: 'flex', gap: '16px' }}>
            {stats && stats.map((stat, index) => (
                <div key={index} className="stat-card" style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', flex: 1 }}>
                    <h4 className="stat-label">{stat.label}</h4>
                    <p className="stat-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</p>
                </div>
            ))}
        </div>
    );
};

export default StatCards;