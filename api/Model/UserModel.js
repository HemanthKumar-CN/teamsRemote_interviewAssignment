const mongoose = require("mongoose");

const RegSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  password: String,
});

const RegModel = mongoose.model("users", RegSchema);

module.exports = RegModel;
