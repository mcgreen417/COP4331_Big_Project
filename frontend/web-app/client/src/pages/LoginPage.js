import React from "react";
import Header from "../components/Header";
import LeftTextBox from "../components/LeftTextBox";
import RightLoginBox from "../components/RightLoginBox";
import RightSignUpBox from "../components/RightSignUpBox";

import "../css/LoginPage.css";

const LoginPage = (props) => {
  return (
    <div>
      <Header default />
      <div className="middle-line" />
      <LeftTextBox />
      {props.isSignUp ? <RightSignUpBox /> : <RightLoginBox />}
    </div>
  );
};

export default LoginPage;
