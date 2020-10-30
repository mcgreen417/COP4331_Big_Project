import React from "react";
import Header from "../components/Header";
import LeftTextBox from "../components/LeftTextBox";

import "../css/HomePage.css";

const HomePage = () => {
  return (
    <div>
      <Header default />
      <div className="middle-line" />
      <LeftTextBox />
    </div>
  );
};

export default HomePage;
