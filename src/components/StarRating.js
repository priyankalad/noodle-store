import React from "react";
import Star from "./Star";

export default function StarRating(props) {
  let { rating } = props;
  if (isNaN(rating)) rating = 0;
  let arrRating = (rating + "").split(".");
  let intPart = parseInt(arrRating[0]);
  let decimalPart = arrRating[1] ? parseFloat("." + arrRating[1]) : 0;

  let totalStars = 5;
  return (
    <div className="star-rating" title={rating}>
      {[...Array(totalStars)].map((n, i) => {
        let starType = "";
        if (i < intPart) starType = "filled";
        if (i == intPart && decimalPart != 0) {
          if (decimalPart > 0.7) starType = "half75";
          else if (decimalPart > 0.4) starType = "half";
          else starType = "half25";
        }

        return <Star key={i} starType={starType} />;
      })}
    </div>
  );
}
