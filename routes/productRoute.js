const express = require("express");
const app = express();
const Contenedor = require("../src/container/container");
const util = require("util");
const normalize = require("../utils/normalizr");
const compressionRatio = require("../utils/calculator");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const fs = require("fs");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

const contenedor = new Contenedor();
const prueba = contenedor.read();
const chat = contenedor.readChat();

// CREO CONTENEDOR EN DONDE SE VAN A NORMALIZAR LOS DATOS
const dataContainer = { id: 1, posts: [] };
let compression = null
io.on("connection", (socket) => {
  console.log("Cliente en la Home de la web");

  socket.emit("messages", prueba);
  socket.on("new-message", (data1) => {
    contenedor.save(data1);
    prueba.push(data1);

    io.sockets.emit("messages", prueba);
  });
});

io.on("connection", (socket) => {
  console.log("Usuario conectado al Chat");
  socket.emit("chat", chat);
  socket.on("newChat", (data) => {
    data.author.avatar = "avatar";
    contenedor.saveChat(data);
    chat.push(data);
    dataContainer.posts = chat;
    io.sockets.emit("chat", chat);
    
    let dataNocomprimida = JSON.stringify(dataContainer).length;
    let dataNormalized = normalize(dataContainer);
    let dataComprimida = JSON.stringify(dataNormalized).length;
    compression = compressionRatio(dataNocomprimida, dataComprimida);
  });
  
  try {
    socket.emit("compression", compression);
    console.log("--SI DESDE EL SERVIDOR");
  } catch (error) {
    console.log(error);
  }




});
// EXPORTAR DATACONTAINER PARA NORMALIZARLO Y DESP AGRAGAR ESO EN EL FRONT
app.get("/", function (req, res) {
  res.render("main", { root: __dirname });
});
app.get("/about", function (req, res) {
  res.render("about", { root: __dirname });
});

module.exports = { httpServer, app };
