import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Home from "./components/home";
import Header from "./components/header";
import "./styles.css";

export default function App() {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    console.log("burger clicked");
    setMenu(!menu);
  };
  return (
    <div className="App">
      <div className="mycontainer">
        <Header handleMenu={handleMenu} />
        <div className="home">
          <Sidebar menu={menu} />
          <Home />
        </div>
      </div>
    </div>
  );
}
