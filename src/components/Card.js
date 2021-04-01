import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function Card(props) {
  let { resto } = props;
  let topten = resto["Top Ten"].split(" ");

  return (
    <div className="card">
      <img
        loading="lazy"
        src={resto.imageUrl}
        alt="img"
        style={{ width: "100%" }}
      />
      <section>
        <h5>{resto.Variety}</h5>
        <StarRating rating={resto.Stars} />
        <br />
        <p>Brand: {resto.Brand}</p>
        <p>Country: {resto.Country}</p>
        <p>Year: {topten[0]}</p>
        <p>Rank: {topten[1]}</p>

        <footer>
          <Link
            to={{
              pathname: `/detail/${resto.id}`,
              restoProp: { resto: resto },
            }}
          >
            Detail
          </Link> 
        </footer>
      </section>
    </div>
  );
}
