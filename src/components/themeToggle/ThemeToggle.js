import React from "react";
import "./ThemeToggle.css";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle p-2">
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="slider">{theme === "dark" ? "🌙" : "☀️"}</span>
      </label>
    </div>
  );
};

export default ThemeToggle;
