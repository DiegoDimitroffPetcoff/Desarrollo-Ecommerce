const mongoose = require("mongoose");
require("dotenv").config();
const configs = require("../../config/globals");

// const Schema = require("../../models/productos");

console.log("****mongo");
console.log(configs.MONGO_URI);

class Factory {
  constructor(schema) {
    // super(Schema);
    mongoose.connect(configs.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGO CONECTADO DESDE FACTORY");
  }
}

module.exports = Factory;
