const express = require("express");
const { body, validationResult } = require("express-validator");
const Cognito = require("../services/cognito.service");
const { v4: uuidv4 } = require('uuid');

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
    this.router.post("/newentry", this.validateBody("newEntry"), this.newEntry);
    this.router.post("/editEntry", this.validateBody("editEntry"), this.editEntry);
  }

  // Signup new user
  signUp = function(req, res) /*=>*/ {
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
  signIn = function(req, res) /*=>*/ {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    const { username, password } = req.body;
    let cognitoService = new Cognito();
    cognitoService.signInUser(username, password).then((success) => {
      success[0] ? res.status(200).json(success[1]) : res.status(400).end();
    });
  };

  // confirm signup account with code sent to email
  verify = function(req, res) /*=>*/ {
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

  confirmPassword = function(req, res) /*=>*/ {
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

  forgotPassword = function(req, res) /*=>*/ {
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

  // Create a New Plant Entry
  newEntry = function(req, res) /*=>*/ {
    
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    // Note:
    // - classifications is expected to be a list of strings
    // - reminders is expected to be an object
    const { userid, nickname, species, sunlight, water, notes, date, classifications, reminders } = req.body;
    var plantid = uuidv4();
    //let cognitoService = new Cognito();

    function error() {
      return typeof userid == "string" && typeof nickname == "string" && typeof species == "string" && typeof sunlight == "number" && typeof water == "number" && typeof date == "string" && typeof notes == "string" && typeof classifications == "object" && typeof reminders == "object"
    }

    if (!error()) {
      var ret = {
        UserID: userid,
        Nickname: nickname,
        Species: species,
        Sunlight: sunlight,
        Water: water,
        Notes: notes,
        DateAcquired: date,
        Classifications: classifications,
        Reminders: reminders,
        Error: "Incorrect field type"
      };
      res.status(400).json(ret);
    }
    else {
      var params = {
        TableName : "Plants",
        Item: {
           PlantID: plantid,
           UserID: userid,
           Nickname: nickname,
           Species: species,
           Sunlight: sunlight,
           Water: water,
           DateAcquired: date,
           Notes: notes,
           Classifications: classifications,
           Reminders: reminders,
        }
      };
      
      var documentClient = new AWS.DynamoDB.DocumentClient();
      
      documentClient.put(params, function(err, data) {
        var ret = {
          UserID: userid,
          Nickname: nickname,
          Species: species,
          Sunlight: sunlight,
          Water: water,
          Notes: notes,
          DateAcquired: date,
          Classifications: classifications,
          Reminders: reminders,
          Error: ""
        };
        res.status(200).json(ret);
      });
    }
  };
  
  //edit an existing plant entry
  editEntry = function(req, res) /*=>*/ {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    const { plantid, userid, nickname, species, sunlight, water, notes, date, classifications, reminders } = req.body;

    function error() {
      return typeof plantid == "string" && typeof userid == "string" && typeof nickname == "string" && typeof species == "string" && typeof sunlight == "number" && typeof water == "number" && typeof date == "string" && typeof notes == "string" && typeof classifications == "object" && typeof reminders == "object"
    }

    if(!error()) {
      var ret = {
        PlantID: plantid,
        UserID: userid,
        Nickname: nickname,
        Species: species,
        Sunlight: sunlight,
        Water: water,
        Notes: notes,
        DateAcquired: date,
        Classifications: classifications,
        Reminders: reminders,
        Error: "Incorrect field type"
      };
      res.status(400).json(ret);
    }

    else {
      const params = {
        TableName: Plants,
        Key: {
          "UserID": uid,
          "PlantID": plantid
        },
        UpdateExpression: "set Nickname = :thisNick, Species = :thisSpecies, Sunlight = :thisSunlight, Water = :thisWater, Notes = :thisnotes, Date Acquired = :thisDate, Classifications = :thisClass, Reminders = :thisReminders",
        ExpressionAttributes: {
          ":thisNick": nickname,
          ":thisSpecies": species,
          ":thisClass": classifications,
          ":thisSunlight": sunlight,
          ":thisWater": water,
          ":thisReminders": reminders,
          ":thisNotes": notes,
          ":thisDate": date
        },
        ReturnValues:"UPDATED_NEW"
      };

      var documentClient = new AWS.DynamoDB.DocumentClient();
  
      //update table
      documentClient.update(params, function(err, data) {
        if(err) {
          console.log(" Failed To Update Item ");
          var ret = {
            PlantID: plantid,
            UserID: userid,
            Nickname: nickname,
            Species: species,
            Sunlight: sunlight,
            Water: water,
            Notes: notes,
            DateAcquired: date,
            Classifications: classifications,
            Reminders: reminders,
            Error: err
          };
          res.status(400).json(ret);
        } else {
          console.log(" Successfully Updated Item ");
          var ret = {
            PlantID: plantid,
            UserID: userid,
            Nickname: nickname,
            Species: species,
            Sunlight: sunlight,
            Water: water,
            Notes: notes,
            DateAcquired: date,
            Classifications: classifications,
            Reminders: reminders,
            Error: "Incorrect field type"
          };
          res.status(400).json(ret);
        }
      });
    }
  }

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
