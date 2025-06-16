import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { popError } from "../../util/errorMessageUtil";

const Dashboard = () => {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [city, setCity] = useState("Colombo");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    city &&
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=12`
        )
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((res) => {
          setData(null);
          setLoading(false);

          if (res.status === 400) {
            popError("City name is not found.");
            return;
          }

          if (res.status === 401 || res.status === 500) {
            popError("System error.");
            return;
          }
        });
  }, [city]);

  const onSearch = () => {
    const searchParam = inputRef.current.value;

    if (searchParam === "") {
      popError("City name is mandatory.");
      return;
    }

    const isValid = /^[A-Za-z\s]+$/.test(searchParam);

    if (!isValid) {
      popError("City name must only include letters.");
      return;
    }
    setCity(searchParam);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="row mb-4 justify-content-center">
        <div className="col-lg-2">
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              className="form-control"
              placeholder="Search location..."
            />
            <button className="btn btn-dark" onClick={onSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          {!data && <p>Please enter valid city name</p>}
        </div>
      </div>

      {!data && (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <h2>No data to preview..</h2>
        </div>
      )}

      {data && (
        <>
          <div className="row align-items-stretch g-3 mb-4">
            <div className="col-12 col-lg-2">
              <div className="card text-white bg-dark shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-center text-center h-100">
                  <h5 className="card-title">Location</h5>
                  <p className="mb-1">
                    <strong>{data.location.name}</strong>
                  </p>
                  <small>
                    {data.location.region}, {data.location.country}
                  </small>
                  <br />
                  <small>{data.location.localtime}</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-10">
              <div className="card text-white bg-dark shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-center">Current Weather</h5>

                  <div className="d-flex flex-column align-items-center mb-3">
                    <img
                      src={data.current.condition.icon}
                      alt={data.current.condition.text}
                      className="img-fluid"
                      style={{ maxWidth: "60px" }}
                    />
                    <small>{data.current.condition.text}</small>
                  </div>

                  <div className="row text-center">
                    <div className="col-6 col-md-3 mb-2">
                      <strong>Temperature</strong>
                      <div>{data.current.temp_c}°C</div>
                    </div>
                    <div className="col-6 col-md-3 mb-2">
                      <strong>Humidity</strong>
                      <div>{data.current.humidity}%</div>
                    </div>
                    <div className="col-6 col-md-3 mb-2">
                      <strong>Wind</strong>
                      <div>{data.current.wind_kph} km/h</div>
                    </div>
                    <div className="col-6 col-md-3 mb-2">
                      <strong>UV Index</strong>
                      <div>{data.current.uv}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="row mb-3">
              <div className="col text-center">
                <h2>
                  <span className="badge bg-primary">Forecast</span>
                </h2>
              </div>
            </div>

            <div className="row g-3">
              {data.forecast.forecastday.map((forecast, index) => (
                <div className="col-lg-2" key={index}>
                  <div className="card text-white bg-dark h-100 shadow-sm">
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
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
