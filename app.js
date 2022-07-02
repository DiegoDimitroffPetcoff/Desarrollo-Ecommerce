const express = require("express");
const app = express();

const { SERVER, route } = require("./routes/productRoute");


const multer = require("multer");
const handlebars = require("express-handlebars");

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path:
    process.env.MODO == "production"
      ? path.resolve(__dirname, "dev.env")
      : path.resolve(__dirname, "testing.env"),
});
console.log(`Ambiente: ${process.env.AMBIENTE}`);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

app.use(route);
const upload = multer({ storage: storage });
module.exports = {app};
// module.exports ={app,
//   MONGO_URI: process.env.MONGO_URI ||'',
//   TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION|| 3000
// }