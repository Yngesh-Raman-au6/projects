import React from "react";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";

import "../styles/confirm.css";

export default function App() {
  return (
    <div className="confirm_container">
      <div className="confirm_left">
        <PaymentRoundedIcon className="wallet" fontSize="large" />
        <h2>Confirm & Pay</h2>
      </div>
      <div className="confirm_right">
        <div className="clock">
          <h2>4:54</h2>
          <AccessTimeRoundedIcon fontSize="small" />
        </div>
        <p>Till your booking session expires</p>
      </div>
    </div>
  );
}
