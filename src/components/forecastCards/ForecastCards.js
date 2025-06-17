import React from "react";

const ForecastCards = ({ forecast, theme }) => {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="row g-3">
      {forecast.forecastday.map((forecast, index) => (
        <div className="col-lg-2" key={index}>
          <div
            className={`card ${
              theme === "dark" ? "text-white bg-dark" : "text-dark bg-light"
            } h-100 shadow-sm`}
          >
            <div className="card-body text-center">
              <h6>{forecast.date}</h6>
              <h6>{DAYS[new Date(forecast.date).getDay()]}</h6>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={forecast.day.condition.icon}
                  alt={forecast.day.condition.text}
                  className="img-fluid my-2"
                  style={{ maxWidth: "50px" }}
                />
                <small>{forecast.day.condition.text}</small>
              </div>
              <br />
              <div>{forecast.day.avgtemp_c}°C</div>
              <small>Humidity: {forecast.day.avghumidity}%</small>
              <br />
              <small>Wind (Max) : {forecast.day.maxwind_kph}km/h</small>
              <br />
              <small>UV: {forecast.day.uv}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastCards;
