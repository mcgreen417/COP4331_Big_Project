const express = require("express");
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const Cognito = require("../services/cognito.service");
const AuthMiddleware = require("../middleware/auth.middleware"); //Remove for Testing

class ProtectedController {
  constructor() {
    this.path = "/protected";
    this.router = express.Router();
    this.authMiddleware = new AuthMiddleware(); //Remove for Testing
    this.initRoutes();
  }

  initRoutes() {
    this.router.use(this.authMiddleware.verifyToken); //Remove for Testing
    this.router.post("/fetchUser", this.fetchUser);
    this.router.post("/newEntry", this.validateBody("newEntry"), this.newEntry);
    this.router.post(
      "/editEntry",
      this.validateBody("editEntry"),
      this.editEntry
    );
    this.router.post(
      "/deleteEntry",
      this.validateBody("deleteEntry"),
      this.deleteEntry
    );
    this.router.post(
      "/searchentry",
      this.validateBody("searchEntry"),
      this.searchEntry
    );
    this.router.post(
      "/reportAProblem",
      this.validateBody("reportAProblem"),
      this.reportAProblem
    );
  }

  fetchUser = (req, res) => {
    const { token } = req.body;
    let cognitoService = new Cognito();
    cognitoService.getUser(token).then((success) => {
      success[0] ? res.status(200).json(success[1]) : res.status(400).end();
    });
  };

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
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log(req.body);
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

