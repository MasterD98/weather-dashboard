import React from "react";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button className="btn btn-secondary m-3" onClick={toggleTheme}>
      Switch to {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggle;
