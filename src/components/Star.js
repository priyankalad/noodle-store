import React from "react";

export default function Star(props) {
  let { starType } = props;

  return <div className={`star ${starType}`}></div>;
}
