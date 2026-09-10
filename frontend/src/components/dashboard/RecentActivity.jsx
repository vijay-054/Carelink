import React from "react";

const RecentActivity = ({ activities }) => {

  return (
    <div className="recent-activity">

      <div className="activity-header">

        <h3>
          Recent Activity
        </h3>

      </div>


      <div className="activity-list">

        {activities &&
          activities.length > 0 ? (

          activities.map((activity, index) => (

            <div
              className="activity-item"
              key={index}
            >

              <div className="activity-icon">
                {activity.icon || "•"}
              </div>


              <div className="activity-content">

                <div className="activity-title">
                  {activity.title}
                </div>

                <div className="activity-date">
                  {activity.date}
                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="activity-empty">
            No recent activity
          </div>

        )}

      </div>

    </div>
  );
};

export default RecentActivity;