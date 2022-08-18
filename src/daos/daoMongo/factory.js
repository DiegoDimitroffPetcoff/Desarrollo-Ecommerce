const mongoose = require("mongoose");
require("dotenv").config();
const configs = require("../../config/globals");

class Factory {
  constructor(schema) {
    mongoose.connect(configs.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

module.exports = Factory;
