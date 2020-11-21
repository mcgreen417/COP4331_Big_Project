import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import LeftTextBoxLogin from "../components/LeftTextBoxLogin";
import RightBoxLogin from "../components/RightBoxLogin";
import RightSignUpBoxLogin from "../components/RightSignUpBoxLogin";
import CenterFormBoxLogin from "../components/CenterFormBoxLogin";

import "../css/LoginPage.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  componentDidMount() {
    // TODO: Ensure access token is still valid
    if (localStorage.accessToken) {
      this.props.history.push("/home");
    }
  }

  handleUsernameChange(username) {
    this.setState({ username: username });
  }

  render() {
    return (
      <div className="loginpage">
        <Header default />
        {!this.state.username && (
          <>
            <div className="middle-line" /> <LeftTextBoxLogin />
          </>
        )}
        {!this.props.isSignUp && <RightBoxLogin />}
        {this.props.isSignUp && !this.state.username && (
          <RightSignUpBoxLogin
            handleUsernameChange={this.handleUsernameChange}
          />
        )}
        {this.props.isSignUp && this.state.username && (
          <CenterFormBoxLogin
            stage={2}
            username={this.state.username}
            handleUsernameChange={this.handleUsernameChange}
          />
        )}
      </div>
    );
  }
}

export default withRouter(LoginPage);
