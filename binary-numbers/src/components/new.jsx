import React from "react";
import Card from "./card";
import "../styles/home.css";

const New = () => {
  return (
    <div className="collections new">
      <div className="collections_headings">
        <h3>New</h3>
      </div>
      <div className="new_movie_collections">
        <Card
          className="new_scroll"
          title="Adventure"
          src="https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/huffpost_tomorrowland.png"
        />
        <Card
          className="new_scroll"
          title="Adventure"
          src="https://i.pinimg.com/originals/b6/21/63/b62163e3a3f64f037f45c62823664c61.jpg"
        />
        <Card
          className="new_scroll"
          title="Adventure"
          src="https://cdn.onebauer.media/one/empire-tmdb/films/157336/images/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg"
        />
        <Card
          className="new_scroll"
          title="Fantastic"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSX4Ta05ri0081FIUnaDOZA8XcK_seOTDGrqA&usqp=CAU"
        />
      </div>
    </div>
  );
};

export default New;
