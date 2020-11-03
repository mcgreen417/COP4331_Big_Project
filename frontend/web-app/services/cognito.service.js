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
    const params = {
      ClientId: this.clientId,
      Password: password,
      Username: username,
      SecretHash: this.generateHash(username),
      UserAttributes: userAttr,
    };

    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      return true;
    } catch (err) {
      return false;
    }
  }

  async verifyAccount(username, code) {
    const params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      SecretHash: this.generateHash(username),
      Username: username,
    };

    try {
      const data = await this.cognitoIdentity.confirmSignUp(params).promise();
      return true;
    } catch (error) {
      return false;
    }
  }

  async signInUser(username, password) {
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.generateHash(username),
      },
    };

    try {
      let data = await this.cognitoIdentity.initiateAuth(params).promise();
      return true;
    } catch (err) {
      console.log(err);
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
