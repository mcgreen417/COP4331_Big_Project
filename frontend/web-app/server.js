const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
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

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
});

// LOGIN API
// TODO: This likely needs to be refactored to include Cognito.
app.post("/api/login", async (req, res) => {
  let documentClient = new AWS.DynamoDB.DocumentClient();

  let searchUser = function () {
    var params = {
      TableName: "Users",
      FilterExpression: "Username = :this_user AND Password = :this_pass",
      ExpressionAttributeValues: {
        ":this_user": req.body.username,
        ":this_pass": req.body.password,
      },
    };

    documentClient.scan(params, function (err, data) {
      var uid = -1;
      var mail = "";
      var user = "";
      var pass = "";
      var error = "";

      if (err) {
        console.log(err);
        var ret = {
          UserID: uid,
          Email: mail,
          Username: user,
          Password: pass,
          Error: "Login Failed",
        };
        res.status(200).json(ret);
      } else {
        data.Items.forEach(function (item) {
          uid = item.UserID;
          mail = item.Email;
          user = item.Username;
          pass = item.Password;
          var ret = {
            UserID: uid,
            Email: mail,
            Username: user,
            Password: pass,
            Error: error,
          };
          res.status(200).json(ret);
        });
      }
    });
  };
  searchUser();
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

app.listen(port, () => console.log(`Server started on port ${port}`));
