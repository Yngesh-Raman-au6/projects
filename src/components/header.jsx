import React from "react";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import PublicSharpIcon from "@material-ui/icons/PublicSharp";

import "../styles/header.css";

export default function Header() {
  return (
    <div className="header">
      {/* header left */}
      <div className="header_left">
        <div className="logo">
          <TrackChangesIcon className="logo_icon" />
        </div>
        <h1>Cinemeye</h1>
      </div>

      {/* header search area */}
      <div className="header_search">
        <div className="search_area">
          <SearchRoundedIcon className="icon_color" fontSize="small" />
          <input type="text" placeholder="Search" />
        </div>
        <div className="language">
          <PublicSharpIcon className="icon_color" fontSize="small" />
          <p>EN</p>
        </div>
      </div>

      {/* header right */}
      <div className="header_right">
        <button className="login_button">Login</button>
        <button className="try_button">Try Now</button>
      </div>
    </div>
  );
}
