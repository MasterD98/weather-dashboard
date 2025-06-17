import React from "react";

const CurrentWeatherCard = ({ current, theme }) => {
  return (
    <div className="col-12 col-lg-10">
      <div
        className={`card ${
          theme === "dark" ? "text-white bg-dark" : "text-dark bg-light"
        } shadow-sm h-100`}
      >
        <div className="card-body">
          <h5 className="card-title text-center">Current Weather</h5>

          <div className="d-flex flex-column align-items-center mb-3">
            <img
              src={current.condition.icon}
              alt={current.condition.text}
              className="img-fluid"
              style={{ maxWidth: "60px" }}
            />
            <small>{current.condition.text}</small>
          </div>

          <div className="row text-center">
            <div className="col-6 col-md-3 mb-2">
              <strong>Temperature</strong>
              <div>
                {current.temp_c}°C / {current.temp_f}°F
              </div>
            </div>
            <div className="col-6 col-md-3 mb-2">
              <strong>Humidity</strong>
              <div>{current.humidity}%</div>
            </div>
            <div className="col-6 col-md-3 mb-2">
              <strong>Wind</strong>
              <div>{current.wind_kph} km/h</div>
            </div>
            <div className="col-6 col-md-3 mb-2">
              <strong>UV Index</strong>
              <div>{current.uv}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
