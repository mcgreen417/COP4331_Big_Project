const express = require("express");
const path = require("path");

const app = express();

// 5000 is open on EC2
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

// Serve static assets if production (aka EC2)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
