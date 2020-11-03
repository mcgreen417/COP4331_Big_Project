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
const CognitoService = require("./cognito.service");
const { validationResult } = require("express-validator");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
});

// LOGIN API
app.post("/api/login", async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  const { username, password } = req.body;
  console.log(username, password);
  const cognito = new CognitoService();
  cognito.signInUser(username, password).then((success) => {
    if (success) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  });
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
