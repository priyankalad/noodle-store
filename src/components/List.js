import React from "react";
import Card from "./Card";

export default function List(props) {
  let { restos } = props;

  return (
    <div className="noodle-list-grid">
      {restos.map((resto, index) => (
        <Card key={index} resto={resto} />
      ))}
    </div>
  );
}
