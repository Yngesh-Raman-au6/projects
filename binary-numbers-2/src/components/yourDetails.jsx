import React from "react";
import "../styles/yourDetails.css";

export default function App() {
  return (
    <div className="yourDetails_container">
      <h2>YOUR DETAILS</h2>
      <p>GUEST CHECKOUT</p>
      <div className="input_fields">
        <input type="text" placeholder="Mobile No." />
        <input type="text" placeholder="E-mail" />
      </div>
      <div className="input_buttons">
        <button className="confirm_button">CONFIRM</button>
        <button className="goBack_button">Go Back</button>
      </div>
    </div>
  );
}
