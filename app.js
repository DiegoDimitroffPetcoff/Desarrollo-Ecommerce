const express = require("express");
const app = express();





const { SERVER, route } = require("./routes/productRoute");


const multer = require("multer");

const handlebars = require("express-handlebars");
const dotenv = require("dotenv").config();


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




let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

process.on('message',msg=>{
  app.use(route);
})


app.use( route);



const upload = multer({ storage: storage });
module.exports = app;
