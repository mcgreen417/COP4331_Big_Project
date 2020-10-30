import React from "react";

import "../css/LeftTextBox.css";

function LeftTextBox() {
  return (
    <div className="left-text-box">
      <div className="header-text">
        Your next generation tool for garden management.
      </div>
      <br />
      <br />
      <div className="sub-text">
        <b className="bold">Flower</b> Power helps put control of the garden
        back into your hands. No green thumb? No worries!
      </div>
      <br />
      <div className="sub-text">
        <b className="bold">Track</b> your plant’s growth and receive automated
        reminders for important care tasks. Log important data about your plant
        such as its nickname, species, classification, water and sunglight
        requirements, and store custom notes.
      </div>
      <br />
      <div className="sub-text">
        <b className="bold">Search</b> through your stored plant files to pull
        up information on any plant in your garden on demand. Add, edit, and
        delete entries as your garden grows.
      </div>
      <br />
      <div className="sub-text">
        <b className="bold">Explore</b> nearby plant nurseries to find the
        perfect new addition to your garden!
      </div>
    </div>
  );
}

export default LeftTextBox;
