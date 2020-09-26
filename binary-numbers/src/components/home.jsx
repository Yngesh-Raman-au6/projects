import React from "react";
import Collections from "./collections";
import New from "./new";
import MyCarousel from "./carousel";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home_container">
      <MyCarousel />
      <Collections />
      <New />
    </div>
  );
}
