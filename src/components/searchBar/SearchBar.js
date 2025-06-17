import axios from "axios";
import debounce from "lodash.debounce";
import React, { useEffect, useRef, useState } from "react";

const SearchBar = ({ onSearch, isDataAvailable, theme }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = debounce(async (q) => {
    if (!q) return setSuggestions([]);

    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_API_KEY}&q=${q}`
      );
      setSuggestions(res.data);
    } catch (err) {
      if (!axios.isCancel(err)) console.error(err);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(query);
  }, [query]);

  return (
    <div className="row mb-4 justify-content-center">
      <div className="col-lg-2 position-relative">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"}`}
            onClick={() => onSearch(query)}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        {!isDataAvailable && suggestions.length === 0 && (
          <p>Please enter valid location</p>
        )}

        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 z-3 mt-1">
            {suggestions.map((loc) => (
              <li
                key={loc.id || loc.name}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setQuery(loc.name);
                  setSuggestions([]);
                  onSearch(loc.name);
                }}
              >
                {loc.name}, {loc.region}, {loc.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
