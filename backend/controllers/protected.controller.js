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
    this.router.post("/photoUpload", this.photoUpload);
    this.router.post("/viewEntry", this.viewEntry);
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
        .then((photoObjects) => {
          json.photoObjects = photoObjects;
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
          res.status(200).json({ Error: "User has no reminders" });
        } else {
          let filterForReminders = data.Items.filter(function (item) {
            return item.Reminders.length !== 0;
          });
          let reminders = filterForReminders.map(function (item) {
            item.plantUrl = s3Service.convertPlantIdToUrl(subId, item.PlantID);
            return item;
          });
          res.status(200).json({ reminders: reminders });
        }
      });
    };

    try {
      cognitoService.getUser(accessToken).then((success) => {
        success[0] ? fetchUserReminders(success[1]) : res.status(400).end();
      });
    } catch (err) {
      res.status(400).end(err);
    }
  };

  photoUpload = (req, res) => {
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

  viewEntry = (req, res) => {
    const cognitoService = new Cognito();
    const s3Service = new S3Service();
    const accessToken = req.headers.authorization;
    const documentClient = new AWS.DynamoDB.DocumentClient(this.config);
    const { plantid } = req.body;

    let getEntry = (json) => {
      let subId = json.UserAttributes[0].Value;
      if (!subId) {
        throw `User's ID Token is invalid with subId: ${subId}`;
      }
      var params = {
        TableName: "Plants",
        FilterExpression: "contains(#plantid, :plantid) AND #userid = :userid",
        ExpressionAttributeNames: {
          "#plantid": "PlantID",
          "#userid": "UserID",
        },
        ExpressionAttributeValues: {
          ":plantid": plantid,
          ":userid": subId,
        },
      };

      documentClient.scan(params, function (err, data) {
        if (data.Items === undefined || data.Items.length != 1) {
          res
            .status(400)
            .json({ Error: "User may have duplicate plantID entries" });
        } else {
          let ret = data.Items.map(function (item) {
            item.plantUrl = s3Service.convertPlantIdToUrl(subId, item.PlantID);
            return item;
          });
          console.log(ret);
          res.status(200).json(ret[0]);
        }
      });
    };

    try {
      cognitoService.getUser(accessToken).then((success) => {
        success[0] ? getEntry(success[1]) : res.status(400).end();
      });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  };

  newEntry = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const documentClient = new AWS.DynamoDB.DocumentClient(this.config);
    const accessToken = req.headers.authorization;
    const cognitoService = new Cognito();

    const {
      plantid,
      nickname,
      species,
      sunlight,
      water,
      notes,
      date,
      classification,
      reminders,
    } = req.body;

    let saveEntry = (json) => {
      const userid = json.UserAttributes[0].Value;
      if (!userid) {
        throw `User's ID Token is invalid with subId: ${subId}`;
      }
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
        const returnFormat = {
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

    try {
      cognitoService.getUser(accessToken).then((success) => {
        success[0] ? saveEntry(success[1]) : res.status(400).end();
      });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  };

  editEntry = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const documentClient = new AWS.DynamoDB.DocumentClient(this.config);
    const accessToken = req.headers.authorization;
    const cognitoService = new Cognito();
    const {
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

    let updateEntry = (json) => {
      const subId = json.UserAttributes[0].Value;
      if (!subId) {
        throw `User's ID Token is invalid with subId: ${subId}`;
      }
      let updateParams = {
        TableName: "Plants",
        Key: {
          PlantID: plantid,
          UserID: subId,
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
          res.status(400).json({ Error: err });
        } else {
          console.log(" Successfully Updated Item ");
          var ret = {
            PlantID: plantid,
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
    try {
      cognitoService.getUser(accessToken).then((success) => {
        success[0] ? updateEntry(success[1]) : res.status(400).end();
      });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  };

  deleteEntry = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const documentClient = new AWS.DynamoDB.DocumentClient(this.config);
    const cognitoService = new Cognito();
    const s3Service = new S3Service();
    const accessToken = req.headers.authorization;
    const { plantid } = req.body;

    let doDelete = (json) => {
      const subId = json.UserAttributes[0].Value;
      if (!subId) {
        throw `User's ID Token is invalid with subId: ${subId}`;
      }
      const params = {
        TableName: "Plants",
        Key: {
          PlantID: plantid,
          UserID: subId,
        },
      };

      documentClient.delete(params, function (err, data) {
        if (err) {
          res.status(400).json({ Error: err });
        } else {
          s3Service.deletePhoto(subId, plantid);
          res.status(200).json("Plant Successfully Deleted");
        }
      });
    };
    try {
      cognitoService.getUser(accessToken).then((success) => {
        success[0] ? doDelete(success[1]) : res.status(400).end();
      });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  };

  searchEntry = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const documentClient = new AWS.DynamoDB.DocumentClient(this.config);
    const cognitoService = new Cognito();
    const s3Service = new S3Service();
    const accessToken = req.headers.authorization;

    const { search } = req.body;
    let doSearch = (json) => {
      const subId = json.UserAttributes[0].Value;
      if (!subId) {
        throw `User's ID Token is invalid with subId: ${subId}`;
      }
      const params = {
        TableName: "Plants",
        FilterExpression:
          "contains(#nickname, :nickname) AND #userid = :userid",
        ExpressionAttributeNames: {
          "#nickname": "Nickname",
          "#userid": "UserID",
        },
        ExpressionAttributeValues: {
          ":nickname": search.toLowerCase(),
          ":userid": subId,
        },
      };

      documentClient.scan(params, function (err, data) {
        if (err) {
          res.status(400).json({ error: err });
        }
        const response = data.Items.map(function (item) {
          item.plantUrl = s3Service.convertPlantIdToUrl(subId, item.PlantID);
          return item;
        });
        res.status(200).json(response);
      });
    };

    try {
      cognitoService.getUser(accessToken).then((success) => {
        success[0] ? doSearch(success[1]) : res.status(400).end();
      });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
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
          body("nickname").notEmpty().isString(),
          body("species").notEmpty().isString(),
          body("sunlight").notEmpty().isNumeric().isIn([1, 2, 3]),
          body("water").notEmpty().isNumeric().isIn([1, 2, 3]),
          body("notes").isString(),
          body("date").notEmpty().isISO8601(),
          body("classification").notEmpty().isArray(),
          body("reminders").notEmpty(),
        ];
      case "editEntry":
        return [
          body("plantid").notEmpty().isString(),
          body("nickname").notEmpty().isString(),
          body("species").notEmpty().isString(),
          body("sunlight").notEmpty().isNumeric().isIn([1, 2, 3]),
          body("water").notEmpty().isNumeric().isIn([1, 2, 3]),
          body("date").notEmpty().isISO8601(),
          body("classification").notEmpty().isArray(),
          body("reminders").notEmpty(),
        ];
      case "deleteEntry":
        return [body("plantid").notEmpty().isString()];
      case "searchEntry":
        return [body("search").notEmpty().isString()];
      case "reportAProblem":
        return [body("problem").notEmpty().isString()];
    }
  }
}

module.exports = ProtectedController;
