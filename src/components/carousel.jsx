import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/carousel.css";

const items = [
  {
    id: 1,
    altText: "Slide 1",
    caption: "Slide 1",
    src:
      "https://cdn.onebauer.media/one/empire-tmdb/films/157336/images/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
    title: "Interstellar"
  },
  {
    id: 2,
    altText: "Slide 2",
    caption: "Slide 2",
    src:
      "https://i.pinimg.com/originals/b6/21/63/b62163e3a3f64f037f45c62823664c61.jpg",
    title: "Adventure"
  },
  {
    id: 3,
    altText: "Slide 3",
    caption: "Slide 3",
    src:
      "https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/huffpost_tomorrowland.png",
    title: "Alone"
  }
];

const App = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <div
          className="custom-tag-img"
          style={{
            backgroundImage: `url(${item.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%"
          }}
        ></div>
        <div className="posterDetails">
          <div className="theme">Action | Drama | Movie | Adventure</div>
          <h1>{item.title}</h1>
          <div className="butns">
            <button className="watch">Watch trailer</button>
            <button className="add">Add to favourites</button>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            culpa magni, quae obcaecati accusantium ullam minima sit, beatae, et
            aliquam maxime autem.
          </p>
        </div>
      </CarouselItem>
    );
  });

  return (
    <div className="carousel_area">
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default App;
