import React from "react";
import "./GetStarted.css";

function GetStarted() {
  return (
    <section className="g-wrapper" id="started">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <p className="primaryText">Get Started with us</p>
          <p className="secondaryText">
            Subscribe and find attractive price quotes
            <br />
            Find your residence soon
          </p>
          <button className="button">
            <a href="mailto:123@gmail.com">Get Started</a>
          </button>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
