import React from "react";
import Header from "../components/Header";
import LeftTextBox from "../components/LeftTextBox";

import "../css/LoginPage.css";

const LoginPage = (props) => {
  return (
    <div>
      <Header default />
      <div className="middle-line" />
      <LeftTextBox />
    </div>
  );
};

export default LoginPage;
