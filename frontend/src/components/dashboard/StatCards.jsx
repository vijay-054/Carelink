import React from "react";

const StatCards = ({ stats }) => {
  return (
    <div className="stat-cards-container">

      {stats &&
        stats.map((stat, index) => (

          <div
            key={index}
            className="dashboard-stat-card"
          >

            <div className="stat-card-top">

              <div className="stat-card-icon">
                {stat.icon}
              </div>

            </div>


            <div className="stat-card-label">
              {stat.label}
            </div>


            <div className="stat-card-value">
              {stat.value}
            </div>


            <div className="stat-card-subtitle">
              {stat.subLabel}
            </div>

          </div>

        ))}

    </div>
  );
};

export default StatCards;