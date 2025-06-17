import React from "react";

const SearchBar = ({ inputRef, onSearch, isDataAvailable, theme }) => {
  return (
    <div className="row mb-4 justify-content-center">
      <div className="col-lg-2">
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Search location..."
          />
          <button
            className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"}`}
            onClick={onSearch}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        {!isDataAvailable && <p>Please enter valid location</p>}
      </div>
    </div>
  );
};

export default SearchBar;
