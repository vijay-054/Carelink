import React from "react";

const DomainChart = ({ data, title }) => {

  const values =
    data && data.length
      ? data.map((item) => item.value)
      : [1];

  const maxVal = Math.max(...values, 1);

  return (
    <div className="domain-chart">

      <div className="chart-header">

        <h3>
          {title}
        </h3>

      </div>


      <div className="chart-area">

        <div className="chart-y-axis">

          <span>
            {maxVal}
          </span>

          <span>
            {Math.ceil(maxVal * 0.75)}
          </span>

          <span>
            {Math.ceil(maxVal * 0.5)}
          </span>

          <span>
            {Math.ceil(maxVal * 0.25)}
          </span>

          <span>
            0
          </span>

        </div>


        <div className="chart-bars">

          <div className="chart-grid-lines">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>


          {data &&
            data.map((item, index) => {

              const heightPercent =
                (item.value / maxVal) * 100;

              return (
                <div
                  className="chart-column"
                  key={index}
                >

                  <div className="bar-wrapper">

                    <div
                      className="chart-bar"
                      style={{
                        height: `${heightPercent}%`,
                      }}
                    >
                      <span className="bar-value">
                        {item.value}
                      </span>
                    </div>

                  </div>


                  <span className="chart-label">
                    {item.label}
                  </span>

                </div>
              );
            })}

        </div>

      </div>

    </div>
  );
};

export default DomainChart;