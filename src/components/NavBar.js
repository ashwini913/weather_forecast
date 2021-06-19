import React from "react";
import "../css/NavBar.css";
import SearchBar from "./SearchBar";

function NavBar({ term, onInputChange, onInputSubmit, weatherData }) {
  const place = () => {
    if (weatherData) {
      return weatherData.data.city.name;
    }
    return "";
  };
  return (
    <div className="nav_bar">
      <div>
        <SearchBar
          term={term}
          onInputChange={onInputChange}
          onInputSubmit={onInputSubmit}
        />
      </div>
      <div className="place">{` Place : ${place()} `}</div>
    </div>
  );
}
export default NavBar;
