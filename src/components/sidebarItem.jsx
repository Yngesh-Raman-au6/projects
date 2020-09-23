import React from "react";
import "../styles/sidebar.css";

export default function SidebarItems(props) {
  return (
    <div className="sidebar_item">
      <props.icon fontSize="small" className="side_icon" />
      <p>{props.text}</p>
    </div>
  );
}
