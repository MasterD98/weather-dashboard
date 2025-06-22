import React from "react";
import { popError } from "../../util/errorMessageUtil";

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
    <button
      className={`btn ${
        theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
      }`}
      onClick={handleGetMyLocation}
    >
      𖦏
    </button>
  );
};

export default GetLocation;
