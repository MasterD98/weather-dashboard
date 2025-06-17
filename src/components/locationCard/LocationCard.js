import React from "react";

const LocationCard = ({ location, theme }) => {
  return (
    <div className="col-12 col-lg-2">
      <div
        className={`card ${
          theme === "dark" ? "text-white bg-dark" : "text-dark bg-light"
        } shadow-sm h-100`}
      >
        <div className="card-body d-flex flex-column justify-content-center text-center h-100">
          <h5 className="card-title">Location</h5>
          <p className="mb-1">
            <strong>{location.name}</strong>
          </p>
          <small>
            {location.region}, {location.country}
          </small>
          <br />
          <small>{location.localtime}</small>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
