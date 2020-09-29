import React from "react";
import "../styles/makePayment.css";

export default function App() {
  return (
    <div className="payment_container">
      <div className="payment_header">
        <h1>PAYMENT</h1>
        <div className="payment_logo"></div>
      </div>
      <div className="payment_body">
        <div className="terms">
          <div className="check1">
            <input type="checkbox" name="accept" />
            <label htmlFor="accept">
              I accept that entry to your cinemas will also be in adherence with
              the same governmentguidelines provided to the mall.
            </label>
          </div>
          <div className="check2">
            <input type="checkbox" name="understand" />
            <label htmlFor="understand">
              I understand that seats next to my selected seats will be left
              vaccant and that I should maintain physical distancing to protect
              myself and others.
            </label>
          </div>
        </div>
        <div className="pay_button">
          <button>MAKE PAYMENT</button>
        </div>
      </div>
    </div>
  );
}
