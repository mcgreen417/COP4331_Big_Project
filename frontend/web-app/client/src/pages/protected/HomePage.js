import React from "react";
import Header from "../../components/Header";
import LeftBoxHome from "../../components/protected/LeftBoxHome";

import "../../css/protected/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <LeftBoxHome />
    </div>
  );
};

export default HomePage;
