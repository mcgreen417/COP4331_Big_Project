const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    // Fill in access keys
    "accessKeyId": "", "secretAccessKey": ""
};
AWS.config.update(awsConfig);

const app = express();

// 5000 is open on EC2
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// LOGIN API
app.post('/api/login', (req, res) => {
    
    let documentClient = new AWS.DynamoDB.DocumentClient();

    let searchUser = function () {
        var params = {
          TableName : "Users",
          FilterExpression : "Username = :this_user AND Password = :this_pass",
          ExpressionAttributeValues : {
              ":this_user" : req.body.username,
              ":this_pass" : req.body.password
          }
        };
        
        documentClient.scan(params, function(err, data) {

          var uid = -1;
          var mail = "";
          var user = "";
          var pass = "";
          var error = "";

          if (err) {
              console.log(err);
              var ret = { UserID:uid, Email:mail, Username:user, Password:pass, Error:"Login Failed" };
              res.status(200).json(ret);
          }
          else {
              data.Items.forEach(function(item) {
                uid = item.UserID;
                mail = item.Email;
                user = item.Username;
                pass = item.Password;
                var ret = { UserID:uid, Email:mail, Username:user, Password:pass, Error:error };
                res.status(200).json(ret);
              });
          }
        });
    }
    searchUser();
});

// Serve static assets if production (aka EC2)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
