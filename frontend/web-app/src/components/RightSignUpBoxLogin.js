import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "../css/RightSignUpBoxLogin.css";

class RightSignUpBoxLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      show: false,
      msg: "",
    };
  }

  signUp = async (e) => {
    e.preventDefault();

    // TODO: Do checks to ensure user and email is valid input

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        msg: "Password and confirm password is incorrect.",
        show: true,
      });
      return;
    }

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    });
    const body = await response.text();

    if (response.status === 200) {
      // TODO: Indicate successfully logged in
      console.log(
        "User successfully signed up... redirect to verification code"
      );
      this.props.handleUsernameChange(this.state.username);
    } else {
      this.setState({
        msg:
          "Ensure your username is longer than 6 characters, and your password consists of 8 characters with alphanumeric symbols.",
        show: true,
      });
    }

    console.log(body);
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
            <Alert.Heading>Registration Failed</Alert.Heading>
            <p>{this.state.msg}</p>
          </Alert>
        )}
        <div className="header-text">Welcome to Flower Power</div>
        <div className="sub-text-right">
          Sign in below or create an account to get started tracking your garden
          today!
        </div>
        <Form className="form-box">
          <Form.Group>
            <Form.Control
              className="username-field"
              type="username"
              placeholder="Username"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="username-field"
              type="username"
              placeholder="E-mail address"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="password-field"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="password-field"
              type="password"
              placeholder="Confirm password"
              value={this.state.confirmPassword}
              onChange={(e) =>
                this.setState({ confirmPassword: e.target.value })
              }
            />
          </Form.Group>
          <Button
            className="login-button"
            variant="primary"
            type="submit"
            onClick={this.signUp}
          >
            SIGN UP
          </Button>
        </Form>
        <div>
          <p className="sign-up-text">
            Already have an account?{" "}
            <Link to="/login" className="signup-link">
              Log in here.
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(RightSignUpBoxLogin);
