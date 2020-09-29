import React from "react";
import "../styles/movieDetails.css";

export default function App() {
  return (
    <div className="movieDetails_container">
      <div className="poster"></div>
      <div className="poster_details">
        <p className="p1">Movie</p>
        <h2>Knives Out (2D) (EN)</h2>
        <p className="p2">Cinepolis Atrium Mall</p>
        <p className="p3">WED, 8th JAN, 2020</p>
      </div>
    </div>
  );
}
