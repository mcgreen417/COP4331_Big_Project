const express = require("express");
const { body, validationResult } = require("express-validator");
const Cognito = require("../services/cognito.service");

class AuthController {
  constructor() {
    this.path = "/api";
    this.router = express.Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/signup", this.validateBody("signUp"), this.signUp);
    this.router.post("/login", this.validateBody("signIn"), this.signIn);
    this.router.post("/verify", this.validateBody("verify"), this.verify);
    this.router.post(
      "/forgot-password",
      this.validateBody("forgotPassword"),
      this.forgotPassword
    );
    this.router.post(
      "/confirm-password",
      this.validateBody("confirmPassword"),
      this.confirmPassword
    );
  }

  // Signup new user
  signUp = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log(req.body);
    const { username, password, email } = req.body;
    let userAttr = [];
    userAttr.push({ Name: "email", Value: email });

    let cognitoService = new Cognito();
    cognitoService.signUpUser(username, password, userAttr).then((success) => {
      success ? res.status(200).end() : res.status(400).end();
    });
  };

  // Use username and password to authenticate user
  signIn = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log(req.body);

    const { username, password } = req.body;
    let cognitoService = new Cognito();
    cognitoService.signInUser(username, password).then((success) => {
      success ? res.status(200).end() : res.status(400).end();
    });
  };

  // confirm signup account with code sent to email
  verify = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log(req.body);
    const { username, code } = req.body;

    let cognitoService = new Cognito();
    cognitoService.confirmSignUp(username, code).then((success) => {
      success ? res.status(200).end() : res.status(400).end();
    });
  };

  confirmPassword = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const { username, password, code } = req.body;

    let cognitoService = new Cognito();
    cognitoService
      .confirmNewPassword(username, password, code)
      .then((success) => {
        success ? res.status(200).end() : res.status(400).end();
      });
  };

  forgotPassword = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const { username } = req.body;

    let cognitoService = new Cognito();
    cognitoService.forgotPassword(username).then((success) => {
      success ? res.status(200).end() : res.status(400).end();
    });
  };

  validateBody(type) {
    switch (type) {
      case "signUp":
        return [
          body("username").notEmpty().isLength({ min: 5 }),
          body("email").notEmpty().normalizeEmail().isEmail(),
          body("password").isString().isLength({ min: 8 }),
        ];
      case "signIn":
        return [
          body("username").notEmpty().isLength({ min: 5 }),
          body("password").isString().isLength({ min: 8 }),
        ];
      case "verify":
        return [
          body("username").notEmpty().isLength({ min: 5 }),
          body("code").notEmpty().isString().isLength({ min: 6, max: 6 }),
        ];
      case "forgotPassword":
        return [body("username").notEmpty().isLength({ min: 5 })];
      case "confirmPassword":
        return [
          body("password").exists().isLength({ min: 8 }),
          body("username").notEmpty().isLength({ min: 5 }),
          body("code").notEmpty().isString().isLength({ min: 6, max: 6 }),
        ];
    }
  }
}

module.exports = AuthController;
