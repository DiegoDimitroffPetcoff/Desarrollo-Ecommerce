// const dotenv = require("dotenv");
require("dotenv").config;
const path = require("path");

// const MODO = process.argv[2]

//   dotenv.config({
//     path: path.resolve(process.cwd(),  process.env.MODO + ".env"),
//   });

module.exports = {
  MONGO_URI: process.env.MONGO_URI || "",
  TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION || 60000,
};
