const express = require("express");

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
    this.app.listen(this.port, () =>
      console.log(`Server started on port ${this.port}`)
    );
  }
}

module.exports = App;
