import React, { useState } from "react";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

import "../styles/header.css";

export default function App() {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    console.log("burger clicked");
    setMenu(!menu);
  };
  return (
    <header className="header">
      {console.log("Menu clicked____", menu)}
      <div className="header_body">
        <div
          onClick={handleMenu}
          style={{ padding: 10, color: "gray" }}
          className="hamburger"
        >
          <MenuRoundedIcon />
        </div>
        <div className="logo">
          <div className="logo_img"></div>
        </div>

        <div className={`navbar ${menu && "menu_active"}`}>
          <p className="navbar_item">MOVIES</p>
          <p className="navbar_item">CINEMAS</p>
          <p className="navbar_item">EXPERIENCES</p>
          <p className="navbar_item">F&B</p>
          <p className="navbar_item">PROMOTIONS</p>
          <button className="nav_button">LOGIN/SIGN UP</button>
        </div>
      </div>
    </header>
  );
}
