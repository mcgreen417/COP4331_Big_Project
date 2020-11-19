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

const app = new App({
  port: 5000,
  controllers: [new AuthController(), new ProtectedController()],
  middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
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