      documentClient.put(params, function (err, data) {
        if (err) {
          console.log(" Failed to Create Item ");
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
            Error: "Error Creating Entry",
          };
          res.status(400).json(ret);
        } else {
          console.log(" Successfully Created Item ");
          var ret = {
            PlantID: plantid,
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
        }
      });
    };
    createEntry();
  };

  //edit an existing plant entry
  // Input:
  //  - "plantid"
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
  //    - If input is not already an instance in the table: json object of all input pairs and error pair
  //    - If input was not able to be deleted: json object of all input pairs and error pair
  //    - If input was successfully deleted: json object of all input pairs and empty error pair
  //  - If input types are incorrect: json object of all input pairs and error pair
  editEntry = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    var userid = req.body.userid;
    var nickname = req.body.nickname;
    var species = req.body.species;
    var sunlight = req.body.sunlight;
    var water = req.body.water;
    var notes = req.body.notes;
    var date = req.body.date;
    var classification = req.body.classification;
    var reminders = req.body.reminders;
    var plantid = req.body.plantid;

    var documentClient = new AWS.DynamoDB.DocumentClient();

    //check if entry exists in table
    let checkInst = function () {
      const params = {
        TableName: Plants,
        Key: {
          PlantID: plantid,
          UserID: userid,
          Nickname: nickname,
          Species: species,
          Sunlight: sunlight,
          Water: water,
          Notes: notes,
          DateAcquired: date,
          Classifications: classification,
          Reminders: reminders,
        },
      };

      documentClient.get(params, function (err, data) {
        if (err) {
          console.log(" Item Does Not Exist ");
          var ret = {
            PlantID: plantid,
            UserID: userid,
            Nickname: nickname,
            Species: species,
            Sunlight: sunlight,
            Water: water,
            Notes: notes,
            DateAcquired: date,
            Classification: classification,
            Reminders: reminders,
            Error: " Item Does Not Exist In Table ",
          };
          res.status(400).json(ret);
        }
      });
    };

    let editEntry = function () {
      const params = {
        TableName: Plants,
        Key: {
          UserID: userid,
          PlantID: plantid,
        },
        UpdateExpression:
          "set Nickname = :thisNick, Species = :thisSpecies, Sunlight = :thisSunlight, Water = :thisWater, Notes = :thisnotes, DateAcquired = :thisDate, Classifications = :thisClass, Reminders = :thisReminders",
        ExpressionAttributes: {
          ":thisNick": nickname,
          ":thisSpecies": species,
          ":thisClass": classification,
          ":thisSunlight": sunlight,
          ":thisWater": water,
          ":thisReminders": reminders,
          ":thisNotes": notes,
          ":thisDate": date,
        },
        ReturnValues: "UPDATED_NEW",
      };

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
            Error: "",
          };
          res.status(200).json(ret);
        }
      });
    };

    checkInst();
    editEntry();
  };

  //delete plant entry
  //check if entry exists in table
  // Input:
  //  -s "plantid"
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
  //  - If input types are correct:
  //    - If input is not already an instance in the table: json object of all input pairs and error pair
  //    - If input was not able to be deleted: json object of all input pairs and error pair
  //    - If input was successfully deleted: json object of all input pairs and empty error pair
  //  - If input types are incorrect: json object of all input pairs and error pair
  deleteEntry = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    var userid = req.body.userid;
    var nickname = req.body.nickname;
    var species = req.body.species;
    var sunlight = req.body.sunlight;
    var water = req.body.water;
    var notes = req.body.notes;
    var date = req.body.date;
    var classification = req.body.classification;
    var reminders = req.body.reminders;
    var plantid = req.body.plantid;

    var documentClient = new AWS.DynamoDB.DocumentClient();

    let checkInst = function () {
      const params = {
        TableName: Plants,
        Key: {
          PlantID: plantid,
          UserID: userid,
          Nickname: nickname,
          Species: species,
          Sunlight: sunlight,
          Water: water,
          Notes: notes,
          DateAcquired: date,
          Classifications: classification,
          Reminders: reminders,
        },
      };

      documentClient.get(params, function (err, data) {
        if (err) {
          console.log(" Item Does Not Exist ");
          var ret = {
            PlantID: plantid,
            UserID: userid,
            Nickname: nickname,
            Species: species,
            Sunlight: sunlight,
            Water: water,
            Notes: notes,
            DateAcquired: date,
            Classification: classification,
            Reminders: reminders,
            Error: " Item Does Not Exist In Table ",
          };
          res.status(400).json(ret);
        }
      });
    };

    //remove entry
    let removeEntry = function () {
      const params = {
        TableName: Plants,
        Key: {
          UserID: uid,
          PlantID: plantid,
        },
        Key: "PlantID == :thisPlantid",
        ExpressionAttributeValues: {
          ":thisPlantid": plantid,
        },
      };

      documentClient.delete(params, function (err, data) {
        if (err) {
          console.log(" Unable To Delete Item ");
          ret = {
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
            Error: " Unable To Insert Item ",
          };
          res.status(400).json(ret);
        } else {
          console.log(" Successfully Deleted Item ");
          ret = {
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
            Error: "",
          };
          res.status(200).json(ret);
        }
      });
    };

    checkInst();
    removeEntry();
  };

  // Search for an existing plant entry
  // Input:
  //  - "userid"
  //  - "search"
  // Output:
  //  - If items found: json array of objects with key pairs of all attributes
  //  - If no items found: json object of userid, search, and error
  searchEntry = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log(req.body);
    var documentClient = new AWS.DynamoDB.DocumentClient();

    let searchEntry = function () {
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

  // Reports a problem from the user and stores it into the database.
  // If this function returns with "The conditional request failed",
  // It means that the ID fed to the function does not exist in the database.
  reportAProblem = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    var userid = req.body.userid;

    // Problem to be added to DB
    var problem = req.body.problem;

    var documentClient = new AWS.DynamoDB.DocumentClient();

    let reportAProblem = function () {
      const params = {
        TableName: "Users",
        Key: {
          UserID: userid,
        },
        UpdateExpression:
          "set #Problems = list_append(:problem, if_not_exists(#Problems, :e))",
        ConditionExpression: "UserID = :UserID",
        ExpressionAttributeNames: {
          "#Problems": "Problems",
        },
        ExpressionAttributeValues: {
          ":problem": [problem],
          ":e": [],
          ":UserID": userid,
        },
      };

      documentClient.update(params, function (err, data) {
        if (err) {
          console.log("Report Did Not File");
          var ret = {
            UserID: userid,
            Error: err,
          };
          res.status(400).json(ret);
        } else {
          console.log("Filed Report");
          var ret = {
            UserID: userid,
            Error: "",
          };
          res.status(200).json(ret);
        }
      });
    };
    reportAProblem();
  };

  // TODO: Refer to auth.controller.js for how to set this up.
  validateBody(type) {
    switch (type) {
      case "newEntry":
        return [
          body("userid").notEmpty().isString(),
          body("nickname").notEmpty().isString(),
          body("species").notEmpty().isString(),
          body("sunlight").notEmpty().isNumeric().isIn([1, 2, 3]),
          body("water").notEmpty().isNumeric().isIn([1, 2, 3]),
          body("notes").notEmpty().isString(),
          body("date").notEmpty().isISO8601(),
          body("classification").notEmpty().isArray(),
          body("reminders").notEmpty(),
        ];
      case "editEntry":
        return [
          body("plantid").notEmpty().isString(),
          body("userid").notEmpty().isString(),
          body("nickname").notEmpty().isString(),
          body("species").notEmpty().isString(),
          body("sunlight").notEmpty().isNumeric().isIn([1, 2, 3]),
          body("water").notEmpty().isNumeric().isIn([1, 2, 3]),
          body("notes").notEmpty().isString(),
          body("date").notEmpty().isISO8601(),
          body("classification").notEmpty().isArray(),
          body("reminders").notEmpty(),
        ];
      case "deleteEntry":
        return [
          body("plantid").notEmpty().isString(),
          body("userid").notEmpty().isString(),
          body("nickname").notEmpty().isString(),
          body("species").notEmpty().isString(),
          body("sunlight").notEmpty().isNumeric().isIn([1, 2, 3]),
          body("water").notEmpty().isNumeric().isIn([1, 2, 3]),
          body("notes").notEmpty().isString(),
          body("date").notEmpty().isISO8601(),
          body("classification").notEmpty().isArray(),
          body("reminders").notEmpty(),
        ];
      case "searchEntry":
        return [
          body("userid").notEmpty().isString(),
          body("search").notEmpty().isString(),
        ];
      case "reportAProblem":
        return [
          body("userid").notEmpty().isString(),
          body("problem").notEmpty().isString(),
        ];
    }
  }
}

module.exports = ProtectedController;
