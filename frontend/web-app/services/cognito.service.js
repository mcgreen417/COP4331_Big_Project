const AWS = require("aws-sdk");
const crypto = require("crypto");

class CognitoService {
  constructor() {
    this.config = {
      region: "us-east-2",
      endpoint: "cognito-idp.us-east-2.amazonaws.com",
    };
    this.secretHash = "ma80u7p4m5s7epk6l8r69ccdbi7hj5n90vd0f7l9ihna78mb9el";
    this.clientId = "4mc5iou0oomsfe1j7m4nglkh4b";
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
  }

  async signUpUser(username, password, userAttr) {
    var params = {
      ClientId: this.clientId /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.generateHash(username),
      UserAttributes: userAttr,
    };

    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async signInUser(username, password) {
    var params = {
      AuthFlow: "USER_PASSWORD_AUTH" /* required */,
      ClientId: this.clientId /* required */,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.generateHash(username),
      },
    };

    try {
      let data = await this.cognitoIdentity.initiateAuth(params).promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async confirmSignUp(username, code) {
    var params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: username,
      SecretHash: this.generateHash(username),
    };

    try {
      const cognitoResp = await this.cognitoIdentity
        .confirmSignUp(params)
        .promise();
      console.log(cognitoResp);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  async forgotPassword(username) {
    var params = {
      ClientId: this.clientId /* required */,
      Username: username /* required */,
      SecretHash: this.generateHash(username),
    };

    try {
      const data = await this.cognitoIdentity.forgotPassword(params).promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async confirmNewPassword(username, password, code) {
    var params = {
      ClientId: this.clientId /* required */,
      ConfirmationCode: code /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.generateHash(username),
    };

    try {
      const data = await this.cognitoIdentity
        .confirmForgotPassword(params)
        .promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  generateHash(username) {
    return crypto
      .createHmac("SHA256", this.secretHash)
      .update(username + this.clientId)
      .digest("base64");
  }
}

module.exports = CognitoService;
