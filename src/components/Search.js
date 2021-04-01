import React, { useState, useEffect } from "react";

export default function Search(props) {
  let { restos, handleSearch, handleClear } = props;

  const [brand, setBrand] = useState("");

  let handleChange = (event) => {
    let elementId = event.target.id;
    let value = event.target.value;
    switch (elementId) {
      case "searchByBrand":
        setBrand(value);
        break;

      default:
        setBrand("");
        break;
    }
  };

  let clear = () => {
    setBrand("");
    handleClear();
  };

  return (
    <div className="search-container">
      <input
        id="searchByBrand"
        type="text"
        value={brand}
        onChange={handleChange}
        placeholder="Brand"
      />
      <button onClick={() => handleSearch(brand)}>Search</button>
      <button onClick={() => clear()}>Clear</button>
    </div>
  );
}
