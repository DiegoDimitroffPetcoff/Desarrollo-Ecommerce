const express = require("express");
const app = express();

const httpServer = require('./routes/productRoute')


const multer = require("multer");
const handlebars = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
//

let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.use("/", httpServer.app);

httpServer.httpServer.listen(8080, () => {
  console.log('Server on port 8080');
})
httpServer.httpServer.on("Error", (error) => console.log("error en servidor ${error}"));



