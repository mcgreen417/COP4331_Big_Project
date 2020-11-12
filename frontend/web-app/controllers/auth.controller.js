const express = require("express");
const { body, validationResult } = require("express-validator");
const Cognito = require("../services/cognito.service");
const { v4: uuidv4 } = require("uuid");

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
  signUp = function (req, res) /*=>*/ {
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
    console.log(result);
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

  // TODO: Need to mvoe everything below to protected.controller.js since these should only be accessed
  // when user is successfully logged in.

  // Create a New Plant Entry
  // Input:
  //  - "userid"
  //  - "nickname"
  //  - "species"
  //  - "sunlight"
  //  - "water"
  //  - "notes"
  //  - "date"
  //  - "classification"
  //  - "reminders"
  // Output:
  //  - If input types are correct: json object of all input pairs and empty error pair
  //  - If input types are incorrect: json object of all input pairs and error pair
  newEntry = (req, res) => {
    // TODO: Should use validateBody with validationResult or else request could cause failure.
    var documentClient = new AWS.DynamoDB.DocumentClient();

    let createEntry = function () {
      // Note:
      // - classification is expected to be a list of strings
      // - reminders is expected to be an object

      var userid = req.body.userid;
      var nickname = req.body.nickname;
      var species = req.body.species;
      var sunlight = req.body.sunlight;
      var water = req.body.water;
      var notes = req.body.notes;
      var date = req.body.date;
      var classification = req.body.classification;
      var reminders = req.body.reminders;
      var plantid = uuidv4();

      var params = {
        TableName: "Plants",
        Item: {
          PlantID: plantid,
          UserID: userid,
          Nickname: nickname,
          Species: species,
          Sunlight: sunlight,
          Water: water,
          DateAcquired: date,
          Notes: notes,
          Classification: classification,
          Reminders: reminders,
        },
      };

      // TODO: Below needs a 400 error
      documentClient.put(params, function (err, data) {
        var ret = {
          UserID: userid,
          Nickname: nickname,
          Species: species,
          Sunlight: sunlight,
          Water: water,
          Notes: notes,
          DateAcquired: date,
          Classification: classification,
          Reminders: reminders,
          Error: "",
        };
        res.status(200).json(ret);
      });
    };
    createEntry();
  };

  //edit an existing plant entry
  editEntry = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    const {
      plantid,
      userid,
      nickname,
      species,
      sunlight,
      water,
      notes,
      date,
      classifications,
      reminders,
    } = req.body;

    // TODO: everything you're trying to do below can be done in this.validateBody() with validationResult().

    //check if entry exists

    //console.log(typeof reminders);

    /*function error() {
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
    }*/

    //else {
    const params = {
      TableName: Plants,
      Key: {
        UserID: uid,
        PlantID: plantid,
      },
      UpdateExpression:
        "set Nickname = :thisNick, Species = :thisSpecies, Sunlight = :thisSunlight, Water = :thisWater, Notes = :thisnotes, Date Acquired = :thisDate, Classifications = :thisClass, Reminders = :thisReminders",
      ExpressionAttributes: {
        ":thisNick": nickname,
        ":thisSpecies": species,
        ":thisClass": classifications,
        ":thisSunlight": sunlight,
        ":thisWater": water,
        ":thisReminders": reminders,
        ":thisNotes": notes,
        ":thisDate": date,
      },
      ReturnValues: "UPDATED_NEW",
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();

    //update table
    documentClient.update(params, function (err, data) {
      if (err) {
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
          Error: err,
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
          Error: "Incorrect field type",
        };
        res.status(200).json(ret);
      }
    });
    //}
  };

  //delete plant entry
  deleteEntry = (req, res) => {
    //check if entry exists
    //remove entry
  };

  // Search for an existing plant entry
  // Input:
  //  - "userid"
  //  - "search"
  // Output:
  //  - If items found: json array of objects with key pairs of all attributes
  //  - If no items found: json object of userid, search, and error
  searchEntry = (req, res) => {
    // TODO: Should use validateBody with validationResult or request could cause failure.
    var documentClient = new AWS.DynamoDB.DocumentClient();

    let searchEntry = function () {
      //const { userid, search } = req.body;
      var userid = req.body.userid;
      var search = req.body.search;

      var params = {
        TableName: "Plants",
        FilterExpression:
          "contains(#nickname, :nickname) AND #userid = :userid",
        ExpressionAttributeNames: {
          "#nickname": "Nickname",
          "#userid": "UserID",
        },
        ExpressionAttributeValues: {
          ":nickname": search,
          ":userid": userid,
        },
      };

      documentClient.scan(params, function (err, data) {
        if (data.Items === undefined || data.Items.length == 0) {
          var ret = {
            UserID: userid,
            Search: search,
            Error: "Entry not found",
          };
          res.status(400).json(ret);
        } else {
          var ret = [];
          data.Items.forEach(function (item) {
            ret.push(item);
          });
          res.status(200).json(ret);
        }
      });
    };
    searchEntry();
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
