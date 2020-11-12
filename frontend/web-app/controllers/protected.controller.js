const express = require("express");

const AuthMiddleware = require("../middleware/auth.middleware");

class ProtectedController {
  constructor() {
    this.path = "/protected";
    this.router = express.Router();
    this.authMiddleware = new AuthMiddleware();
    this.initRoutes();
  }

  initRoutes() {
    this.router.use(this.authMiddleware.verifyToken);
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
  }

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

  // TODO: Refer to auth.controller.js for how to set this up.
  validateBody(type) {
    switch (type) {
      case "newEntry":
        return [];
      case "editEntry":
        return [];
      case "deleteEntry":
        return [];
      case "searchEntry":
        return [];
    }
  }
}

module.exports = ProtectedController;
