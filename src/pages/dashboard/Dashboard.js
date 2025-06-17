import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { popError } from "../../util/errorMessageUtil";
import ThemeToggle from "../../components/themeToggle/ThemeToggle";
import SearchBar from "../../components/searchBar/SearchBar";
import LocationCard from "../../components/locationCard/LocationCard";
import CurrentWeatherCard from "../../components/currentWeatherCard/CurrentWeatherCard";
import ForecastCards from "../../components/forecastCards/ForecastCards";

const Dashboard = () => {
  const [location, setLocation] = useState("Colombo");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    setLoading(true);
    location &&
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=12`
        )
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((res) => {
          setData(null);
          setLoading(false);

          if (res.status === 400) {
            popError("Location is not found.");
            return;
          }

          if (res.status === 401 || res.status === 403 || res.status === 500) {
            popError("System error.");
            return;
          }
        });
  }, [location]);

  const onSearch = (value) => {
    const searchParam = value;

    if (searchParam === "") {
      popError("Location is mandatory.");
      return;
    }

    const isValid = /^[A-Za-z\s]+$/.test(searchParam);

    if (!isValid) {
      popError("Location must only include letters.");
      return;
    }
    setLocation(searchParam);
  };

  if (loading) {
    return (
      <div
        className={`${
          theme === "dark" ? "bg-dark" : "bg-light"
        } d-flex justify-content-center align-items-center vh-100`}
      >
        <ClipLoader
          color={`${theme === "dark" ? "#FBFBFB" : "#332D2D"}`}
          size={50}
        />
      </div>
    );
  }

  return (
    <div
      className={
        theme === "dark"
          ? "bg-dark container-fluid text-white min-vh-100"
          : "bg-light container-fluid text-dark min-vh-100"
      }
    >
      <div>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <div className="py-4">
          <SearchBar
            onSearch={onSearch}
            isDataAvailable={data !== null}
            theme={theme}
          />

          {!data && (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <h2>No data to preview..</h2>
            </div>
          )}

          {data && (
            <>
              <div className="row align-items-stretch g-3 mb-4">
                <LocationCard location={data.location} theme={theme} />
                <CurrentWeatherCard current={data.current} theme={theme} />
              </div>

              <div>
                <div className="row mb-3">
                  <div className="col text-center">
                    <h2>
                      <span
                        className={` ${
                          theme === "dark" ? "text-white" : "text-dark"
                        } badge`}
                      >
                        Forecast
                      </span>
                    </h2>
                  </div>
                </div>

                <ForecastCards forecast={data.forecast} theme={theme} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
