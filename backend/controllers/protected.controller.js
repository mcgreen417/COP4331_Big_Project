const express = require("express");
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const formidable = require("formidable");

const Cognito = require("../services/cognito.service");
const AuthMiddleware = require("../middleware/auth.middleware");
const S3Service = require("../services/s3.service");

class ProtectedController {
  constructor() {
    this.config = {
      region: "us-east-2",
      endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    };
    this.path = "/protected";
    this.router = express.Router();
    this.authMiddleware = new AuthMiddleware();
    this.initRoutes();
  }

  initRoutes() {
    this.router.use(this.authMiddleware.verifyToken); // Keep this uncommented when committing
    this.router.post("/fetchUser", this.fetchUser);
    this.router.post("/fetchReminders", this.fetchReminders);
    this.router.post("/testUpload", this.testUpload);
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
    const accessToken = req.headers.authorization;
    const cognitoService = new Cognito();
    const s3Service = new S3Service();

    let fetchUserPhotos = (json) => {
      let subId = json.UserAttributes[0].Value;
      if (!subId) {
        throw `User's ID Token is invalid with subId: ${subId}`;
      }

      s3Service
        .getPhotoUrlsForSubId(subId)
        .then((photoUrls) => {
          json.photoUrls = photoUrls;
          res.status(200).json(json);
        })
        .catch((err) => {
          throw err;
        });
    };
    try {
      cognitoService.getUser(accessToken).then((success) => {
        success[0] ? fetchUserPhotos(success[1]) : res.status(400).end();
      });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  };

  fetchReminders = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const accessToken = req.headers.authorization;
    const documentClient = new AWS.DynamoDB.DocumentClient(this.config);
    const cognitoService = new Cognito();
    const s3Service = new S3Service();

    let fetchUserReminders = (json) => {
      let subId = json.UserAttributes[0].Value;
      if (!subId) {
        throw `User's ID Token is invalid with subId: ${subId}`;
      }
      var params = {
        TableName: "Plants",
        FilterExpression: "#userid = :userid",
        ExpressionAttributeNames: {
          "#userid": "UserID",
        },
        ExpressionAttributeValues: {
          ":userid": subId,
        },
      };

      documentClient.scan(params, function (err, data) {
        if (data.Items === undefined || data.Items.length == 0) {
          res.status(400).json({ Error: "User has no reminders" });
        } else {
          let ret = data.Items.map(function (item) {
            item.Classification = AWS.DynamoDB.Converter.unmarshall(
              item.Classification
            );
            item.Reminders = AWS.DynamoDB.Converter.unmarshall(item.Reminders);
            item.plantUrl = s3Service.convertPlantIdToUrl(subId, item.PlantID);
            return item;
          });
          res.status(200).json(ret);
        }
      });
    };

    try {
      cognitoService.getUser(accessToken).then((success) => {
        success[0] ? fetchUserReminders(success[1]) : res.status(400).end();
      });
      fetchUserReminders();
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  };

  testUpload = (req, res) => {
    const cognitoService = new Cognito();
    const s3Service = new S3Service();
    const accessToken = req.headers.authorization;
    const form = new formidable.IncomingForm();
    let doUpload = (json) => {
      form.parse(req, (error, fields, files) => {
        if (error) {
          throw `Error with image parsing ${error}`;
        }

        let subId = json.UserAttributes[0].Value;
        if (!subId) {
          throw `User's ID Token is invalid with subId: ${subId}`;
        }
        const plantId = uuidv4();
        s3Service
          .uploadPhotoForUser(subId, plantId, files.file)
          .then((success) => {
            res.status(200).json({ url: success, plantID: plantId });
          })
          .catch((err) => {
            throw err;
          });
      });
    };

    try {
      cognitoService.getUser(accessToken).then((success) => {
        success[0] ? doUpload(success[1]) : res.status(400).end();
      });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
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
  //  - "classification" (Expected list of strings)
  //  - "reminders" (Expected object)
  // Output:
  //  - If input types are correct: json object of all input pairs and empty error pair
  //  - If input types are incorrect: json object of all input pairs and error pair
  newEntry = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log(req.body);
    var documentClient = new AWS.DynamoDB.DocumentClient(this.config);

    const {
      plantid,
      userid,
      nickname,
      species,
      sunlight,
      water,
      notes,
      date,
      classification,
      reminders,
    } = req.body;

    const params = {
      TableName: "Plants",
      Item: {
        PlantID: plantid,
        UserID: userid,
        Nickname: nickname.toLowerCase(),
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
      let returnFormat = {
        UserID: userid,
        Nickname: nickname.toLowerCase(),
        Species: species,
        Sunlight: sunlight,
        Water: water,
        Notes: notes,
        DateAcquired: date,
        Classification: classification,
        Reminders: reminders,
        Error: "",
      };
      if (err) {
        console.log(" Failed to Create Item ");
        returnFormat.Error = "Error Creating Entry";
        res.status(400).json(returnFormat);
      } else {
        console.log(" Successfully Created Item ");
        res.status(200).json(returnFormat);
      }
    });
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
    const {
      userid,
      nickname,
      species,
      sunlight,
      water,
      notes,
      date,
      classification,
      reminders,
      plantid,
    } = req.body;

    const documentClient = new AWS.DynamoDB.DocumentClient(this.config);
    let params = {
      TableName: "Plants",
      Key: {
        PlantID: plantid,
        UserID: userid,
      },
    };
    // NOTE: The ret value below in both .get() and .update() should maybe be refactored due to DRY
    // Maybe make a single object and remodify the Error attribute for each ret declaration.
    documentClient.get(params, function (err, data) {
      if (err) {
        console.log(" Item Does Not Exist ");
        var ret = {
          PlantID: plantid,
          UserID: userid,
          Nickname: nickname.toLowerCase(),
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

    let updateParams = {
      TableName: "Plants",
      Key: {
        PlantID: plantid,
        UserID: userid,
      },
      UpdateExpression:
        "SET Nickname = :thisNick, Species = :thisSpecies, Sunlight = :thisSunlight, Water = :thisWater, Notes = :thisNotes, DateAcquired = :thisDate, Classification = :thisClass, Reminders = :thisReminders",
      ExpressionAttributeValues: {
        ":thisNick": nickname.toLowerCase(),
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
    documentClient.update(updateParams, function (err, data) {
      if (err) {
        console.log(" Failed To Update Item ");
        var ret = {
          PlantID: plantid,
          UserID: userid,
          Nickname: nickname.toLowerCase(),
          Species: species,
          Sunlight: sunlight,
          Water: water,
          Notes: notes,
          DateAcquired: date,
          Classification: classification,
          Reminders: reminders,
          Error: err,
        };
        res.status(400).json(ret);
      } else {
        console.log(" Successfully Updated Item ");
        var ret = {
          PlantID: plantid,
          UserID: userid,
          Nickname: nickname.toLowerCase(),
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

  //delete plant entry
  //check if entry exists in table
  // Input:
  //  - "plantid"
  //  - "userid"
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
    const { userid, plantid } = req.body;

    const documentClient = new AWS.DynamoDB.DocumentClient(this.config);
    const params = {
      TableName: "Plants",
      Key: {
        PlantID: plantid,
        UserID: userid,
      },
    };
    documentClient.get(params, function (err, data) {
      if (err) {
        console.log(`Error getting entry: ${err}`);
        var ret = {
          PlantID: plantid,
          UserID: userid,
          Error: "Item Does Not Exist In Table ",
        };
        res.status(400).json(ret);
      }
    });
    documentClient.delete(params, function (err, data) {
      if (err) {
        console.log(err);
        var ret = {
          PlantID: plantid,
          UserID: userid,
          Error: " Unable To Delete Item ",
        };
        res.status(400).json(ret);
      } else {
        console.log(" Successfully Deleted Item ");
        var ret = {
          PlantID: plantid,
          UserID: userid,
          Error: "",
        };
        res.status(200).json(ret);
      }
    });
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
    const documentClient = new AWS.DynamoDB.DocumentClient(this.config);
    const { userid, search } = req.body;

    var params = {
      TableName: "Plants",
      FilterExpression: "contains(#nickname, :nickname) AND #userid = :userid",
      ExpressionAttributeNames: {
        "#nickname": "Nickname",
        "#userid": "UserID",
      },
      ExpressionAttributeValues: {
        ":nickname": search.toLowerCase(),
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

    var documentClient = new AWS.DynamoDB.DocumentClient(this.config);

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
