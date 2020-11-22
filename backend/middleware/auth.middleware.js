const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

let pems = {};

class AuthMiddleware {
  constructor() {
    this.poolRegion = "us-east-2";
    this.userPoolId = "us-east-2_1l2Jnlck8";
    this.setUp();
  }

  verifyToken(req, resp, next) {
    const { accessToken } = req.body;
    if (!accessToken) return resp.status(401).end();

    let decodedJwt = jwt.decode(accessToken, { complete: true });
    if (decodedJwt === null) {
      resp.status(401).end();
      return;
    }
    let kid = decodedJwt.header.kid;
    let pem = pems[kid];
    if (!pem) {
      resp.status(401).end();
      return;
    }
    jwt.verify(accessToken, pem, function (err, payload) {
      if (err) {
        resp.status(401).end();
        return;
      } else {
        next();
      }
    });
  }

  async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw "request not successful";
      }
      const data = await response.json();
      const { keys } = data;
      for (let i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;
        const jwk = { kty: key_type, n: modulus, e: exponent };
        const pem = jwkToPem(jwk);
        pems[key_id] = pem;
      }
      console.log("Fetched PEMS from AWS");
    } catch (error) {
      console.log(error);
      console.log("Error! Unable to download JWKs");
    }
  }

  getUserIdFromToken(token) {
    if (!token) {
      console.log("No token");
      return;
    }
    let decodedJwt = jwt.decode(token, { complete: true });
    if (decodedJwt === null) {
      console.log("No decoded JWT");
      return;
    }
    let kid = decodedJwt.header.kid;
    let pem = pems[kid];
    if (!pem) {
      console.log("NO PEM");
      return;
    }

    let verifiedToken = jwt.verify(token, pem);
    return verifiedToken.sub || undefined;
  }
}

module.exports = AuthMiddleware;
