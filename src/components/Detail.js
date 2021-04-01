import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function Detail(props) {
  let { location } = props;

  let resto, topten;
  if (location && location.restoProp) {
    resto = location.restoProp.resto;
    topten = resto["Top Ten"].split(" ");
  } else {
    let restos =
      sessionStorage.getItem("noodle-store-data") &&
      JSON.parse(sessionStorage.getItem("noodle-store-data"));

    resto = restos.filter((r) => r.id == props.match.params.id)[0];

    topten = resto["Top Ten"].split(" ");
  }

  return (
    <>
      <div className="detail-container">
        <img class="image" src={resto.imageUrl} alt="image" />

        <div class="info">
          <h2>{resto.Variety}</h2>
          <StarRating rating={resto.Stars} />
          <br />
          <p>
            <b>Style: {resto.Style}</b>
          </p>
          <p>
            <b>Year: {topten[0]}</b>
          </p>
          <p>
            <b>Rank: {topten[1]}</b>
          </p>
        </div>
      </div>
      <div className="back">
        <Link to="/">Back to List</Link>
      </div>
    </>
  );
}
