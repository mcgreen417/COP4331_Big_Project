import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/RightLoginBox.css";

function RightLoginBox() {
  return (
    <div className="right-text-box">
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
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className="password-field"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button className="login-button" variant="primary" type="submit">
          LOG IN
        </Button>
      </Form>
      <div>
        <p className="sign-up-text">
          Don't have an account?{" "}
          <a className="signup-link" href="">
            Sign up here.
          </a>
        </p>
        <a className="signup-link" href="">
          Forgot your password?
        </a>
      </div>
    </div>
  );
}

export default RightLoginBox;
