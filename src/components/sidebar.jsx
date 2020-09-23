import React from "react";
import SidebarItem from "./sidebarItem";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import LiveTvRoundedIcon from "@material-ui/icons/LiveTvRounded";
import MovieFilterRoundedIcon from "@material-ui/icons/MovieFilterRounded";
import FiberDvrRoundedIcon from "@material-ui/icons/FiberDvrRounded";
import HeadsetMicRoundedIcon from "@material-ui/icons/HeadsetMicRounded";
import SportsSoccerRoundedIcon from "@material-ui/icons/SportsSoccerRounded";
import ChildFriendlyRoundedIcon from "@material-ui/icons/ChildFriendlyRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";

import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar_container">
      <small style={{ color: "#343945", marginLeft: 70 }}>Categories</small>
      <div className="sidebar_menu">
        <SidebarItem icon={HomeRoundedIcon} text="Main Page" />
        <SidebarItem icon={LiveTvRoundedIcon} text="TV Channels" />
        <SidebarItem icon={MovieFilterRoundedIcon} text="Movies" />
        <SidebarItem icon={FiberDvrRoundedIcon} text="TV Series" />
        <SidebarItem icon={HeadsetMicRoundedIcon} text="Concerts" />
        <SidebarItem icon={SportsSoccerRoundedIcon} text="Sports" />
        <SidebarItem icon={ChildFriendlyRoundedIcon} text="For Kids" />
        <SidebarItem icon={StarRoundedIcon} text="Favourites" />
        <SidebarItem icon={PersonRoundedIcon} text="Personal Data" />
      </div>
      <div className="download">
        <p>
          Lorem ipsum dolor cum totam amet cum totam amet cum obcaecati? Veniam!
        </p>
        <img
          alt="apple"
          src="https://frisionum.com/wp-content/uploads/2019/10/Apple-app-store-badge.png"
        />
        <img
          alt="google"
          src="https://static-content.4tellus.com/wp-content/uploads/2018/05/23014710/badge-play.png"
        />
        <div className="get"></div>
      </div>
    </div>
  );
}
