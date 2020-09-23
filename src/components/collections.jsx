import React from "react";
import Card from "./card";
import "../styles/home.css";

const Collections = () => {
  return (
    <div className="collections">
      <div className="collections_headings">
        <h3>Movie Collections</h3>
        <button>All collections</button>
      </div>
      <div className="movie_collections">
        <Card
          title="Adventure"
          src="https://cdn.onebauer.media/one/empire-tmdb/films/157336/images/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg"
        />
        <Card
          title="Fantastic"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSX4Ta05ri0081FIUnaDOZA8XcK_seOTDGrqA&usqp=CAU"
        />
        <Card
          title="Comedy"
          src="https://vetshangout.com/forum/uploads/videos/thumbnails/monthly_04_2015/thumb_9.jpg"
        />
        <Card
          title="Drama"
          src="https://www.cheatsheet.com/wp-content/uploads/2019/10/Joaquin-Phoenix2.jpeg"
        />
      </div>
    </div>
  );
};

export default Collections;
