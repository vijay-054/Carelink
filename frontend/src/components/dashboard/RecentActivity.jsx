import React from 'react';

const RecentActivity = ({ activities }) => {
    return (
        <div className="recent-activity" style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
            <h3>Recent Activity</h3>
            <ul>
                {activities && activities.map((act, index) => (
                    <li key={index} style={{ marginBottom: '10px', listStyle: 'none' }}>
                        <span className="activity-text" style={{ fontWeight: '500' }}>{act.title}</span> -{' '}
                        <span className="activity-date" style={{ color: '#666', fontSize: '12px' }}>{act.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivity;