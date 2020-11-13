import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import LeftTextBox from "../components/LeftTextBox";
import RightLoginBox from "../components/RightLoginBox";
import RightSignUpBox from "../components/RightSignUpBox";
import CenterFormBox from "../components/CenterFormBox";
import Auth from "../components/Auth";

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
      Auth.login(() => console.log("authenticated"));
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
            <div className="middle-line" /> <LeftTextBox />
          </>
        )}
        {!this.props.isSignUp && <RightLoginBox />}
        {this.props.isSignUp && !this.state.username && (
          <RightSignUpBox handleUsernameChange={this.handleUsernameChange} />
        )}
        {this.props.isSignUp && this.state.username && (
          <CenterFormBox
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
