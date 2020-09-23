import React from "react";
import "../styles/home.css";

export default function Cards(props) {
  return (
    <div className="card_container">
      <img src={props.src} alt="card" />
      <div className="info">
        <p className="title">{props.title}</p>
        <p className="desc">Collection of the films that amaze</p>
      </div>
    </div>
  );
}
