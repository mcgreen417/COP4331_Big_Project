import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "../css/CenterFormBox.css";

class CenterFormBox extends React.Component {
  constructor(props) {
    super(props);

    this.differentSubtexts = [
      "To reset your password, please enter the username associated with your account.",
      "A verification code has been sent to the e-mail address you used to create your account. Please type the code you received below and your new password.",
      "A verification code has been sent to the e-mail address you used to create your account. Please type the code you received below to activate your account.",
    ];

    this.state = {
      verifyCode: "",
      username: props.username || "",
      email: "",
      password: "",
      confirmPassword: "",
      stage: props.stage || 0,
    };
  }

  forgotPassword = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
      }),
    });
    const body = await response.text();

    if (response.status === 200) {
      // TODO: Indicate successfully logged in
      console.log("Username successfully found");
      this.setState({ stage: 1 });
    } else if (response.status === 400) {
      // TODO: Indicate not logged in
      console.log("Username not found");
    } else {
      console.log("Incorrect input for username field");
    }

    console.log(body);
  };

  confirmPassword = async (e) => {
    e.preventDefault();

    // TODO: Do checks to ensure user and email is valid input

    if (this.state.password !== this.state.confirmPassword) {
      console.log("password !== confirmPassword");
      // TODO: Display issue regarding password not equal to confirm password.
    }

    const response = await fetch("/api/confirm-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        code: this.state.verifyCode,
      }),
    });

    const body = await response.text();

    if (response.status === 200) {
      // TODO: Indicate successfully logged in
      console.log("Password Successfully Changed");
    } else if (response.status === 400) {
      // TODO: Indicate invalid code
      console.log("Wrong code");
    } else {
      console.log("Password or code fields are invalid");
    }

    console.log(body);
  };

  verify = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        code: this.state.verifyCode,
      }),
    });

    const body = await response.text();

    if (response.status === 200) {
      // TODO: Indicate code was successful
      console.log("Password Successfully Changed");
      this.setState({
        verifyCode: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        stage: 0,
      });
      this.props.handleUsernameChange("");
      this.props.history.push("/");
    } else if (response.status === 400) {
      // TODO: Indicate invalid code
      console.log("Wrong code");
    } else {
      // TODO: Indicate code is incorrect
      console.log("Code field is invalid");
    }
  };

  render() {
    return (
      <div className="center-text-box">
        <div className="header-text">Welcome to Flower Power</div>
        <div className="sub-text-right">
          {this.differentSubtexts[this.state.stage]}
        </div>
        <Form className="form-box">
          {this.state.stage === 0 && (
            <>
              <Form.Group>
                <Form.Control
                  className="username-field"
                  type="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </Form.Group>
              <Button
                className="login-button"
                variant="primary"
                type="submit"
                onClick={this.forgotPassword}
              >
                RESET
              </Button>
            </>
          )}
          {this.state.stage === 1 && (
            <>
              <Form.Group>
                <Form.Control
                  className="username-field"
                  type="username"
                  placeholder="Reset code"
                  value={this.state.verifyCode}
                  onChange={(e) =>
                    this.setState({ verifyCode: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="password-field"
                  type="password"
                  placeholder="New password"
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
                onClick={this.confirmPassword}
              >
                VERIFY AND CHANGE
              </Button>
            </>
          )}
          {this.state.stage === 2 && (
            <>
              <Form.Group>
                <Form.Control
                  className="username-field"
                  type="username"
                  placeholder="Reset code"
                  value={this.state.verifyCode}
                  onChange={(e) =>
                    this.setState({ verifyCode: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                className="login-button"
                variant="primary"
                type="submit"
                onClick={this.verify}
              >
                VERIFY
              </Button>
            </>
          )}
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

export default withRouter(CenterFormBox);
