const express = require("express");
const path = require("path");

class App {
  constructor({ port, middleWares, controllers }) {
    this.app = express();
    this.port = port;
    this.middleWares(middleWares);
    this.routes(controllers);
  }

  middleWares(middleWares) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  routes(controllers) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  listen() {
    if (process.env.NODE_ENV === "production") {
      console.log("Running server in PRODUCTION mode");
      console.log(`Only use the script: "npm run server" on production.`);
      this.app.use(express.static("../frontend/web-app/build"));

      this.app.get("*", (req, res) => {
        res.sendFile(
          path.resolve(
            __dirname,
            "..",
            "frontend",
            "web-app",
            "build",
            "index.html"
          )
        );
      });
    }

    this.app.listen(this.port, () =>
      console.log(`Server started on port ${this.port}`)
    );
  }
}

module.exports = App;
