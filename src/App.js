import React from "react";
import Sidebar from "./components/sidebar";
import Home from "./components/home";
import Header from "./components/header";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="home">
          <Sidebar />
          <Home />
        </div>
      </div>
    </div>
  );
}
