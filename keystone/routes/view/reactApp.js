const path = require("path");
module.exports = function(req, res) {
  res.sendFile(path.join(__dirname, "../../../dist/index.html"));
};
