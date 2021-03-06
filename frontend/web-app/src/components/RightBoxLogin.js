import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "../css/RightBoxLogin.css";

class RightBoxLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      username: "",
      password: "",
      show: false,
    };
  }

  login = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    });
    const body = await response.text();
    if (response.status === 200) {
      const { AccessToken, RefreshToken, IdToken } = JSON.parse(body);
      localStorage.accessToken = AccessToken;
      localStorage.refreshToken = RefreshToken;
      localStorage.idToken = IdToken;
      this.props.history.push("/home");
    } else {
      // TODO: Indicate not logged in
      console.log("Unsuccessful login");
      this.setState({ show: true });
    }
  };

  render() {
    return (
      <div className="right-text-box">
        {this.state.show && (
          <Alert
            className="show-button"
            variant="danger"
            onClose={() => this.setState({ show: false })}
            dismissible
          >
            <Alert.Heading>Invalid Username and Password!</Alert.Heading>
            <p>You may need to register or verify your email address.</p>
          </Alert>
        )}
        <div className="header-text">Welcome to Flower Power</div>
        <div className="sub-text-right">
          Sign in below or create an account to get started tracking your garden
          today!
        </div>
        <Form className="form-box">
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className="username-field"
              type="username"
              placeholder="Username"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="password-field"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>
          <Button
            className="login-button"
            variant="primary"
            type="submit"
            onClick={this.login}
          >
            LOG IN
          </Button>
        </Form>
        <div>
          <p className="sign-up-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up here.
            </Link>
          </p>
          <Link to="/forgot-password" className="signup-link">
            Forgot your password?
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(RightBoxLogin);
