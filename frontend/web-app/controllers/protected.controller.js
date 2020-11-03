const express = require("express");

const AuthMiddleware = require("../middleware/auth.middleware");

class ProtectedController {
  constructor() {
    this.path = "/protected";
    this.router = express.Router();
    this.authMiddleware = new AuthMiddleware();
    this.initRoutes();
  }

  initRoutes() {
    this.router.use(this.authMiddleware.verifyToken);
    this.router.get("/secret", this.secret);
  }

  secret = (req, res) => {
    res.send("you can view secret");
  };
}

module.exports = ProtectedController;
