const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const App = require("./app");
const AuthController = require("./controllers/auth.controller");
const ProtectedController = require("./controllers/protected.controller");

AWS.config.getCredentials(function (err) {
  if (err) {
    console.log("AWS Credentials not configured properly");
  } else {
    console.log(
      "Signed in with Access Key:",
      AWS.config.credentials.accessKeyId
    );
  }
});
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
});

const app = new App({
  port: 5000,
  controllers: [new AuthController(), new ProtectedController()],
  middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
});

//EDIT ENTRY API
app.post('/api/editEntry', async (req, res, next) => {
  //INCOMING: UserID, Nickname, Species, Classifications, Sunlight, Water, Reminders, Notes, Date Acquired
  //OUTGOING: ID, Edits, Error

  let updateItem = function() {
    let documentClient = new AWS.DynamoDB.DocumentClient;

    const { plantid, uid, nickname, species, sunlight, water, notes, date, classifications, reminders } = req.body;

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

    //update table
    documentClient.update(params, function(err, data) {
      if(err) {
        console.log(" Failed To Update Item ");
        var retVal = { PlantID:plantid, UserID: uid, Nickname: nickname, Error:err };
        res.status(200).json(retVal);
      } else {
        console.log(" Successfully Updated Item ");
        var retVal = { PlantID:plantid, UserID:uid, Nickname:nickname, Error:'' };
        res.status(200).json(retVal);
      }
    });
  }

  updateItem();
});

// Serve static assets if production (aka EC2)
if (process.env.NODE_ENV === "production") {
  console.log("Running server in PRODUCTION mode");
  console.log(`Only use the script: "npm run server" on production.`);
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen();
