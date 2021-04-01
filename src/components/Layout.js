import React, { useState, useEffect } from "react";
import Search from "./Search";

export default function Layout(props) {
  let { restos, years, handleSearch, handleClear } = props;
  return (
    <div className="grid-container">
      <div className="header">
        <h2>Noodle Store</h2>
      </div>
      <div className="search">
        <Search
          restos={restos}
          years={years}
          handleSearch={handleSearch}
          handleClear={handleClear}
        />
      </div>
      <div className="main">{props.children}</div>
    </div>
  );
}
