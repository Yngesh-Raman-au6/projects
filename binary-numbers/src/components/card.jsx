import React from "react";
import "../styles/home.css";

export default function Cards(props) {
  return (
    <div className="card_container">
      {console.log(props.src)}
      <div
        style={{
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          height: "80px",
          width: "100%",
          backgroundImage: `url(${props.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%"
        }}
      ></div>
      <div className="info">
        <p className="title">{props.title}</p>
        <p className="desc">Collection of the films that amaze</p>
      </div>
    </div>
  );
}
