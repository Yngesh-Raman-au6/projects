import React from "react";
import Confirm from "./confirm";
import YourDetails from "./yourDetails";
import MovieDetails from "./movieDetails";
import TicketDetails from "./ticketDetails";
import MakePayment from "./makePayment";
import "../styles/details.css";

export default function App() {
  return (
    <div className="details_container">
      <Confirm />
      <div className="details">
        <div className="details_left">
          <YourDetails />
        </div>
        <div className="details_right">
          <MovieDetails />
          <TicketDetails />
        </div>
      </div>
      <div className="make__payment">
        <MakePayment />
      </div>
    </div>
  );
}
