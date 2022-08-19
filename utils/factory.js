const mongoose = require("mongoose");
require("dotenv").config();
const configs = require("../src/config/globals");

let instance = null;

class Factory {
  constructor(data) {
    this.data = data;
  }
  static getInstance() {
    if (!instance) {
      instance = new Factory();
    }
    return instance;
  }
  connection(data) {
    if (data == "file") {
      console.log("conectado a base de datos file");
    } else if (data == "mongo") {
      mongoose.connect(configs.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("coneccion a Mongo");
    } else {
      console.log("base de datos colocada incorrectamente");
    }
  }
}

module.exports = Factory;
