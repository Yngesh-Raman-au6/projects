import React from "react";
import "../styles/ticketDetails.css";

export default function App() {
  return (
    <div className="ticketDetails_container">
      {/* tickets */}
      <div className="tickets">
        <p>Tickets</p>
        <div className="ticket_details">
          <div className="tickets_left">
            <p className="ticket_item">H1, H2, H3 (Audi A)</p>
          </div>
          <div className="tickets_right">
            <h2>10 SR</h2>
          </div>
        </div>
      </div>
      {/* addons */}
      <div className="addOns tickets">
        <p>Add-Ons</p>
        <div className="ticket_details">
          <div className="tickets_left">
            <p className="ticket_item">Large Popcorn + Large Coke</p>
          </div>
          <div className="tickets_right">
            <h2>20 SR</h2>
          </div>
        </div>
        <div className="ticket_details">
          <div className="tickets_left">
            <p className="ticket_item">Large Salad + Bread</p>
          </div>
          <div className="tickets_right">
            <h2>15 SR</h2>
          </div>
        </div>
      </div>
      {/* total taxes */}
      <div className="total tickets">
        <div className="ticket_details taxes">
          <div className="tickets_left">
            <div className="tax_area">
              <p className="ticket_item">Taxes</p>
              <p className="tax_percent">(8%)</p>
            </div>
          </div>
          <div className="tickets_right">
            <h2>5 SR</h2>
          </div>
        </div>
        <div className="ticket_details taxes">
          <div className="tickets_left">
            <p className="ticket_item">Total</p>
          </div>
          <div className="tickets_right">
            <h2>35 SR</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
