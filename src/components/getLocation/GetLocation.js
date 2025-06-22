import React from "react";
import { popError } from "../../util/errorMessageUtil";
import "./GetLocation.css";

const GetLocation = ({ setLocation, setLoading, theme }) => {
  const handleGetMyLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const locationString = `${lat},${lon}`;
          setLocation(locationString);
        },
        (error) => {
          popError("Unable to retrieve your location.");
        }
      );
    } else {
      popError("Geolocation is not supported by this browser.");
    }
    setLoading(false);
  };

  return (
    <label className="p-2">
      <button
        className={`btn ${
          theme === "dark" ? "text-white" : "text-dark"
        } location-btn p-2`}
        onClick={handleGetMyLocation}
        title="Use My Location"
        style={{ backgroundColor: theme === "dark" ? "#333" : "#ccc" }}
      >
        𖦏
      </button>
    </label>
  );
};

export default GetLocation;
