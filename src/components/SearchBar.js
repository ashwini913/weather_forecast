import React from "react";
import "../css/SearchBar.css";

function SearchBar({ term, onInputChange, onInputSubmit }) {
  return (
    <div className="search">
      <form onSubmit={onInputSubmit}>
        <input
          type="text"
          onChange={onInputChange}
          value={term}
          className="location_input"
        ></input>
      </form>
    </div>
  );
}
export default SearchBar;
