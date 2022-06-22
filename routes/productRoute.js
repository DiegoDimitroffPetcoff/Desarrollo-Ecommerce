const express = require("express");
const app = express();
const session = require("express-session");

const ChatContainer = require("../src/daos/file/chatContainer");
const ProductosContainer = require("../src/daos/file/productosContainer");

const util = require("util");
const { fakerCreate } = require("../utils/mocks");
const { normalization } = require("../utils/normalizr");

const compressionRatio = require("../utils/calculator");
const { userLogged, renderName, logOut } = require("../utils/sessions");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const fs = require("fs");
const { response } = require("express");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use(
  session({
    // store:new FileStore({path: './sesiones',ttl:300,retries:0}),
    secret: "user",
    resave: true,
    saveUninitialized: true,
    cookie: {
      // Session expires after 1 min of inactivity.
      expires: 60000,
    },
  })
);

const productos = new ProductosContainer();

const chatContainer = new ChatContainer();

let compression = null;
io.on("connection", (socket) => {
  console.log("Cliente en la Home de la web");
  let prueba = productos.read();
  socket.emit("messages", prueba);
  socket.on("new-message", (data1) => {
    productos.save(data1);
    prueba.push(data1);

    io.sockets.emit("messages", prueba);
  });
});

io.on("connection", (socket) => {
  const chat = chatContainer.read();
  const dataContainer = { id: 1, posts: [] };
  dataContainer.posts = chat;
  const chatNormalizado = normalization(dataContainer);
  console.log("Usuario conectado al Chat");
  socket.emit("chat", chatNormalizado);

  socket.on("newChat", (data) => {
    data.author.avatar = "avatar";
    chatContainer.save(data);
    // CHAT: TODO EL HISTORIAL. DATA: NUEVO POST GUARDADO
    chat.push(data);
    // DATACONTAINER: SE LE DA EL FORMATO PARA QUE SEA NORMALIZADO
    dataContainer.posts = chat;
    let dataNocomprimida = JSON.stringify(dataContainer).length;
    let dataNormalized = normalization(dataContainer);
    let dataComprimida = JSON.stringify(dataNormalized).length;
    compression = compressionRatio(dataNocomprimida, dataComprimida);
  });
  try {
    socket.emit("compression", compression);
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", (req, res) => {
  res.render("login", { root: __dirname });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  req.session.user = req.body.name;
  req.session.logged = true;
  let data = req.body

  res.render("main", { data });
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.send({ status: "Logout Error", body: error });
    }
  });

  res.render("logout", { root: __dirname });
});

app.get("/", userLogged, (req, res) => {
  res.render("main", { root: __dirname });
});

app.get("/chat", userLogged, (req, res) => {
  res.render("about", { root: __dirname });
});

app.get("/test/:num", userLogged, (req, res) => {
  try {
    res.jsonp(productos.mocks(req.params.num));
  } catch (err) {
    console.log(err);
  }
});

module.exports = { httpServer, app };
