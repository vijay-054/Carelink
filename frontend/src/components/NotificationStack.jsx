import React from 'react';

const NotificationStack = ({ notifications, removeNotification }) => {
    return (
        <div className="notification-stack">
            {notifications && notifications.map((notif) => (
                <div key={notif.id} className={`notification ${notif.type}`}>
                    <span>{notif.message}</span>
                    <button onClick={() => removeNotification(notif.id)}>x</button>
                </div>
            ))}
        </div>
    );
};

export default NotificationStack;