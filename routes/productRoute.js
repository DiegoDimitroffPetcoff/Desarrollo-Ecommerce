const express = require("express");
const app = express();
const Contenedor = require("../src/container/container");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const fs = require("fs");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

const chat = [];
const contenedor = new Contenedor();
const prueba = contenedor.read();

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
    Date(data);
    contenedor.saveChat(data);
    chat.push(data);
    io.sockets.emit("chat", chat);
  });
});

app.get("/", function (req, res) {
  res.render("main", { root: __dirname });
});
app.get("/about", function (req, res) {
  res.render("about", { root: __dirname });
});

module.exports = { httpServer, app };
